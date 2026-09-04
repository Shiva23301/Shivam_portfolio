// ===================================
// 1. HERO TYPING & ERASING ANIMATION
// ===================================
const skills = [
    "Java Backend Developer",
    "Spring Boot Developer",
    "REST API Developer",
    "B.Tech CSE Student @ MIET Meerut"
];

let currentSkillIndex = 0;
let charIndex = 0;
let isDeleting = false;
const skillTextElement = document.getElementById("skill-text");

function typeSkill() {
    if (!skillTextElement) return;

    const currentSkill = skills[currentSkillIndex];

    if (isDeleting) {
        // Text character-by-character erase ho raha hai
        skillTextElement.textContent = currentSkill.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Text character-by-character type ho raha hai
        skillTextElement.textContent = currentSkill.substring(0, charIndex + 1);
        charIndex++;
    }

    // Erasing speed fast (50ms) aur Typing speed normal (100ms)
    let typeSpeed = isDeleting ? 50 : 100;

    // Jab poora text likha jaye -> 2 second tak ruko fir mitaana shuru karo
    if (!isDeleting && charIndex === currentSkill.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } 
    // Jab poora text mit jaye -> agla skill pick karo
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentSkillIndex = (currentSkillIndex + 1) % skills.length;
        typeSpeed = 500;
    }

    setTimeout(typeSkill, typeSpeed);
}

// ===================================
// 2. NAVBAR MOBILE TOGGLE & CLOSE
// ===================================
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle && navMenu) {
    // Hamburger icon click event
    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Mobile menu mein link click karne par menu band ho jaye
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // Outside click karne par menu close ho jaye
    document.addEventListener("click", (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });
}

// ===================================
// 3. NAVBAR STICKY SHADOW ON SCROLL
// ===================================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});

// ===================================
// 4. SMOOTH SCROLL FOR NAV LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        if (href === "#") return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
    });
});

// ===================================
// 5. SCROLL FADE-IN & ACTIVE NAV LINK
// ===================================
const fadeElements = document.querySelectorAll(
    ".about-content, .skill-category, .project-card, .timeline-item, .contact-content"
);

fadeElements.forEach(el => {
    el.classList.add("fade-in");
});

function checkFade() {
    const triggerBottom = window.innerHeight * 0.85;
    fadeElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            el.classList.add("visible");
        }
    });
}

const sections = document.querySelectorAll("section[id]");

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = "";
                link.style.fontWeight = "";
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.style.color = "var(--primary-color)";
                    link.style.fontWeight = "600";
                }
            });
        }
    });
}

// Performance-optimized scroll handler (Debounce)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScrollHandler = debounce(() => {
    checkFade();
    highlightNavLink();
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// ===================================
// 6. CONTACT FORM DEMO HANDLER
// ===================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                const name = formData.get("name");

                alert(`Thank you, ${name}! Your message has been sent successfully.`);
                contactForm.reset();
            } else {
                alert("Sorry, your message could not be sent. Please try again.");
            }

        } catch (error) {
            console.error("Formspree Error:", error);
            alert("Something went wrong. Please try again.");
        }
    });
}

// Initial Call on Load
document.addEventListener("DOMContentLoaded", () => {
    typeSkill();
    checkFade();
});

function copyContactText(elementId, btnElement) {
    const textToCopy = document.getElementById(elementId).innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const icon = btnElement.querySelector('i');

        // Change icon to checkmark
        icon.className = 'fas fa-check';
        btnElement.classList.add('copied-btn');

        // Reset after 1.5 seconds
        setTimeout(() => {
            icon.className = 'far fa-copy';
            btnElement.classList.remove('copied-btn');
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}