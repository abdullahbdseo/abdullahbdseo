<?php
// app/Controllers/OrderController.php - Multi-Gateway Order & Checkout Controller

require_once __DIR__ . '/../../core/Controller.php';
require_once __DIR__ . '/../Models/Order.php';
require_once __DIR__ . '/../Models/Service.php';
require_once __DIR__ . '/../Models/ServicePackage.php';
require_once __DIR__ . '/../Models/User.php';
require_once __DIR__ . '/../Services/CryptoPaymentService.php';
require_once __DIR__ . '/../Services/NowPaymentsService.php';
require_once __DIR__ . '/../Services/BkashPaymentService.php';

class OrderController extends Controller {
    public function create(): void {
        $this->validateCsrf();

        $serviceId = (int)($_POST['service_id'] ?? 0);
        $packageId = (int)($_POST['package_id'] ?? 0);
        $websiteUrl = Security::sanitizeString($_POST['website_url'] ?? '');
        $targetCountry = Security::sanitizeString($_POST['target_country'] ?? 'Global');
        $targetKeywords = Security::sanitizeString($_POST['target_keywords'] ?? '');
        $clientNotes = Security::sanitizeString($_POST['client_notes'] ?? '');

        if (!$serviceId || !$packageId || !$websiteUrl) {
            $this->redirect('/services', 'error', 'Missing required order details.');
            return;
        }

        $service = Service::find($serviceId);
        $package = ServicePackage::find($packageId);

        if (!$service || !$package) {
            $this->redirect('/services', 'error', 'Selected service package is invalid.');
            return;
        }

        // Handle user account (guest or authenticated)
        $userId = Auth::id();
        if (!$userId) {
            $name = Security::sanitizeString($_POST['name'] ?? '');
            $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);

            if (!$name || !$email) {
                $this->redirect('/services/' . $service['slug'], 'error', 'Please provide your name and email to proceed.');
                return;
            }

            $existing = User::findBy('email', $email);
            if ($existing) {
                $userId = (int)$existing['id'];
            } else {
                $userId = User::create([
                    'name' => $name,
                    'email' => $email,
                    'password' => password_hash(bin2hex(random_bytes(16)), PASSWORD_BCRYPT),
                    'country' => $targetCountry,
                    'status' => 'active',
                    'email_verified_at' => date('Y-m-d H:i:s')
                ]);
                $db = Database::getInstance()->getConnection();
                $db->prepare("INSERT INTO `role_user` (`role_id`, `user_id`) VALUES (2, ?)")->execute([$userId]);
            }
        }

        // Generate Order Number
        $orderNumber = 'ORD-' . date('Ymd') . '-' . strtoupper(substr(md5(uniqid((string)mt_rand(), true)), 0, 5));

        $orderId = Order::create([
            'order_number' => $orderNumber,
            'user_id' => $userId,
            'service_id' => $serviceId,
            'package_id' => $packageId,
            'subtotal' => $package['price'],
            'discount' => 0.00,
            'total' => $package['price'],
            'currency' => 'USD',
            'status' => 'awaiting_payment',
            'website_url' => $websiteUrl,
            'target_country' => $targetCountry,
            'target_keywords' => $targetKeywords,
            'client_notes' => $clientNotes
        ]);

        // Default Payment Init: NOWPayments or bKash
        $defaultMethod = NowPaymentsService::isEnabled() ? 'NOWPAYMENTS-USDT' : (BkashPaymentService::isEnabled() ? 'bkash' : 'USDT-TRC20');
        CryptoPaymentService::createPayment($orderId, $userId, (float)$package['price'], $defaultMethod);

