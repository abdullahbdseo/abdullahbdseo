<?php
// app/Services/BkashPaymentService.php - bKash Payment Service & Verification

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../Models/Payment.php';
require_once __DIR__ . '/../Models/Order.php';
require_once __DIR__ . '/../Models/Invoice.php';

class BkashPaymentService {
    public static function isEnabled(): bool {
        return (bool)setting('gateway_bkash_enabled', '1');
    }

    public static function getBkashNumber(): string {
        return setting('bkash_number', '01700000000');
    }

    public static function getAccountType(): string {
        return setting('bkash_type', 'Personal');
    }

    public static function getUsdRate(): float {
        return (float)setting('bkash_usd_rate', '122.50');
    }

    public static function calculateBdt(float $usdAmount): float {
        return round($usdAmount * self::getUsdRate(), 2);
    }

    public static function getInstructions(): string {
        return setting('bkash_instructions', "1. Open bKash App or dial *247#\n2. Select 'Send Money' or 'Payment'\n3. Enter our bKash Number\n4. Enter total BDT amount\n5. Use Order # as reference\n6. Enter your TrxID below to complete.");
    }

    /**
     * Create or initialize a bKash payment record for an order
     */
    public static function createPayment(int $orderId, int $userId, float $usdAmount): array {
        $bdtAmount = self::calculateBdt($usdAmount);
        $bkashNumber = self::getBkashNumber();

        // Check if pending bKash payment already exists for this order
        $existing = Payment::where('order_id', $orderId, 'id DESC LIMIT 1');
        if (!empty($existing) && ($existing[0]['gateway'] ?? '') === 'bkash' && $existing[0]['status'] === 'waiting') {
            return [
                'payment_id' => $existing[0]['id'],
                'bdt_amount' => $existing[0]['bdt_amount'] ?? $bdtAmount,
                'usd_amount' => $usdAmount,
                'bkash_number' => $bkashNumber,
                'account_type' => self::getAccountType(),
                'exchange_rate' => self::getUsdRate(),
                'instructions' => self::getInstructions()
            ];
        }

        $paymentId = Payment::create([
            'order_id' => $orderId,
            'user_id' => $userId,
            'payment_ref' => 'BK-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -5)),
            'gateway' => 'bkash',
            'payment_method' => 'bKash (' . self::getAccountType() . ')',
            'fiat_amount' => $usdAmount,
            'bdt_amount' => $bdtAmount,
            'crypto_amount' => 0.00,
            'cryptocurrency' => 'BDT (bKash)',
            'network' => 'bKash MFS Bangladesh',
            'wallet_address' => $bkashNumber,
            'status' => 'waiting',
            'expires_at' => date('Y-m-d H:i:s', time() + 86400)
        ]);

        return [
            'payment_id' => $paymentId,
            'bdt_amount' => $bdtAmount,
            'usd_amount' => $usdAmount,
            'bkash_number' => $bkashNumber,
            'account_type' => self::getAccountType(),
            'exchange_rate' => self::getUsdRate(),
            'instructions' => self::getInstructions()
        ];
    }

    /**
     * Submit bKash Sender Number & TrxID
     */
    public static function submitTrxId(int $paymentId, string $senderNumber, string $trxId): bool {
        $payment = Payment::find($paymentId);
        if (!$payment) return false;

        Payment::update($paymentId, [
            'sender_number' => $senderNumber,
            'transaction_hash' => $trxId,
            'status' => 'waiting_confirmation'
        ]);

        Order::update($payment['order_id'], [
            'status' => 'payment_submitted'
        ]);

        return true;
    }

    /**
     * Confirm bKash Payment & Generate Invoice
     */
    public static function confirmPayment(int $paymentId): bool {
        $payment = Payment::find($paymentId);
        if (!$payment) return false;

        $db = Database::getInstance()->getConnection();
        $db->beginTransaction();

        try {
            // Update payment
            Payment::update($paymentId, [
                'status' => 'paid'
            ]);

            // Update order
            Order::update($payment['order_id'], [
                'status' => 'payment_confirmed'
            ]);

            // Check if invoice exists
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
                    'payment_method' => 'bKash (' . ($payment['sender_number'] ?? 'TrxID: ' . $payment['transaction_hash']) . ')'
                ]);
            }

            $db->commit();
            return true;
        } catch (Exception $e) {
            $db->rollBack();
            error_log("bKash Confirm Error: " . $e->getMessage());
            return false;
        }
    }
}
