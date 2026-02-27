// =========================================
// 1. Typing Effect for Hero Section
// =========================================
const typingText = [
    "Java Backend Developer",
    "Spring Boot Developer",
    "Building Scalable Systems",
    "Problem Solver"
];

let i = 0;
let j = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
    const typingElement = document.querySelector(".typing");
    if (!typingElement) return;

    typingElement.textContent = currentText;

    if (!isDeleting && j < typingText[i].length) {
        currentText += typingText[i][j];
        j++;
    } else if (isDeleting && j > 0) {
        currentText = currentText.slice(0, -1);
        j--;
    }

    if (j === typingText[i].length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
        return;
    }

    if (j === 0 && isDeleting) {
        isDeleting = false;
        i = (i + 1) % typingText.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// =========================================
// 2. Project Tab Switcher with Active State
// =========================================
function showProject(projectId, btnElement) {
    const projects = document.querySelectorAll(".project-item");
    projects.forEach(project => {
        project.style.display = "none";
    });

    document.getElementById(projectId).style.display = "block";

    const buttons = document.querySelectorAll(".project-menu button");
    buttons.forEach(btn => {
        btn.classList.remove("active-tab");
    });

    if (btnElement) {
        btnElement.classList.add("active-tab");
    }
}

// =========================================
// 3. Mobile Menu Toggle
// =========================================
function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
}

// =========================================
// 4. Scroll Reveal Animations
// =========================================
const sr = ScrollReveal({
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: false
});

// Apply animations to elements
sr.reveal('.hero .profile', { origin: 'top' });
sr.reveal('.hero h1, .hero .typing, .hero .hero-subtitle, .status-badge', { origin: 'bottom', interval: 200 });
sr.reveal('.section-title', { origin: 'top' });
sr.reveal('.ide-window', { origin: 'left' });
sr.reveal('.stat-badge', { origin: 'right', interval: 150 });
sr.reveal('.skill-grid .card', { origin: 'bottom', interval: 100 });
sr.reveal('.life-card', { origin: 'bottom', interval: 200 });
sr.reveal('.education-card', { origin: 'left', interval: 200 });
sr.reveal('.contact-left', { origin: 'left' });
sr.reveal('.contact-card', { origin: 'right' });

// =========================================
// 5. Seamless Contact Form Submission
// =========================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop the page from redirecting

        // Change button text to show it's working
        const submitBtn = contactForm.querySelector('.send-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... ⏳';

        // Gather the form data
        const formData = new FormData(contactForm);

        // Send the data invisibly
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Success!
                formStatus.textContent = "✅ Message sent successfully!";
                formStatus.className = "form-status success";
                contactForm.reset(); // Clear the typed text
            } else {
                // Web3Forms returned an error
                console.log(response);
                formStatus.textContent = "❌ " + json.message;
                formStatus.className = "form-status error";
            }
        })
        .catch(error => {
            // Network error
            console.log(error);
            formStatus.textContent = "❌ Something went wrong. Please try again.";
            formStatus.className = "form-status error";
        })
        .then(function() {
            // Put the button text back to normal
            submitBtn.innerHTML = originalBtnText;

            // Hide the success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.className = 'form-status'; // Reset classes
            }, 5000);
        });
    });
}