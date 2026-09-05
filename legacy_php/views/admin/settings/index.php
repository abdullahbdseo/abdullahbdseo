<?php
// views/admin/settings/index.php - Centralized Admin & Gateway Controller
?>

<div style="max-width: 960px; margin: 0 auto;">
    <div style="margin-bottom: 24px;">
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">System & Gateway Settings</h2>
        <p style="color: #64748b; font-size: 0.92rem;">Control payment gateways (NOWPayments.io & bKash), branding logo, and expert credentials.</p>
    </div>

    <!-- Tabbed Navigation -->
    <div class="admin-tabs">
        <div class="admin-tab active" data-tab-target="tab-gateways"><i class="fa-solid fa-credit-card"></i> Payment Gateways</div>
        <div class="admin-tab" data-tab-target="tab-branding"><i class="fa-solid fa-paintbrush"></i> Branding & Logo</div>
        <div class="admin-tab" data-tab-target="tab-profile"><i class="fa-solid fa-user-tie"></i> Expert Profile Photo</div>
        <div class="admin-tab" data-tab-target="tab-contact"><i class="fa-solid fa-address-book"></i> Contact & Socials</div>
    </div>

    <form action="<?= url('/admin/settings/update') ?>" method="POST" enctype="multipart/form-data">
        <?= csrf_field() ?>

        <!-- Tab 1: Payment Gateways Controller (NOWPayments & bKash) -->
        <div class="tab-content" id="tab-gateways" style="display: block;">
            
            <!-- NOWPayments.io Controller -->
            <div class="gateway-controller-card">
                <div class="gateway-controller-header">
                    <div>
                        <h3 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 2px;">
                            <i class="fa-brands fa-bitcoin" style="color: #f59e0b;"></i> NOWPayments.io Crypto Gateway
                        </h3>
                        <p style="font-size: 0.82rem; color: #64748b; margin: 0;">Automated cryptocurrency invoicing and instant blockchain verification.</p>
                    </div>
                    <div class="switch-wrapper">
                        <label class="switch">
                            <input type="checkbox" name="gateway_nowpayments_enabled" value="1" <?= setting('gateway_nowpayments_enabled', '1') ? 'checked' : '' ?>>
                            <span class="slider"></span>
                        </label>
                        <span style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">Active</span>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div class="form-group">
                        <label class="form-label">NOWPayments API Key</label>
                        <input type="text" name="nowpayments_api_key" value="<?= e(setting('nowpayments_api_key')) ?>" class="form-control" style="font-family: monospace;" placeholder="Enter NOWPayments API Key">
                    </div>
                    <div class="form-group">
                        <label class="form-label">IPN Secret Key</label>
                        <input type="text" name="nowpayments_ipn_secret" value="<?= e(setting('nowpayments_ipn_secret')) ?>" class="form-control" style="font-family: monospace;" placeholder="Enter IPN Secret">
                    </div>
                </div>

                <div style="display: flex; gap: 24px; align-items: center; background: #f8fafc; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 4px;">
                    <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.88rem; cursor: pointer;">
                        <input type="checkbox" name="nowpayments_sandbox" value="1" <?= setting('nowpayments_sandbox', '1') ? 'checked' : '' ?>>
                        Enable Sandbox / Test Mode
                    </label>
                    <span style="font-size: 0.8rem; color: #64748b;">Webhook URL: <code><?= SITE_URL ?>/payment/nowpayments/ipn</code></span>
                </div>
            </div>

            <!-- bKash (বিকাশ) Controller -->
            <div class="gateway-controller-card">
                <div class="gateway-controller-header">
                    <div>
                        <h3 style="font-size: 1.1rem; color: #e11d48; margin-bottom: 2px;">
                            <i class="fa-solid fa-mobile-screen-button"></i> bKash (বিকাশ) Payment Gateway
                        </h3>
                        <p style="font-size: 0.82rem; color: #64748b; margin: 0;">Accept Bangladeshi Taka (BDT) payments via Send Money / Merchant.</p>
                    </div>
                    <div class="switch-wrapper">
                        <label class="switch">
                            <input type="checkbox" name="gateway_bkash_enabled" value="1" <?= setting('gateway_bkash_enabled', '1') ? 'checked' : '' ?>>
                            <span class="slider"></span>
                        </label>
                        <span style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">Active</span>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
                    <div class="form-group">
                        <label class="form-label">bKash Account Number *</label>
                        <input type="text" name="bkash_number" value="<?= e(setting('bkash_number', '01700000000')) ?>" class="form-control" style="font-family: monospace; font-weight: 700;">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Account Type</label>
                        <select name="bkash_type" class="form-control">
                            <option value="Personal" <?= setting('bkash_type') === 'Personal' ? 'selected' : '' ?>>Personal (Send Money)</option>
                            <option value="Merchant" <?= setting('bkash_type') === 'Merchant' ? 'selected' : '' ?>>Merchant (Make Payment)</option>
                            <option value="Agent" <?= setting('bkash_type') === 'Agent' ? 'selected' : '' ?>>Agent (Cash Out)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">USD to BDT Exchange Rate *</label>
                        <input type="number" step="0.01" name="bkash_usd_rate" value="<?= e(setting('bkash_usd_rate', '122.50')) ?>" class="form-control" style="font-weight: 700;">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">bKash Payment Instructions</label>
                    <textarea name="bkash_instructions" class="form-control" style="min-height: 80px; font-size: 0.88rem;"><?= e(setting('bkash_instructions')) ?></textarea>
                </div>
            </div>

            <!-- Direct Crypto Wallets Controller -->
            <div class="gateway-controller-card">
                <div class="gateway-controller-header">
                    <div>
                        <h3 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 2px;">
                            <i class="fa-solid fa-wallet" style="color: #4338ca;"></i> Direct Blockchain Wallet Addresses
                        </h3>
                        <p style="font-size: 0.82rem; color: #64748b; margin: 0;">Fallback direct deposit addresses.</p>
                    </div>
                    <div class="switch-wrapper">
                        <label class="switch">
                            <input type="checkbox" name="gateway_crypto_manual_enabled" value="1" <?= setting('gateway_crypto_manual_enabled', '1') ? 'checked' : '' ?>>
                            <span class="slider"></span>
                        </label>
                        <span style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">Active</span>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div class="form-group">
                        <label class="form-label">USDT TRC-20 Address</label>
                        <input type="text" name="usdt_trc20_address" value="<?= e(setting('usdt_trc20_address')) ?>" class="form-control" style="font-family: monospace;">
                    </div>
                    <div class="form-group">
                        <label class="form-label">USDT ERC-20 Address</label>
                        <input type="text" name="usdt_erc20_address" value="<?= e(setting('usdt_erc20_address')) ?>" class="form-control" style="font-family: monospace;">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
                    <div class="form-group">
                        <label class="form-label">Bitcoin (BTC) Address</label>
                        <input type="text" name="btc_address" value="<?= e(setting('btc_address')) ?>" class="form-control" style="font-family: monospace;">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Ethereum (ETH) Address</label>
                        <input type="text" name="eth_address" value="<?= e(setting('eth_address')) ?>" class="form-control" style="font-family: monospace;">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Solana (SOL) Address</label>
                        <input type="text" name="sol_address" value="<?= e(setting('sol_address')) ?>" class="form-control" style="font-family: monospace;">
                    </div>
                </div>
            </div>

        </div>

        <!-- Tab 2: Branding & Logo -->
        <div class="tab-content" id="tab-branding" style="display: none;">
            <div class="admin-card">
                <div class="admin-card-header">
                    <div>
                        <h3 style="font-size: 1.15rem; color: #0f172a; margin-bottom: 2px;">Brand Logo & Identity Assets</h3>
                        <p style="font-size: 0.82rem; color: #64748b; margin: 0;">Configure header logo, footer dark logo, favicon, and brand colors.</p>
                    </div>
                    <label style="font-size: 0.85rem; display: flex; align-items: center; gap: 6px; cursor: pointer; color: #4361ee; font-weight: 600;">
                        <input type="checkbox" name="reset_default_logos" value="1">
                        Reset to Default "AS" Vector Logos
                    </label>
                </div>
                <div class="admin-card-body">
                    
                    <!-- 1. Header Logo (Light Background / Dark Text) -->
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <div>
                                <h4 style="font-size: 0.98rem; font-weight: 700; color: #0f172a; margin-bottom: 2px;">
                                    <i class="fa-solid fa-sun" style="color: #f59e0b; margin-right: 6px;"></i> Primary Header Logo (Light Background)
                                </h4>
                                <span style="font-size: 0.8rem; color: #64748b;">Used in site header, authentication pages, and client portal (SVG or transparent PNG).</span>
                            </div>
                            <span class="badge badge-cyan" style="font-size: 0.75rem;"><i class="fa-solid fa-check"></i> Active</span>
                        </div>

                        <!-- Current Preview -->
                        <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 16px 20px; margin-bottom: 14px; display: flex; align-items: center; gap: 20px;">
                            <div style="background: #ffffff; padding: 10px 20px; border-radius: 6px; border: 1px solid #e2e8f0; display: inline-flex; align-items: center;">
                                <img src="<?= asset('images/logo.svg') ?>" alt="Header Logo" style="height: 38px; width: auto; max-width: 220px; display: block;">
                            </div>
                            <div style="font-size: 0.82rem; color: #64748b;">
                                <strong>Format:</strong> Vector SVG (Sharp at 4K & Retina)<br>
                                <strong>Default Path:</strong> <code>assets/images/logo.svg</code>
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom: 0;">
                            <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">Upload New Header Logo File</label>
                            <input type="file" name="site_logo_image_file" class="form-control" accept=".svg,.png,.webp,.jpg">
                            <small style="color: #64748b; font-size: 0.78rem;">Upload an SVG or transparent PNG (recommended dimensions: ~240x60px).</small>
                        </div>
                    </div>

                    <!-- 2. Footer Logo (Dark Royal Blue Background / White Text) -->
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <div>
                                <h4 style="font-size: 0.98rem; font-weight: 700; color: #0f172a; margin-bottom: 2px;">
                                    <i class="fa-solid fa-moon" style="color: #6366f1; margin-right: 6px;"></i> Footer & Dark Mode Logo (White Text)
                                </h4>
                                <span style="font-size: 0.8rem; color: #64748b;">Used in royal blue footer, dark mode views, and admin sidebar header.</span>
                            </div>
                            <span class="badge badge-cyan" style="font-size: 0.75rem;"><i class="fa-solid fa-check"></i> Active</span>
                        </div>

                        <!-- Current Preview in Dark Container -->
                        <div style="background: #1e3a8a; border: 1px dashed #3b82f6; border-radius: 6px; padding: 16px 20px; margin-bottom: 14px; display: flex; align-items: center; gap: 20px;">
                            <div style="padding: 10px 20px; display: inline-flex; align-items: center;">
                                <img src="<?= asset('images/logo-white.svg') ?>" alt="Footer Logo" style="height: 38px; width: auto; max-width: 220px; display: block;">
                            </div>
                            <div style="font-size: 0.82rem; color: #93c5fd;">
                                <strong>Format:</strong> High-Contrast Vector SVG<br>
                                <strong>Default Path:</strong> <code>assets/images/logo-white.svg</code>
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom: 0;">
                            <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">Upload New Footer / Dark Logo File</label>
                            <input type="file" name="site_logo_dark_file" class="form-control" accept=".svg,.png,.webp">
                            <small style="color: #64748b; font-size: 0.78rem;">Upload a white text SVG or transparent PNG for dark backgrounds.</small>
                        </div>
                    </div>

                    <!-- 3. Favicon & App Icon -->
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <div>
                                <h4 style="font-size: 0.98rem; font-weight: 700; color: #0f172a; margin-bottom: 2px;">
                                    <i class="fa-solid fa-bookmark" style="color: #06b6d4; margin-right: 6px;"></i> Browser Favicon & Mobile App Icon
                                </h4>
                                <span style="font-size: 0.8rem; color: #64748b;">Displayed in browser tabs, bookmarks, and mobile home screen shortcuts.</span>
                            </div>
                            <span class="badge badge-cyan" style="font-size: 0.75rem;"><i class="fa-solid fa-check"></i> Active</span>
                        </div>

                        <!-- Current Preview -->
                        <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 14px 20px; margin-bottom: 14px; display: flex; align-items: center; gap: 20px;">
                            <div style="width: 48px; height: 48px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                <img src="<?= asset('images/favicon.svg') ?>" alt="Favicon" style="width: 36px; height: 36px; display: block;">
                            </div>
                            <div style="font-size: 0.82rem; color: #64748b;">
                                <strong>Icon:</strong> "AS" Blue Rounded Gradient Badge<br>
                                <strong>Default Path:</strong> <code>assets/images/favicon.svg</code>
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom: 0;">
                            <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">Upload New Favicon File</label>
                            <input type="file" name="site_favicon_file" class="form-control" accept=".svg,.png,.ico">
                            <small style="color: #64748b; font-size: 0.78rem;">Recommended: Square SVG or PNG (e.g. 192x192px or 512x512px).</small>
                        </div>
                    </div>

                    <!-- 4. Typography & Colors -->
                    <h4 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
                        <i class="fa-solid fa-palette" style="color: #4361ee; margin-right: 6px;"></i> Brand Typography & Theme Colors
                    </h4>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div class="form-group">
                            <label class="form-label">Website Brand Name</label>
                            <input type="text" name="site_name" value="<?= e(setting('site_name', 'Abdullah Saleh')) ?>" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Brand Text Fallback (e.g. "Abdullah Saleh")</label>
                            <input type="text" name="site_logo_text" value="<?= e(setting('site_logo_text', 'Abdullah Saleh')) ?>" class="form-control" required>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label class="form-label">Primary Brand Color</label>
                            <input type="color" name="primary_color" value="<?= e(setting('primary_color', '#4361ee')) ?>" class="form-control" style="height: 46px; padding: 4px;">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Accent Highlight Color</label>
                            <input type="color" name="accent_color" value="<?= e(setting('accent_color', '#06b6d4')) ?>" class="form-control" style="height: 46px; padding: 4px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab 3: Expert Profile Photo -->
        <div class="tab-content" id="tab-profile" style="display: none;">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h3>Abdullah Saleh Profile & Portrait Photo</h3>
                </div>
                <div class="admin-card-body">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label class="form-label">Expert Full Name</label>
                            <input type="text" name="expert_name" value="<?= e(setting('expert_name', 'Abdullah Saleh')) ?>" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Professional Title</label>
                            <input type="text" name="expert_title" value="<?= e(setting('expert_title', 'SEO Specialist & Organic Growth Strategist')) ?>" class="form-control" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Expert Bio</label>
                        <textarea name="expert_bio" class="form-control" style="min-height: 90px;"><?= e(setting('expert_bio')) ?></textarea>
                    </div>

                    <div class="form-group" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 18px; margin-top: 16px;">
                        <label class="form-label" style="font-weight: 700; color: #4338ca;"><i class="fa-solid fa-camera"></i> Upload Official Portrait Photo</label>
                        <?php if ($pPhoto = setting('profile_photo')): ?>
                            <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 16px;">
                                <img src="<?= uploadUrl($pPhoto) ?>" alt="Profile" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; border: 2px solid #4338ca;">
                                <span style="font-size: 0.85rem; color: #059669; font-weight: 600;"><i class="fa-solid fa-check"></i> Custom Portrait Active</span>
                            </div>
                        <?php endif; ?>
                        <input type="file" name="profile_photo_file" class="form-control">
                        <small style="color: #64748b; font-size: 0.8rem;">Upload your actual photograph. Until uploaded, the vector hero placeholder card is shown.</small>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab 4: Contact & Socials -->
        <div class="tab-content" id="tab-contact" style="display: none;">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h3>Contact Information & Social Links</h3>
                </div>
                <div class="admin-card-body">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label class="form-label">Contact Email</label>
                            <input type="email" name="contact_email" value="<?= e(setting('contact_email')) ?>" class="form-control">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Contact Phone</label>
                            <input type="text" name="contact_phone" value="<?= e(setting('contact_phone')) ?>" class="form-control">
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label class="form-label">WhatsApp Number</label>
                            <input type="text" name="whatsapp_number" value="<?= e(setting('whatsapp_number')) ?>" class="form-control">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Working Hours</label>
                            <input type="text" name="working_hours" value="<?= e(setting('working_hours')) ?>" class="form-control">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Office Address</label>
                        <textarea name="office_address" class="form-control" style="min-height: 70px;"><?= e(setting('office_address')) ?></textarea>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label class="form-label"><i class="fa-brands fa-linkedin" style="color: #0077b5;"></i> LinkedIn URL</label>
                            <input type="url" name="social_linkedin" value="<?= e(setting('social_linkedin')) ?>" class="form-control">
                        </div>
                        <div class="form-group">
                            <label class="form-label"><i class="fa-brands fa-x-twitter"></i> X / Twitter URL</label>
                            <input type="url" name="social_twitter" value="<?= e(setting('social_twitter')) ?>" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg" style="margin-top: 10px;">
            <i class="fa-solid fa-floppy-disk"></i> Save All Settings & Gateways
        </button>
    </form>
</div>
