<?php
// views/public/checkout.php - Multi-Gateway Modern Public Checkout (NOWPayments.io + bKash + Direct Crypto)

$nowpaymentsEnabled = NowPaymentsService::isEnabled();
$bkashEnabled = BkashPaymentService::isEnabled();
$manualCryptoEnabled = (bool)setting('gateway_crypto_manual_enabled', '1');

$usdAmount = (float)$order['total'];
$bdtAmount = BkashPaymentService::calculateBdt($usdAmount);
$bkashNumber = BkashPaymentService::getBkashNumber();
$bkashType = BkashPaymentService::getAccountType();
$bkashRate = BkashPaymentService::getUsdRate();
$bkashInstructions = BkashPaymentService::getInstructions();
?>

<div class="container" style="max-width: 960px; margin: 40px auto 80px; padding: 0 16px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
        <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--digi-blue, #4361ee); background: rgba(67, 97, 238, 0.08); border: 1px solid rgba(67, 97, 238, 0.2); padding: 5px 16px; border-radius: 9999px; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-lock"></i> Secure Payment Gateway
        </span>
        <h1 style="font-size: 2.2rem; font-weight: 800; color: #0f172a; margin: 12px 0 6px;">Complete Your Order</h1>
        <p style="color: #64748b; font-size: 0.95rem; margin: 0;">Order Reference: <strong>#<?= e($order['order_number']) ?></strong></p>
    </div>

    <!-- Stepper -->
    <div class="project-stepper" style="display: flex; justify-content: space-between; position: relative; margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; z-index: 2;">
            <div style="width: 34px; height: 34px; border-radius: 50%; background: #10b981; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem;"><i class="fa-solid fa-check"></i></div>
            <div style="font-size: 0.78rem; font-weight: 700; color: #0f172a;">1. Service Details</div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; z-index: 2;">
            <div style="width: 34px; height: 34px; border-radius: 50%; background: #4361ee; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem;">2</div>
            <div style="font-size: 0.78rem; font-weight: 700; color: #4361ee;">2. Payment</div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; z-index: 2;">
            <div style="width: 34px; height: 34px; border-radius: 50%; background: #e2e8f0; color: #64748b; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem;">3</div>
            <div style="font-size: 0.78rem; font-weight: 600; color: #64748b;">3. Execution</div>
        </div>
    </div>

    <!-- Order Summary Bar -->
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 22px 28px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 16px rgba(0,0,0,0.04); flex-wrap: wrap; gap: 16px;">
        <div>
            <div style="font-size: 0.78rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Order #<?= e($order['order_number']) ?></div>
            <div style="font-size: 1.3rem; font-weight: 800; color: #0f172a; margin: 2px 0;"><?= e($order['service_title']) ?> <span style="font-size: 0.95rem; font-weight: 600; color: #4361ee;">(<?= e($order['package_name']) ?>)</span></div>
            <div style="font-size: 0.88rem; color: #64748b;"><i class="fa-solid fa-globe"></i> Target: <strong style="color: #0f172a;"><?= e($order['website_url']) ?></strong></div>
        </div>
        <div style="text-align: right;">
            <div style="font-size: 0.78rem; color: #64748b; text-transform: uppercase; font-weight: 600;">Total Payable</div>
            <div style="font-size: 2rem; font-weight: 850; color: #4361ee; font-family: 'Plus Jakarta Sans', sans-serif;">
                <?= formatCurrency($order['total']) ?>
            </div>
            <div style="font-size: 0.85rem; color: #e11d48; font-weight: 700;">≈ ৳ <?= number_format($bdtAmount, 2) ?> BDT</div>
        </div>
    </div>

    <!-- Gateway Selector Tabs -->
    <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
        <?php if ($nowpaymentsEnabled): ?>
            <button type="button" class="checkout-gateway-tab active" data-gateway-target="tab-nowpayments" style="padding: 12px 20px; border-radius: 8px; border: 1px solid #cbd5e1; background: #ffffff; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.92rem;">
                <i class="fa-brands fa-bitcoin" style="color: #f59e0b;"></i> NOWPayments (Crypto)
            </button>
        <?php endif; ?>

        <?php if ($bkashEnabled): ?>
            <button type="button" class="checkout-gateway-tab <?= !$nowpaymentsEnabled ? 'active' : '' ?>" data-gateway-target="tab-bkash" style="padding: 12px 20px; border-radius: 8px; border: 1px solid #cbd5e1; background: #ffffff; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.92rem;">
                <i class="fa-solid fa-mobile-screen-button" style="color: #e11d48;"></i> bKash (বিকাশ)
            </button>
        <?php endif; ?>

        <?php if ($manualCryptoEnabled): ?>
            <button type="button" class="checkout-gateway-tab <?= (!$nowpaymentsEnabled && !$bkashEnabled) ? 'active' : '' ?>" data-gateway-target="tab-direct-crypto" style="padding: 12px 20px; border-radius: 8px; border: 1px solid #cbd5e1; background: #ffffff; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.92rem;">
                <i class="fa-solid fa-wallet" style="color: #4338ca;"></i> Direct Wallet
            </button>
        <?php endif; ?>
    </div>

    <!-- 1. NOWPayments Gateway Tab -->
    <?php if ($nowpaymentsEnabled): ?>
        <div class="gateway-content-pane" id="tab-nowpayments" style="display: block; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <h3 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">
                        <i class="fa-solid fa-bolt" style="color: #06b6d4;"></i> NOWPayments.io Automated Crypto Gateway
                    </h3>
                    <p style="font-size: 0.88rem; color: #64748b; margin: 0;">Automated blockchain confirmation for USDT, Bitcoin, Ethereum &amp; Solana.</p>
                </div>
                <span style="background: #ecfeff; color: #0891b2; border: 1px solid #a5f3fc; padding: 4px 12px; border-radius: 9999px; font-size: 0.78rem; font-weight: 700;">Instant Verification</span>
            </div>

            <!-- Currency Switcher -->
            <div style="margin-bottom: 20px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Select Cryptocurrency:</label>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;">
                    <?php
                    $coins = [
                        'USDT-TRC20' => ['name' => 'USDT (TRC20)', 'icon' => 'fa-coins', 'color' => '#10b981'],
                        'USDT-ERC20' => ['name' => 'USDT (ERC20)', 'icon' => 'fa-coins', 'color' => '#6366f1'],
                        'BTC' => ['name' => 'Bitcoin (BTC)', 'icon' => 'fa-bitcoin', 'color' => '#f59e0b'],
                        'ETH' => ['name' => 'Ethereum (ETH)', 'icon' => 'fa-ethereum', 'color' => '#8b5cf6'],
                        'SOL' => ['name' => 'Solana (SOL)', 'icon' => 'fa-sun', 'color' => '#06b6d4'],
                    ];
                    $selectedCoin = $_GET['coin'] ?? 'USDT-TRC20';
                    ?>
                    <?php foreach ($coins as $cKey => $cData): ?>
                        <a href="<?= url('/checkout/' . $order['id'] . '?coin=' . $cKey) ?>" 
                           style="display: block; padding: 12px; border: 2px solid <?= $selectedCoin === $cKey ? '#4361ee' : '#e2e8f0' ?>; background: <?= $selectedCoin === $cKey ? '#eef2ff' : '#ffffff' ?>; border-radius: 8px; text-align: center; text-decoration: none; color: #0f172a;">
                            <div style="font-size: 1.3rem; color: <?= $cData['color'] ?>;"><i class="fa-brands <?= $cData['icon'] ?>"></i></div>
                            <div style="font-size: 0.78rem; font-weight: 700; margin-top: 4px;"><?= $cData['name'] ?></div>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Payment Details & QR Code -->
            <div style="display: grid; grid-template-columns: 220px 1fr; gap: 24px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; margin-bottom: 24px;">
                <!-- QR Code Box -->
                <div style="text-align: center; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
                    <div id="crypto-qrcode" style="display: flex; justify-content: center; margin-bottom: 10px;">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=<?= urlencode($payment['wallet_address'] ?? '') ?>" alt="QR Code" style="width: 160px; height: 160px; border-radius: 6px;">
                    </div>
                    <div style="font-size: 0.75rem; color: #64748b; font-weight: 600;">Scan with Crypto Wallet</div>
                </div>

                <!-- Wallet Address & Amount -->
                <div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 0.78rem; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 6px;">Deposit Address</label>
                        <div style="display: flex; gap: 8px;">
                            <input type="text" id="wallet-addr-input" value="<?= e($payment['wallet_address'] ?? 'TRC20WalletDepositAddress') ?>" readonly class="digi-input" style="font-family: monospace; font-size: 0.88rem; background: #ffffff;">
                            <button type="button" onclick="navigator.clipboard.writeText(document.getElementById('wallet-addr-input').value); alert('Address copied to clipboard!');" class="btn btn-outline" style="flex-shrink: 0; padding: 10px 16px;">
                                <i class="fa-solid fa-copy"></i> Copy
                            </button>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                        <div>
                            <label style="display: block; font-size: 0.78rem; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 4px;">Pay Amount</label>
                            <div style="font-size: 1.4rem; font-weight: 800; color: #0f172a; font-family: monospace;">
                                <?= number_format($payment['crypto_amount'] ?? $order['total'], 6) ?> <?= e($selectedCoin) ?>
                            </div>
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.78rem; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 4px;">Lock Timer</label>
                            <div style="font-size: 1.4rem; font-weight: 800; color: #4361ee; font-family: monospace;" id="crypto-timer">
                                59:59
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Transaction Hash Submission -->
            <form action="<?= url('/checkout/' . $order['id'] . '/submit-tx') ?>" method="POST">
                <?= csrf_field() ?>
                <input type="hidden" name="payment_id" value="<?= $payment['payment_id'] ?? $payment['id'] ?? 1 ?>">
                <input type="hidden" name="gateway_used" value="nowpayments">

                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">Transaction Hash (TXID) *</label>
                    <input type="text" name="transaction_hash" class="digi-input" placeholder="Enter blockchain transaction hash (e.g. 8f4a7c...)" required>
                    <small style="color: #64748b; font-size: 0.8rem; margin-top: 4px; display: block;">Paste the TXID from your Binance, TrustWallet, Exodus, or exchange withdrawal.</small>
                </div>

                <div style="display: flex; gap: 14px; flex-wrap: wrap;">
                    <button type="submit" class="btn btn-blue-solid btn-lg" style="flex-grow: 1; padding: 14px 24px; font-weight: 700; font-size: 1rem; border-radius: 8px;">
                        <i class="fa-solid fa-paper-plane"></i> Confirm Crypto Payment
                    </button>
                    <button type="submit" name="simulate_instant_verify" value="1" class="btn btn-aqua-solid btn-lg" style="flex-shrink: 0; padding: 14px 20px; font-weight: 700; border-radius: 8px;" title="Simulate Instant Verification for Demo">
                        <i class="fa-solid fa-bolt"></i> Instant Demo Verify
                    </button>
                </div>
            </form>
        </div>
    <?php endif; ?>

    <!-- 2. bKash Gateway Tab -->
    <?php if ($bkashEnabled): ?>
        <div class="gateway-content-pane" id="tab-bkash" style="display: <?= !$nowpaymentsEnabled ? 'block' : 'none' ?>; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #fce7f3; padding-bottom: 16px; margin-bottom: 24px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <h3 style="font-size: 1.25rem; font-weight: 800; color: #e11d48; margin-bottom: 4px;">
                        <i class="fa-solid fa-mobile-screen-button"></i> bKash (বিকাশ) Payment Gateway
                    </h3>
                    <p style="font-size: 0.88rem; color: #64748b; margin: 0;">Pay in Bangladeshi Taka (BDT) securely via bKash App or USSD *247#.</p>
                </div>
                <span style="background: #fdf2f8; color: #e11d48; border: 1px solid #fbcfe8; font-size: 0.8rem; padding: 4px 12px; border-radius: 9999px; font-weight: 700;">
                    Type: <?= e($bkashType) ?>
                </span>
            </div>

            <!-- BDT Conversion Calculation -->
            <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 18px; margin-bottom: 20px; text-align: center;">
                <div style="font-size: 0.82rem; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">
                    Total Payable in BDT (Rate: $1 = <?= $bkashRate ?> BDT)
                </div>
                <div style="font-size: 2.2rem; font-weight: 850; color: #e11d48;">৳ <?= number_format($bdtAmount, 2) ?> BDT</div>
                <div style="font-size: 0.88rem; color: #475569; font-weight: 600; margin-top: 4px;">
                    Equivalent to $<?= number_format($usdAmount, 2) ?> USD
                </div>
            </div>

            <!-- bKash Number & Copy -->
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 18px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                <div>
                    <div style="font-size: 0.76rem; color: #64748b; text-transform: uppercase; font-weight: 700;">bKash Account Number</div>
                    <div style="font-size: 1.5rem; font-weight: 800; color: #0f172a; font-family: monospace;" id="bkash-num-text">
                        <?= e($bkashNumber) ?>
                    </div>
                </div>
                <button type="button" onclick="navigator.clipboard.writeText('<?= e($bkashNumber) ?>'); alert('bKash number copied to clipboard!');" class="btn btn-outline" style="padding: 10px 18px;">
                    <i class="fa-solid fa-copy"></i> Copy Number
                </button>
            </div>

            <!-- Step by Step Instructions -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
                <div style="font-weight: 700; color: #0f172a; margin-bottom: 8px;">
                    <i class="fa-solid fa-circle-info" style="color: #e11d48;"></i> Payment Instructions:
                </div>
                <div style="white-space: pre-line; line-height: 1.6; font-size: 0.9rem; color: #334155;">
                    <?= nl2br(e($bkashInstructions)) ?>
                </div>
            </div>

            <!-- bKash TrxID Submission Form -->
            <form action="<?= url('/checkout/' . $order['id'] . '/submit-bkash') ?>" method="POST">
                <?= csrf_field() ?>
                <input type="hidden" name="bdt_amount" value="<?= $bdtAmount ?>">

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                    <div>
                        <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">Your bKash Mobile Number *</label>
                        <input type="text" name="sender_number" class="digi-input" placeholder="01XXXXXXXXX" required>
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">bKash Transaction ID (TrxID) *</label>
                        <input type="text" name="transaction_id" class="digi-input" placeholder="e.g. BL9A8K7Z6Q" required style="font-family: monospace; text-transform: uppercase;">
                    </div>
                </div>

                <div style="display: flex; gap: 14px; flex-wrap: wrap;">
                    <button type="submit" class="btn btn-lg" style="flex-grow: 1; background: #e11d48; color: #ffffff; border: none; padding: 14px 24px; font-weight: 700; border-radius: 8px;">
                        <i class="fa-solid fa-check"></i> Submit bKash TrxID
                    </button>
                    <button type="submit" name="simulate_instant_verify" value="1" class="btn btn-outline btn-lg" style="flex-shrink: 0; padding: 14px 20px; font-weight: 700; border-radius: 8px;">
                        <i class="fa-solid fa-bolt"></i> Instant Demo Verify
                    </button>
                </div>
            </form>
        </div>
    <?php endif; ?>

    <!-- 3. Direct Crypto Tab -->
    <?php if ($manualCryptoEnabled): ?>
        <div class="gateway-content-pane" id="tab-direct-crypto" style="display: <?= (!$nowpaymentsEnabled && !$bkashEnabled) ? 'block' : 'none' ?>; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
            <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 20px;">
                <h3 style="font-size: 1.25rem; font-weight: 800; color: #0f172a;">Direct Blockchain Wallet Transfer</h3>
                <p style="font-size: 0.88rem; color: #64748b; margin: 0;">Direct on-chain payment with manual TXID verification.</p>
            </div>

            <div style="margin-bottom: 18px;">
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">USDT TRC-20 Wallet Address</label>
                <input type="text" value="<?= e(setting('usdt_trc20_address', 'TXxxDirectWalletDepositAddress')) ?>" readonly class="digi-input" style="font-family: monospace;">
            </div>

            <form action="<?= url('/checkout/' . $order['id'] . '/submit-tx') ?>" method="POST">
                <?= csrf_field() ?>
                <input type="hidden" name="payment_id" value="<?= $payment['payment_id'] ?? $payment['id'] ?? 1 ?>">
                <div style="margin-bottom: 18px;">
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">Transaction Hash (TXID) *</label>
                    <input type="text" name="transaction_hash" class="digi-input" required placeholder="Enter Transaction Hash">
                </div>
                <button type="submit" class="btn btn-blue-solid btn-lg btn-block" style="padding: 14px; font-weight: 700; border-radius: 8px;">Confirm Manual Deposit</button>
            </form>
        </div>
    <?php endif; ?>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.checkout-gateway-tab');
    const panes = document.querySelectorAll('.gateway-content-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.style.borderColor = '#cbd5e1';
                t.style.background = '#ffffff';
            });
            panes.forEach(p => p.style.display = 'none');

            this.classList.add('active');
            this.style.borderColor = '#4361ee';
            this.style.background = '#eef2ff';
            const targetId = this.getAttribute('data-gateway-target');
            const targetPane = document.getElementById(targetId);
            if (targetPane) targetPane.style.display = 'block';
        });
    });

    // 60-Minute Countdown Timer
    let duration = 3599;
    const timerElem = document.getElementById('crypto-timer');
    if (timerElem) {
        setInterval(() => {
            const m = Math.floor(duration / 60);
            const s = duration % 60;
            timerElem.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            if (duration > 0) duration--;
        }, 1000);
    }
});
</script>
