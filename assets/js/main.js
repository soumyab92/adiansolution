/**
 * ADIAN Solution & Services - Core JS logic
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- Sticky Header on Scroll ---
    const header = document.querySelector("header.site-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

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
});
