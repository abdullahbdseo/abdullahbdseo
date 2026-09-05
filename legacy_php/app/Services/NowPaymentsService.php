<?php
// app/Services/NowPaymentsService.php - NOWPayments.io Crypto API Service

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../Models/Payment.php';
require_once __DIR__ . '/../Models/Order.php';
require_once __DIR__ . '/../Models/Invoice.php';

class NowPaymentsService {
    private const API_URL = 'https://api.nowpayments.io/v1';
    private const SANDBOX_API_URL = 'https://api-sandbox.nowpayments.io/v1';

    public static function getApiKey(): string {
        return setting('nowpayments_api_key', '');
    }

    public static function isSandbox(): bool {
        return (bool)setting('nowpayments_sandbox', '1');
    }

    public static function isEnabled(): bool {
        return (bool)setting('gateway_nowpayments_enabled', '1');
    }

    public static function getBaseUrl(): string {
        return self::isSandbox() ? self::SANDBOX_API_URL : self::API_URL;
    }

    /**
     * Create an invoice or payment via NOWPayments API
     */
    public static function createInvoice(int $orderId, int $userId, float $amountUsd, string $payCurrency = 'usdttrc20'): array {
        $apiKey = self::getApiKey();
        $order = Order::find($orderId);
        $orderNumber = $order['order_number'] ?? ('ORD-' . $orderId);

        $payload = [
            'price_amount' => $amountUsd,
            'price_currency' => 'usd',
            'pay_currency' => strtolower(str_replace(['-', '_'], '', $payCurrency)),
            'order_id' => $orderNumber,
            'order_description' => "Payment for SEO Service Order #{$orderNumber}",
            'ipn_callback_url' => SITE_URL . '/payment/nowpayments/ipn',
            'success_url' => SITE_URL . "/checkout/{$orderId}?status=confirmed",
            'cancel_url' => SITE_URL . "/checkout/{$orderId}?payment=cancelled"
        ];

        // If we are in demo mode or using a demo key, generate a rich simulated invoice
        if (str_contains($apiKey, 'DEMO_') || empty($apiKey)) {
            $simulatedPaymentId = 'NOWPAY-' . strtoupper(bin2hex(random_bytes(6)));
            $simulatedAddress = match (strtoupper($payCurrency)) {
                'USDT-TRC20', 'USDTTRC20' => setting('usdt_trc20_address', 'TNowPaymentsDemoTrc20DepositAddress999'),
                'BTC' => setting('btc_address', 'bc1qnowpaymentsdemobtcaddress777'),
                'ETH' => setting('eth_address', '0xNowPaymentsDemoEthAddress88888888'),
                'SOL' => setting('sol_address', 'NowPaymentsDemoSolanaDepositAddress444'),
                default => 'TXxxNOWPAYMENTSDepositWalletAddress'
            };

            $rate = match (strtoupper($payCurrency)) {
                'BTC' => 0.000015,
                'ETH' => 0.00038,
                'SOL' => 0.0068,
                default => 1.0
            };
            $cryptoAmount = round($amountUsd * $rate, 6);

            $paymentId = Payment::create([
                'order_id' => $orderId,
                'user_id' => $userId,
                'payment_ref' => 'NP-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -5)),
                'gateway' => 'nowpayments',
                'payment_method' => strtoupper($payCurrency),
                'fiat_amount' => $amountUsd,
                'crypto_amount' => $cryptoAmount,
                'cryptocurrency' => strtoupper($payCurrency),
                'network' => 'Automated NOWPayments Gateway',
                'wallet_address' => $simulatedAddress,
                'nowpayments_payment_id' => $simulatedPaymentId,
                'nowpayments_invoice_url' => 'https://nowpayments.io/payment/?iid=' . $simulatedPaymentId,
                'status' => 'waiting',
                'expires_at' => date('Y-m-d H:i:s', time() + (60 * (int)setting('payment_expiry_minutes', 60)))
            ]);

            return [
                'payment_id' => $paymentId,
                'nowpayments_id' => $simulatedPaymentId,
                'wallet_address' => $simulatedAddress,
                'crypto_amount' => $cryptoAmount,
                'currency' => strtoupper($payCurrency),
                'invoice_url' => 'https://nowpayments.io/payment/?iid=' . $simulatedPaymentId
            ];
        }

        // Real cURL request to NOWPayments API
        $ch = curl_init(self::getBaseUrl() . '/invoice');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'x-api-key: ' . $apiKey,
            'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $data = json_decode($response, true);

        if ($httpCode === 200 && !empty($data['id'])) {
            $paymentId = Payment::create([
                'order_id' => $orderId,
                'user_id' => $userId,
                'payment_ref' => 'NP-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -5)),
                'gateway' => 'nowpayments',
                'payment_method' => strtoupper($payCurrency),
                'fiat_amount' => $amountUsd,
                'crypto_amount' => $data['pay_amount'] ?? $amountUsd,
                'cryptocurrency' => strtoupper($payCurrency),
                'network' => 'NOWPayments Hosted',
                'wallet_address' => $data['pay_address'] ?? '',
                'nowpayments_payment_id' => (string)$data['id'],
                'nowpayments_invoice_url' => $data['invoice_url'] ?? '',
                'status' => 'waiting',
                'expires_at' => date('Y-m-d H:i:s', time() + 3600)
            ]);

            return [
                'payment_id' => $paymentId,
                'nowpayments_id' => $data['id'],
                'wallet_address' => $data['pay_address'] ?? '',
                'crypto_amount' => $data['pay_amount'] ?? $amountUsd,
                'currency' => strtoupper($payCurrency),
                'invoice_url' => $data['invoice_url'] ?? ''
            ];
        }

        throw new Exception('NOWPayments API Error: ' . ($data['message'] ?? 'Unable to generate crypto invoice.'));
    }

    /**
     * Verify IPN Signature from NOWPayments Webhook
     */
    public static function verifyIpn(string $rawBody, string $receivedSignature): bool {
        $ipnSecret = setting('nowpayments_ipn_secret', '');
        if (empty($ipnSecret)) {
            return false;
        }

        $data = json_decode($rawBody, true);
        if (!$data) return false;

        ksort($data);
        $sortedJson = json_encode($data, JSON_UNESCAPED_SLASHES);
        $calculatedSignature = hash_hmac('sha512', $sortedJson, $ipnSecret);

        return hash_equals($calculatedSignature, $receivedSignature);
    }
}
