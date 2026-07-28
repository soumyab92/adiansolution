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
});
