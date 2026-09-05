// assets/js/main.js - Public UI Interactions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.digi-nav-links, .nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('open');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Mobile dropdown click toggle
        const dropdownToggles = document.querySelectorAll('.digi-nav-item.has-dropdown > a');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    toggle.parentElement.classList.toggle('open');
                }
            });
        });
    }

    // 2. Sticky Header Scroll Effect
    const header = document.querySelector('.digi-header, .site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. FAQ Accordion (Global Event Delegation)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.faq-question');
        if (!btn) return;

        const item = btn.closest('.faq-item');
        if (!item) return;

        e.preventDefault();
        const isActive = item.classList.contains('active');

        if (isActive) {
            item.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
        } else {
            item.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
        }
    });

    // 4. Modal Triggers
    const modalOpenButtons = document.querySelectorAll('[data-modal-target]');
    modalOpenButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-modal-target');
            const modal = document.getElementById(targetId);
            if (modal) {
                // Populate package info if provided
                const pkgId = btn.getAttribute('data-package-id');
                const pkgName = btn.getAttribute('data-package-name');
                const pkgPrice = btn.getAttribute('data-package-price');
                const serviceId = btn.getAttribute('data-service-id');

                if (pkgId && modal.querySelector('#order_package_id')) {
                    modal.querySelector('#order_package_id').value = pkgId;
                }
                if (serviceId && modal.querySelector('#order_service_id')) {
                    modal.querySelector('#order_service_id').value = serviceId;
                }
                if (pkgName && modal.querySelector('#modal_pkg_name')) {
                    modal.querySelector('#modal_pkg_name').textContent = pkgName;
                }
                if (pkgPrice && modal.querySelector('#modal_pkg_price')) {
                    modal.querySelector('#modal_pkg_price').textContent = '$' + pkgPrice;
                }

                modal.classList.add('show');
            }
        });
    });

    const modalCloseButtons = document.querySelectorAll('.modal-close, [data-modal-close]');
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-backdrop');
            if (modal) modal.classList.remove('show');
        });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(bd => {
        bd.addEventListener('click', (e) => {
            if (e.target === bd) {
                bd.classList.remove('show');
            }
        });
    });

    // 5. Google Search Console Lightbox Modal Handler
    const gscLightbox = document.getElementById('gscProofLightbox');
    const gscLightboxImg = document.getElementById('gscLightboxImage');
    const gscLightboxTitle = document.getElementById('gscLightboxTitle');
    const gscLightboxFooter = document.getElementById('gscLightboxFooter');

    window.openGscProofModal = function(src, title, stats) {
        if (!gscLightbox || !gscLightboxImg) return;
        gscLightboxImg.src = src;
        if (gscLightboxTitle) {
            gscLightboxTitle.innerHTML = '<i class="fa-brands fa-google" style="color: #4285F4;"></i> ' + (title || 'Google Search Console Performance Report');
        }
        if (gscLightboxFooter) {
            gscLightboxFooter.textContent = stats || '100% Authentic Google Search Console Verified Data';
        }
        gscLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeGscProofModal = function() {
        if (!gscLightbox) return;
        gscLightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (gscLightbox) {
        gscLightbox.addEventListener('click', (e) => {
            if (e.target === gscLightbox || e.target.closest('.gsc-lightbox-close')) {
                window.closeGscProofModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && gscLightbox.classList.contains('active')) {
                window.closeGscProofModal();
            }
        });
    }

    // Bind all .gsc-trigger clicks dynamically
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.gsc-trigger');
        if (trigger) {
            e.preventDefault();
            const src = trigger.getAttribute('data-gsc-img') || trigger.querySelector('img')?.src;
            const title = trigger.getAttribute('data-gsc-title') || '';
            const stats = trigger.getAttribute('data-gsc-stats') || '';
            if (src) {
                window.openGscProofModal(src, title, stats);
            }
        }
    });

    // 6. Unified Carousel Initializer Function
    function setupCarousel(wrapper) {
        if (!wrapper) return;

        const viewport = wrapper.querySelector('.gsc-carousel-viewport, .content-carousel-viewport');
        const track = wrapper.querySelector('.gsc-carousel-track, .content-carousel-track');
        const prevBtn = wrapper.querySelector('.gsc-prev-btn, .content-prev-btn, .gsc-prev');
        const nextBtn = wrapper.querySelector('.gsc-next-btn, .content-next-btn, .gsc-next');
        const dotsContainer = wrapper.querySelector('.gsc-carousel-dots, .content-carousel-dots');
        const counterCurrentRange = wrapper.querySelector('#gscCurrentRange, .content-current-range');
        const viewToggle = wrapper.querySelector('.gsc-view-toggle, .content-view-toggle');

        if (!viewport || !track) return;

        const slides = Array.from(track.querySelectorAll('.gsc-carousel-slide, .content-carousel-slide'));
        const totalSlides = slides.length;
        if (totalSlides === 0) return;

        let currentIndex = 0;
        let isDragging = false;
        let startX = 0;
        let autoplayTimer = null;
        let isHovered = false;

        const getVisibleCount = () => {
            const width = window.innerWidth;
            if (width > 1024) return 3;
            if (width > 680) return 2;
            return 1;
        };

        const getMaxIndex = () => {
            const visible = getVisibleCount();
            return Math.max(0, totalSlides - visible);
        };

        const renderDots = () => {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const maxIndex = getMaxIndex();
            const totalDots = maxIndex + 1;

            if (totalDots <= 1) {
                dotsContainer.style.display = 'none';
                return;
            } else {
                dotsContainer.style.display = 'flex';
            }

            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = (wrapper.classList.contains('content-carousel-wrapper') ? 'content-carousel-dot' : 'gsc-carousel-dot') + (i === currentIndex ? ' active' : '');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', (e) => {
                    e.preventDefault();
                    goToSlide(i);
                    resetAutoplay();
                });
                dotsContainer.appendChild(dot);
            }
        };

        const updateUI = () => {
            const maxIndex = getMaxIndex();
            const visible = getVisibleCount();

            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            if (counterCurrentRange) {
                const endRange = Math.min(currentIndex + visible, totalSlides);
                counterCurrentRange.textContent = `${currentIndex + 1} - ${endRange}`;
            }

            // Keep buttons visible and active if more slides exist
            if (totalSlides <= visible) {
                if (prevBtn) prevBtn.style.opacity = '0.4';
                if (nextBtn) nextBtn.style.opacity = '0.4';
            } else {
                if (prevBtn) {
                    prevBtn.style.opacity = '1';
                    prevBtn.disabled = false;
                }
                if (nextBtn) {
                    nextBtn.style.opacity = '1';
                    nextBtn.disabled = false;
                }
            }

            // Update active dot
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('button');
                dots.forEach((d, idx) => {
                    d.classList.toggle('active', idx === currentIndex);
                });
            }

            // Calculate precise slide offset
            if (slides[0]) {
                const slideWidth = slides[0].offsetWidth || slides[0].getBoundingClientRect().width;
                const gap = 24;
                const offset = currentIndex * (slideWidth + gap);
                track.style.transform = `translateX(-${offset}px)`;
            }
        };

        const goToSlide = (index) => {
            const maxIndex = getMaxIndex();
            if (index < 0) {
                currentIndex = 0;
            } else if (index > maxIndex) {
                currentIndex = maxIndex;
            } else {
                currentIndex = index;
            }
            updateUI();
        };

        const nextSlide = () => {
            const maxIndex = getMaxIndex();
            if (maxIndex === 0) return;
            if (currentIndex < maxIndex) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0); // Seamless loop back to first slide
            }
        };

        const prevSlide = () => {
            const maxIndex = getMaxIndex();
            if (maxIndex === 0) return;
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(maxIndex); // Loop to last slide
            }
        };

        const startAutoplay = () => {
            stopAutoplay();
            if (totalSlides <= getVisibleCount()) return;
            autoplayTimer = setInterval(() => {
                if (!isHovered && !wrapper.classList.contains('view-grid')) {
                    nextSlide();
                }
            }, 4500);
        };

        const stopAutoplay = () => {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        };

        const resetAutoplay = () => {
            stopAutoplay();
            startAutoplay();
        };

        // Navigation button listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                prevSlide();
                resetAutoplay();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                nextSlide();
                resetAutoplay();
            });
        }

        // View Mode Switcher
        if (viewToggle) {
            const viewBtns = viewToggle.querySelectorAll('button');
            viewBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    viewBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const mode = btn.getAttribute('data-view');
                    if (mode === 'grid') {
                        wrapper.classList.add('view-grid');
                        stopAutoplay();
                    } else {
                        wrapper.classList.remove('view-grid');
                        updateUI();
                        startAutoplay();
                    }
                });
            });
        }

        // Pause on hover
        wrapper.addEventListener('mouseenter', () => { isHovered = true; });
        wrapper.addEventListener('mouseleave', () => { isHovered = false; });

        // Touch & Drag Support
        const getPositionX = (e) => (e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);

        const touchStart = (e) => {
            if (wrapper.classList.contains('view-grid')) return;
            if (e.target.closest('button') || e.target.closest('a')) return;
            isDragging = true;
            startX = getPositionX(e);
            viewport.classList.add('is-dragging');
            stopAutoplay();
        };

        const touchEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            viewport.classList.remove('is-dragging');
            const endX = (e.type.includes('mouse') ? e.pageX : (e.changedTouches ? e.changedTouches[0].clientX : startX));
            const diffX = endX - startX;

            if (diffX < -40) {
                nextSlide();
            } else if (diffX > 40) {
                prevSlide();
            } else {
                updateUI();
            }
            startAutoplay();
        };

        viewport.addEventListener('touchstart', touchStart, { passive: true });
        viewport.addEventListener('touchend', touchEnd, { passive: true });
        viewport.addEventListener('mousedown', touchStart);
        viewport.addEventListener('mouseup', touchEnd);
        viewport.addEventListener('mouseleave', () => {
            if (isDragging) touchEnd({ type: 'mouse', pageX: startX });
        });

        // Resize Listener
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                renderDots();
                updateUI();
            }, 100);
        });

        // Initialize
        renderDots();
        updateUI();
        startAutoplay();
    }

    // Initialize all carousels on the page (Portfolio GSC Proof & Content Guides)
    const allCarousels = document.querySelectorAll('.gsc-carousel-wrapper, .content-carousel-wrapper');
    allCarousels.forEach(wrapper => setupCarousel(wrapper));
});