        $this->redirect('/checkout/' . $orderId, 'success', 'Order created successfully! Please select your payment method.');
    }

    public function checkout(int $orderId): void {
        $order = Order::getWithDetails($orderId);

        if (!$order) {
            $this->redirect('/services', 'error', 'Order not found.');
            return;
        }

        $selectedCoin = $_GET['coin'] ?? 'USDT-TRC20';
        $paymentData = CryptoPaymentService::createPayment($orderId, (int)$order['user_id'], (float)$order['total'], 'NOWPAYMENTS-' . $selectedCoin);

        $order = Order::getWithDetails($orderId);

        $this->render('public/checkout', [
            'pageTitle' => 'Payment for Order #' . $order['order_number'],
            'order' => $order,
            'payment' => array_merge($order, $paymentData)
        ], 'main');
    }

    public function submitTx(int $orderId): void {
        $this->validateCsrf();

        $paymentId = (int)($_POST['payment_id'] ?? 0);
        $txHash = trim($_POST['transaction_hash'] ?? '');
        $simulateInstant = !empty($_POST['simulate_instant_verify']);

        if (!$paymentId || (empty($txHash) && !$simulateInstant)) {
            $this->redirect('/checkout/' . $orderId, 'error', 'Please provide a valid Transaction Hash.');
            return;
        }

        if ($simulateInstant) {
            $txHash = 'SIMULATED-TX-' . strtoupper(bin2hex(random_bytes(16)));
            CryptoPaymentService::submitTransactionHash($paymentId, $txHash);
            CryptoPaymentService::confirmPayment($paymentId);
            $this->redirect('/checkout/' . $orderId . '?status=confirmed', 'success', 'Payment verified instantly! Your order is now In Progress.');
            return;
        }

        CryptoPaymentService::submitTransactionHash($paymentId, $txHash);
        $this->redirect('/checkout/' . $orderId . '?status=submitted', 'success', 'Transaction Hash submitted! We will verify your blockchain transaction shortly.');
    }

    public function submitBkash(int $orderId): void {
        $this->validateCsrf();

        $senderNumber = Security::sanitizeString($_POST['sender_number'] ?? '');
        $trxId = strtoupper(trim($_POST['transaction_id'] ?? ''));
        $simulateInstant = !empty($_POST['simulate_instant_verify']);

        if (!$senderNumber || (!$trxId && !$simulateInstant)) {
            $this->redirect('/checkout/' . $orderId, 'error', 'Please provide your bKash Number and Transaction ID (TrxID).');
            return;
        }

        $order = Order::find($orderId);
        $paymentData = BkashPaymentService::createPayment($orderId, (int)($order['user_id'] ?? 1), (float)$order['total']);
        $paymentId = $paymentData['payment_id'];

        if ($simulateInstant) {
            $trxId = 'BKASH-' . strtoupper(bin2hex(random_bytes(5)));
            BkashPaymentService::submitTrxId($paymentId, $senderNumber, $trxId);
            BkashPaymentService::confirmPayment($paymentId);
            $this->redirect('/checkout/' . $orderId . '?status=confirmed', 'success', 'bKash payment verified instantly! Your project is now In Progress.');
            return;
        }

        BkashPaymentService::submitTrxId($paymentId, $senderNumber, $trxId);
        $this->redirect('/checkout/' . $orderId . '?status=submitted', 'success', 'bKash Transaction ID submitted! We will verify your bKash payment.');
    }

    public function nowpaymentsIpn(): void {
        $rawBody = file_get_contents('php://input');
        $signature = $_SERVER['HTTP_X_NOWPAYMENTS_SIG'] ?? '';

        if (!NowPaymentsService::verifyIpn($rawBody, $signature)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid IPN signature']);
            return;
        }

        $data = json_decode($rawBody, true);
        $paymentStatus = $data['payment_status'] ?? '';
        $orderNumber = $data['order_id'] ?? '';

        if ($paymentStatus === 'finished' || $paymentStatus === 'confirmed') {
            $order = Order::findBy('order_number', $orderNumber);
            if ($order) {
                $payment = Payment::where('order_id', $order['id'], 'id DESC LIMIT 1');
                if (!empty($payment)) {
                    CryptoPaymentService::confirmPayment($payment[0]['id']);
                }
            }
        }

        http_response_code(200);
        echo json_encode(['status' => 'ok']);
    }
}
