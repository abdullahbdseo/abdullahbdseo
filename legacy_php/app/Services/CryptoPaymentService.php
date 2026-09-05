<?php
// app/Services/CryptoPaymentService.php - Unified Payment Coordinator

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../Models/Payment.php';
require_once __DIR__ . '/../Models/Order.php';
require_once __DIR__ . '/../Models/Invoice.php';
require_once __DIR__ . '/NowPaymentsService.php';
require_once __DIR__ . '/BkashPaymentService.php';

class CryptoPaymentService {
    /**
     * Create or retrieve active payment record based on selected gateway
     */
    public static function createPayment(int $orderId, int $userId, float $amountUsd, string $method = 'NOWPAYMENTS-USDT'): array {
        if (str_starts_with($method, 'BKASH') || $method === 'bkash') {
            return BkashPaymentService::createPayment($orderId, $userId, $amountUsd);
        }

        if (str_starts_with($method, 'NOWPAYMENTS') || NowPaymentsService::isEnabled()) {
            $coin = str_replace('NOWPAYMENTS-', '', $method);
            if (empty($coin) || $coin === 'NOWPAYMENTS') $coin = 'USDT-TRC20';
            return NowPaymentsService::createInvoice($orderId, $userId, $amountUsd, $coin);
        }

        // Fallback: Direct Crypto Wallet
        $coinKey = strtoupper($method);
        $walletAddress = match ($coinKey) {
            'USDT-TRC20', 'TRC20' => setting('usdt_trc20_address', 'TXxxDemoTronWalletAddressForUSDTPayments888'),
            'USDT-ERC20', 'ERC20' => setting('usdt_erc20_address', '0xDemoEthereumWalletAddressForUSDTPayments777'),
            'BTC' => setting('btc_address', 'bc1qdemo000bitcoinsegwitdepositwalletaddress555'),
            'ETH' => setting('eth_address', '0xDemoEthereumNativeDepositWalletAddress333'),
            'SOL' => setting('sol_address', 'DemoSolanaNativeDepositWalletAddress11111111'),
            default => setting('usdt_trc20_address', 'TXxxDemoTronWalletAddressForUSDTPayments888')
        };

        $rate = match ($coinKey) {
            'BTC' => 0.000015,
            'ETH' => 0.00038,
            'SOL' => 0.0068,
            default => 1.0
        };
        $cryptoAmount = round($amountUsd * $rate, 6);

        $paymentId = Payment::create([
            'order_id' => $orderId,
            'user_id' => $userId,
            'payment_ref' => 'PAY-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -5)),
            'gateway' => 'direct_crypto',
            'payment_method' => $coinKey,
            'fiat_amount' => $amountUsd,
            'crypto_amount' => $cryptoAmount,
            'cryptocurrency' => $coinKey,
            'network' => 'Direct Blockchain Transfer',
            'wallet_address' => $walletAddress,
            'status' => 'waiting',
            'expires_at' => date('Y-m-d H:i:s', time() + (60 * (int)setting('payment_expiry_minutes', 60)))
        ]);

        return [
            'payment_id' => $paymentId,
            'wallet_address' => $walletAddress,
            'crypto_amount' => $cryptoAmount,
            'symbol' => $coinKey
        ];
    }

    public static function submitTransactionHash(int $paymentId, string $txHash): bool {
        $payment = Payment::find($paymentId);
        if (!$payment) return false;

        Payment::update($paymentId, [
            'transaction_hash' => $txHash,
            'status' => 'waiting_confirmation'
        ]);

        Order::update($payment['order_id'], [
            'status' => 'payment_submitted'
        ]);

        return true;
    }

    public static function confirmPayment(int $paymentId): bool {
        $payment = Payment::find($paymentId);
        if (!$payment) return false;

        $db = Database::getInstance()->getConnection();
        $db->beginTransaction();

        try {
            Payment::update($paymentId, [
                'status' => 'paid'
            ]);

            Order::update($payment['order_id'], [
                'status' => 'payment_confirmed'
            ]);

            $existingInvoice = Invoice::findBy('order_id', $payment['order_id']);
            if (!$existingInvoice) {
                $order = Order::find($payment['order_id']);
                $invNumber = 'INV-' . date('Ymd') . '-' . str_pad((string)$payment['order_id'], 3, '0', STR_PAD_LEFT);
                Invoice::create([
                    'order_id' => $payment['order_id'],
                    'user_id' => $payment['user_id'],
                    'invoice_number' => $invNumber,
                    'subtotal' => $order['subtotal'],
                    'tax' => 0.00,
                    'discount' => 0.00,
                    'total' => $order['total'],
                    'currency' => 'USD',
                    'status' => 'paid',
                    'issued_at' => date('Y-m-d H:i:s'),
                    'paid_at' => date('Y-m-d H:i:s'),
                    'payment_method' => $payment['cryptocurrency'] ?? 'Crypto'
                ]);
            }

            $db->commit();
            return true;
        } catch (Exception $e) {
            $db->rollBack();
            return false;
        }
    }
}
