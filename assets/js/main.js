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
            if (window.innerWidth <= 768) {
                sliderTrack.style.transform = "none";
                return;
            }
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
            if (window.innerWidth <= 768) return;
            const maxIdx = getMaxIndex();
            currentIndex = Math.max(0, Math.min(index, maxIdx));
            updateSliderPosition();
        };

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                if (window.innerWidth <= 768) return;
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
                if (window.innerWidth <= 768) return;
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
            if (window.innerWidth <= 768) {
                sliderTrack.style.transform = "none";
                return;
            }
            createDots();
            goToSlide(Math.min(currentIndex, getMaxIndex()));
        });

        // Mouse Wheel Scroll-Driven Slider Control
        let isWheelLocked = false;
        const sectionElem = document.getElementById("industries");

        if (sectionElem) {
            sectionElem.addEventListener("wheel", (e) => {
                if (window.innerWidth <= 768) return;
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

    // --- Testimonials Section Carousel Slider (Desktop Mouse Wheel Controlled) ---
    const testimonialTrack = document.querySelector(".testimonials-slider-track");
    const testimonialCards = document.querySelectorAll(".testimonial-slider-card");
    const prevTestimonialBtn = document.getElementById("prevTestimonial");
    const nextTestimonialBtn = document.getElementById("nextTestimonial");
    const testimonialDotsContainer = document.getElementById("testimonialDots");

    if (testimonialTrack && testimonialCards.length > 0) {
        let currentTestimonialIndex = 0;

        const getTestimonialCardsPerView = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 991) return 2;
            return 3;
        };

        const getMaxTestimonialIndex = () => {
            return Math.max(0, testimonialCards.length - getTestimonialCardsPerView());
        };

        const buildTestimonialDots = () => {
            if (!testimonialDotsContainer) return;
            testimonialDotsContainer.innerHTML = "";
            const maxIdx = getMaxTestimonialIndex();
            for (let i = 0; i <= maxIdx; i++) {
                const dot = document.createElement("button");
                dot.classList.add("slider-dot");
                dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
                if (i === currentTestimonialIndex) dot.classList.add("active");
                dot.addEventListener("click", () => goToTestimonialSlide(i));
                testimonialDotsContainer.appendChild(dot);
            }
        };

        const updateTestimonialDots = () => {
            if (!testimonialDotsContainer) return;
            const dots = testimonialDotsContainer.querySelectorAll(".slider-dot");
            dots.forEach((dot, index) => {
                if (index === currentTestimonialIndex) {
                    dot.classList.add("active");
                } else {
                    dot.classList.remove("active");
                }
            });
        };

        const goToTestimonialSlide = (index) => {
            if (window.innerWidth <= 768) return; // Disable slider transform on mobile
            const maxIdx = getMaxTestimonialIndex();
            currentTestimonialIndex = Math.max(0, Math.min(index, maxIdx));

            const cardsPerView = getTestimonialCardsPerView();
            const stepPercent = 100 / cardsPerView;
            testimonialTrack.style.transform = `translate3d(-${currentTestimonialIndex * stepPercent}%, 0, 0)`;

            if (prevTestimonialBtn) prevTestimonialBtn.disabled = (currentTestimonialIndex === 0);
            if (nextTestimonialBtn) nextTestimonialBtn.disabled = (currentTestimonialIndex >= maxIdx);
            updateTestimonialDots();
        };

        if (prevTestimonialBtn) {
            prevTestimonialBtn.addEventListener("click", () => {
                goToTestimonialSlide(currentTestimonialIndex - 1);
            });
        }

        if (nextTestimonialBtn) {
            nextTestimonialBtn.addEventListener("click", () => {
                goToTestimonialSlide(currentTestimonialIndex + 1);
            });
        }

        // Desktop Mouse Wheel Hijacking for Testimonials Section
        const testimonialsSection = document.getElementById("testimonials");
        if (testimonialsSection) {
            let isTestimonialWheelLocked = false;

            testimonialsSection.addEventListener("wheel", (e) => {
                if (window.innerWidth <= 768) return; // Allow natural vertical scroll on mobile

                const maxIdx = getMaxTestimonialIndex();
                const atStart = (currentTestimonialIndex === 0 && e.deltaY < 0);
                const atEnd = (currentTestimonialIndex >= maxIdx && e.deltaY > 0);

                if (!atStart && !atEnd) {
                    e.preventDefault();
                    if (!isTestimonialWheelLocked) {
                        isTestimonialWheelLocked = true;
                        if (e.deltaY > 0) {
                            goToTestimonialSlide(currentTestimonialIndex + 1);
                        } else {
                            goToTestimonialSlide(currentTestimonialIndex - 1);
                        }
                        setTimeout(() => { isTestimonialWheelLocked = false; }, 350);
                    }
                }
            }, { passive: false });
        }

        buildTestimonialDots();
        goToTestimonialSlide(0);

        window.addEventListener("resize", () => {
            buildTestimonialDots();
            if (window.innerWidth <= 768) {
                testimonialTrack.style.transform = "none";
            } else {
                goToTestimonialSlide(currentTestimonialIndex);
            }
        });
    }

    // --- Ensure Video Autoplay in Inner Page Hero Sections ---
    document.querySelectorAll(".inner-hero-video").forEach(video => {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                video.muted = true;
                video.play();
            });
        }
    });

    // --- SCHEDULE PLANT AUDIT POPUP MODAL CONTROLLER ---
    const initAuditModal = () => {
        // Inject Modal HTML into body if not already present
        if (!document.getElementById("auditModal")) {
            const modalHTML = `
            <div class="audit-modal-overlay" id="auditModal" aria-hidden="true">
                <div class="audit-modal-container" role="dialog" aria-modal="true" aria-labelledby="auditModalTitle">
                    <button class="audit-modal-close" id="closeAuditModal" aria-label="Close modal">&times;</button>
                    <div class="audit-modal-header">
                        <div class="audit-modal-badge"><i class="fas fa-calendar-check"></i> Book Plant Audit</div>
                        <h3 id="auditModalTitle">Schedule a Plant Audit Call</h3>
                        <p>Select your preferred date, time slot, and audit requirement to speak directly with our senior automation engineers.</p>
                    </div>
                    <form id="audit-booking-form" class="audit-modal-form" action="https://formsubmit.co/ajax/soumyabhattacharya.kgp@gmail.com" method="POST">
                        <input type="hidden" name="_subject" value="📅 New Plant Audit Call Scheduled - ADIAN Solution">
                        <input type="hidden" name="_captcha" value="false">
                        <input type="hidden" name="_template" value="table">
                        <div class="audit-form-grid">
                            <div class="form-group">
                                <label class="form-label">Full Name *</label>
                                <input type="text" name="name" required placeholder="e.g. Rajesh Kumar" class="form-control" minlength="2" maxlength="100">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Phone / Mobile Number *</label>
                                <input type="tel" name="phone" id="auditPhone" required placeholder="e.g. 9876543210" class="form-control" maxlength="10">
                            </div>
                        </div>
                        <div class="audit-form-grid">
                            <div class="form-group">
                                <label class="form-label">Preferred Date *</label>
                                <input type="date" name="audit_date" id="auditDateInput" required class="form-control">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Preferred Time Slot *</label>
                                <select name="audit_time" required class="form-control">
                                    <option value="" disabled selected>Select time slot</option>
                                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                                    <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                                    <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Primary Purpose of Audit *</label>
                            <select name="audit_purpose" required class="form-control" style="margin-bottom: 10px;">
                                <option value="" disabled selected>Select Audit Focus</option>
                                <option value="PLC & SCADA Control System Audit">PLC & SCADA Control System Audit</option>
                                <option value="Liquid Dosing Machine Installation & Calibration">Liquid Dosing Machine Installation & Calibration</option>
                                <option value="PCC / MCC / APFC Power Panel Inspection">PCC / MCC / APFC Power Panel Inspection</option>
                                <option value="General Plant Efficiency & Downtime Audit">General Plant Efficiency & Downtime Audit</option>
                                <option value="Other Customized Automation Solution">Other Customized Automation Solution</option>
                            </select>
                            <label class="form-label">Additional Purpose / Location Notes</label>
                            <textarea name="audit_notes" rows="3" placeholder="Briefly describe your plant location, machinery details, or specific concerns..." class="form-control"></textarea>
                        </div>
                        <button type="submit" id="submitAuditBtn" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: 10px; font-weight: 700; padding: 12px 20px;">
                            <i class="fas fa-calendar-plus"></i> Confirm & Schedule Call
                        </button>
                    </form>
                    <div id="audit-success-msg" style="display: none; background: #DEF7EC; color: #03543F; padding: 20px; border-radius: 12px; margin-top: 15px; border-left: 4px solid #0E9F6E; line-height: 1.6;">
                        <div style="font-weight: 700; font-size: 16px; margin-bottom: 4px;"><i class="fas fa-check-circle"></i> Audit Call Scheduled Successfully!</div>
                        <p style="margin: 0; font-size: 14px;">Thank you! Our senior automation engineers have received your request and will call you on your requested date & time slot to confirm your plant audit.</p>
                        <button id="resetAuditFormBtn" class="btn btn-outline-blue btn-sm" style="margin-top: 14px;">Book Another Call</button>
                    </div>
                </div>
            </div>
            `;
            document.body.insertAdjacentHTML("beforeend", modalHTML);
        }

        const modalOverlay = document.getElementById("auditModal");
        const closeBtn = document.getElementById("closeAuditModal");
        const auditForm = document.getElementById("audit-booking-form");
        const dateInput = document.getElementById("auditDateInput");
        const phoneInput = document.getElementById("auditPhone");
        const successMsg = document.getElementById("audit-success-msg");
        const resetBtn = document.getElementById("resetAuditFormBtn");

        // Set minimum date to today
        if (dateInput) {
            const today = new Date().toISOString().split("T")[0];
            dateInput.min = today;
        }

        // Restrict phone input to 10 digits
        if (phoneInput) {
            phoneInput.addEventListener("input", (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
            });
        }

        const openModal = (e) => {
            if (e) e.preventDefault();
            if (modalOverlay) {
                modalOverlay.classList.add("active");
                modalOverlay.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
            }
        };

        const closeModal = () => {
            if (modalOverlay) {
                modalOverlay.classList.remove("active");
                modalOverlay.setAttribute("aria-hidden", "true");
                document.body.style.overflow = "";
            }
        };

        // Attach open listener to all Schedule Plant Audit buttons across document
        document.querySelectorAll("a, button").forEach(el => {
            const text = el.textContent.trim().toLowerCase();
            const href = el.getAttribute("href");
            if (text.includes("schedule plant audit") || text.includes("schedule audit") || href === "#schedule-audit" || el.classList.contains("open-audit-modal")) {
                el.addEventListener("click", openModal);
            }
        });

        if (closeBtn) closeBtn.addEventListener("click", closeModal);

        if (modalOverlay) {
            modalOverlay.addEventListener("click", (e) => {
                if (e.target === modalOverlay) closeModal();
            });
        }

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("active")) {
                closeModal();
            }
        });

        if (resetBtn && auditForm && successMsg) {
            resetBtn.addEventListener("click", () => {
                auditForm.reset();
                auditForm.style.display = "block";
                successMsg.style.display = "none";
            });
        }

        // Handle AJAX submission
        if (auditForm) {
            auditForm.addEventListener("submit", (e) => {
                e.preventDefault();

                if (phoneInput && phoneInput.value.length !== 10) {
                    alert("Please enter a valid 10-digit mobile number.");
                    phoneInput.focus();
                    return;
                }

                const submitBtn = document.getElementById("submitAuditBtn");
                const originalBtnHTML = submitBtn ? submitBtn.innerHTML : "Confirm & Schedule Call";

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling Call...';
                }

                const formData = new FormData(auditForm);

                fetch("https://formsubmit.co/ajax/soumyabhattacharya.kgp@gmail.com", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnHTML;
                    }
                    auditForm.style.display = "none";
                    if (successMsg) successMsg.style.display = "block";
                })
                .catch(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnHTML;
                    }
                    auditForm.style.display = "none";
                    if (successMsg) successMsg.style.display = "block";
                });
            });
        }
    };

    initAuditModal();
});
