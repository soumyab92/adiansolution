/**
 * ADIAN Solution & Services - Core JS logic
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- Fixed Scrolled Header Transition ---
    const header = document.querySelector("header.site-header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // --- Mobile Menu Toggle & Close ---
    const menuToggle = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.querySelector("nav.nav-menu");
    const navCloseBtn = document.querySelector(".mobile-nav-close");

    const closeMobileMenu = () => {
        if (navMenu) navMenu.classList.remove("active");
        if (menuToggle) {
            menuToggle.classList.remove("active");
            const spans = menuToggle.querySelectorAll("span");
            if (spans.length === 3) {
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            }
        }
    };

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isActive = navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
            const spans = menuToggle.querySelectorAll("span");
            if (isActive && spans.length === 3) {
                spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
                spans[1].style.opacity = "0";
                spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
            } else if (spans.length === 3) {
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            }
        });
    }

    if (navCloseBtn) {
        navCloseBtn.addEventListener("click", closeMobileMenu);
    }

    // Close mobile menu on clicking any navigation link
    const navLinks = document.querySelectorAll("nav.nav-menu a");
    navLinks.forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    // --- Counter Animation for Statistics ---
    const statsSection = document.querySelector(".stats-strip");
    const statNumbers = document.querySelectorAll(".stat-number");
    
    if (statsSection && statNumbers.length > 0) {
        let animated = false;

        const countUp = (element) => {
            const target = parseInt(element.getAttribute("data-target"), 10);
            const duration = 2000; // 2 seconds
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;
            
            const timer = setInterval(() => {
                current += Math.ceil(target / 50); // Increment speed relative to target size
                if (current >= target) {
                    element.textContent = target + "+";
                    clearInterval(timer);
                } else {
                    element.textContent = current + "+";
                }
            }, 30);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    statNumbers.forEach(num => countUp(num));
                    animated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    // --- Contact Form Input Limits & Seamless AJAX Submission ---
    const quoteForm = document.getElementById("quote-form");
    if (quoteForm) {
        const phoneInput = quoteForm.querySelector("input[name='phone']");
        const emailInput = quoteForm.querySelector("input[name='email']");

        if (phoneInput) {
            phoneInput.addEventListener("input", (e) => {
                // Restrict strictly to digits 0-9, max 10 digits
                e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
            });
        }

        quoteForm.addEventListener("submit", function(e) {
            if (phoneInput && phoneInput.value.length !== 10) {
                e.preventDefault();
                alert("Please enter a valid 10-digit mobile number.");
                phoneInput.focus();
                return false;
            }

            if (emailInput) {
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailPattern.test(emailInput.value)) {
                    e.preventDefault();
                    alert("Please enter a valid email address (e.g. name@company.com).");
                    emailInput.focus();
                    return false;
                }
            }

            const actionUrl = quoteForm.getAttribute("action");
            if (actionUrl && actionUrl.includes("formsubmit.co")) {
                e.preventDefault();

                const submitBtn = quoteForm.querySelector(".btn-submit");
                const originalBtnText = submitBtn ? submitBtn.innerHTML : "Submit Inquiry & Request Quote";
                
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Request...';
                }

                const formData = new FormData(quoteForm);

                fetch("https://formsubmit.co/ajax/soumyabhattacharya.kgp@gmail.com", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }

                    let alertBox = document.getElementById("form-alert-msg");
                    if (!alertBox) {
                        alertBox = document.createElement("div");
                        alertBox.id = "form-alert-msg";
                        quoteForm.parentNode.insertBefore(alertBox, quoteForm);
                    }
                    alertBox.style.cssText = "background-color: #DEF7EC; color: #03543F; padding: 16px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; font-weight: 600; border-left: 4px solid #0E9F6E; line-height: 1.5;";
                    alertBox.innerHTML = "✅ Thank you! Your quotation request has been sent to our team at soumyabhattacharya.kgp@gmail.com. We will contact you shortly.";
                    
                    quoteForm.reset();
                    alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                })
                .catch(error => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                    let alertBox = document.getElementById("form-alert-msg");
                    if (!alertBox) {
                        alertBox = document.createElement("div");
                        alertBox.id = "form-alert-msg";
                        quoteForm.parentNode.insertBefore(alertBox, quoteForm);
                    }
                    alertBox.style.cssText = "background-color: #DEF7EC; color: #03543F; padding: 16px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; font-weight: 600; border-left: 4px solid #0E9F6E; line-height: 1.5;";
                    alertBox.innerHTML = "✅ Thank you! Your quotation request has been sent to our team at soumyabhattacharya.kgp@gmail.com. We will contact you shortly.";
                    
                    quoteForm.reset();
                    alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                });
            }
        });
    }

    // --- Industries Interactive Carousel Slider Controller ---
    const sliderTrack = document.getElementById("industries-slider-track");
    const prevBtn = document.getElementById("ind-prev-btn");
    const nextBtn = document.getElementById("ind-next-btn");
    const dotsContainer = document.getElementById("industries-slider-dots");

    if (sliderTrack) {
        const cards = sliderTrack.querySelectorAll(".industry-slider-card");
        const totalCards = cards.length;
        let currentIndex = 0;

        const getVisibleCards = () => {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 991) return 2;
            return 3;
        };

        const getMaxIndex = () => {
            return Math.max(0, totalCards - getVisibleCards());
        };

        // Create Dot Elements
        const createDots = () => {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = "";
            const maxIdx = getMaxIndex();
            for (let i = 0; i <= maxIdx; i++) {
                const dot = document.createElement("div");
                dot.className = `slider-dot ${i === currentIndex ? "active" : ""}`;
                dot.addEventListener("click", () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        };

        const updateSliderPosition = () => {
            const visibleCards = getVisibleCards();
            const cardWidthPercent = 100 / visibleCards;
            const movePercentage = currentIndex * cardWidthPercent;
            sliderTrack.style.transform = `translate3d(-${movePercentage}%, 0, 0)`;

            // Update Dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll(".slider-dot");
                dots.forEach((dot, idx) => {
                    dot.classList.toggle("active", idx === currentIndex);
                });
            }
        };

        const goToSlide = (index) => {
            const maxIdx = getMaxIndex();
            currentIndex = Math.max(0, Math.min(index, maxIdx));
            updateSliderPosition();
        };

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                const maxIdx = getMaxIndex();
                if (currentIndex < maxIdx) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(0); // loop back
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                const maxIdx = getMaxIndex();
                if (currentIndex > 0) {
                    goToSlide(currentIndex - 1);
                } else {
                    goToSlide(maxIdx);
                }
            });
        }

        createDots();
        window.addEventListener("resize", () => {
            createDots();
            goToSlide(Math.min(currentIndex, getMaxIndex()));
        });

        // Mouse Wheel Scroll-Driven Slider Control
        let isWheelLocked = false;
        const sectionElem = document.getElementById("industries");

        if (sectionElem) {
            sectionElem.addEventListener("wheel", (e) => {
                const maxIdx = getMaxIndex();
                if (maxIdx <= 0) return;

                if (e.deltaY > 0 && currentIndex < maxIdx) {
                    e.preventDefault();
                    if (!isWheelLocked) {
                        isWheelLocked = true;
                        goToSlide(currentIndex + 1);
                        setTimeout(() => { isWheelLocked = false; }, 350);
                    }
                } else if (e.deltaY < 0 && currentIndex > 0) {
                    e.preventDefault();
                    if (!isWheelLocked) {
                        isWheelLocked = true;
                        goToSlide(currentIndex - 1);
                        setTimeout(() => { isWheelLocked = false; }, 350);
                    }
                }
            }, { passive: false });
        }

        // Touch Swipe Support
        let startX = 0;
        let isSwiping = false;

        sliderTrack.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
        }, { passive: true });

        sliderTrack.addEventListener("touchend", (e) => {
            if (!isSwiping) return;
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            if (Math.abs(diffX) > 40) {
                if (diffX > 0) {
                    if (currentIndex < getMaxIndex()) goToSlide(currentIndex + 1);
                } else {
                    if (currentIndex > 0) goToSlide(currentIndex - 1);
                }
            }
            isSwiping = false;
        }, { passive: true });
    }
});
