// assets/js/crypto_checkout.js - Live Crypto Checkout Controller

document.addEventListener('DOMContentLoaded', () => {
    // 1. Copy Address to Clipboard
    const copyBtn = document.getElementById('btn_copy_address');
    const addressEl = document.getElementById('crypto_wallet_address');

    if (copyBtn && addressEl) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = addressEl.textContent.trim();
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalHtml = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                copyBtn.style.backgroundColor = '#10b981';
                copyBtn.style.color = '#ffffff';

                setTimeout(() => {
                    copyBtn.innerHTML = originalHtml;
                    copyBtn.style.backgroundColor = '';
                    copyBtn.style.color = '';
                }, 2500);
            }).catch(err => {
                alert('Wallet address: ' + textToCopy);
            });
        });
    }

    // 2. Countdown Timer
    const timerDisplay = document.getElementById('payment_countdown');
    if (timerDisplay) {
        const expiresAtStr = timerDisplay.getAttribute('data-expires-at');
        if (expiresAtStr) {
            const expiryTime = new Date(expiresAtStr.replace(/-/g, '/')).getTime();

            const updateTimer = () => {
                const now = new Date().getTime();
                const distance = expiryTime - now;

                if (distance <= 0) {
                    timerDisplay.textContent = 'Expired. Please refresh page.';
                    timerDisplay.style.color = '#ef4444';
                    clearInterval(timerInterval);
                    return;
                }

                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                timerDisplay.textContent = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
            };

            updateTimer();
            const timerInterval = setInterval(updateTimer, 1000);
        }
    }

    // 3. Dynamic QR Code rendering using public quickchart/qr API
    const qrContainer = document.getElementById('crypto_qr_container');
    if (qrContainer && addressEl) {
        const address = encodeURIComponent(addressEl.textContent.trim());
        const qrImg = document.createElement('img');
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}&margin=5`;
        qrImg.alt = 'Crypto Wallet QR Code';
        qrImg.style.width = '150px';
        qrImg.style.height = '150px';
        qrImg.style.borderRadius = '6px';
        qrContainer.innerHTML = '';
        qrContainer.appendChild(qrImg);
    }
});
