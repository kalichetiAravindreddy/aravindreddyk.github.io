// ==============================
// Enhanced JS for modern portfolio
// ==============================

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeToggle();

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle();
}

function updateThemeToggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const icon = currentTheme === 'dark' ? '🌙' : '☀️';
    if (themeToggle) themeToggle.textContent = icon;
    if (mobileThemeToggle) {
        const themeIcon = mobileThemeToggle.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = icon;
        }
    }
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');

function toggleMobileMenu() {
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    }
}

function closeMobileMenu() {
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Event listeners for mobile menu
if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (mobileMenu && mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(event.target) && 
        !mobileMenuBtn.contains(event.target)) {
        closeMobileMenu();
    }
});

// Close menu when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close menu when clicking on mobile menu links
document.querySelectorAll('.mobile-menu .btn').forEach(element => {
    element.addEventListener('click', closeMobileMenu);
});

// Particle Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particlesContainer.appendChild(particle);
    }
}

// Typewriter effect for the tagline
(function(){
    const el = document.getElementById('typewriter');
    if (!el) return;
    
    const phrases = ["Fresher · Python & Web", "Flask Developer", "Open to Work"];
    let p = 0, i = 0, forward = true;
    
    function tick(){
        const str = phrases[p];
        el.textContent = str.slice(0, i) + (i % 2 ? "" : "");
        if (forward) { 
            i++; 
            if (i > str.length) { 
                forward = false; 
                setTimeout(tick, 900); 
                return; 
            }
        } else { 
            i--; 
            if (i < 0) { 
                forward = true; 
                p = (p + 1) % phrases.length; 
            }
        }
        setTimeout(tick, 80);
    }
    tick();
})();

// Project detail data
const projectDetails = {
    proj1: {
        title: 'Mern image search web app',
        body: 'Built a full-stack image search platform using React.js, Node.js, Express.js, and MongoDB. \n Integrated Unsplash API for fetching real-time images with OAuth 2.0 authentication.Designed a clean, responsive UI with HTML, CSS, and JavaScript for smooth user interaction.Implemented features like multi-select, search history tracking, and real-time results.Followed modular client–server architecture and managed version control using Git & GitHub.'
    },
    proj2: {
        title: 'Portfolio',
        body: 'A basic portfolio website built using HTML, CSS, and JavaScript to display my personal details, skills, and projects.Designed with a clean layout and simple navigation for better presentation and readability.'
    },
    proj3: {
        title: 'Notes API',
        body: 'RESTful API using Flask. JWT-based auth, serializers, and unit tests. Designed for small clients and mobile apps.'
    }
};

function openProject(id){
    const modal = document.getElementById('modal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;
    
    const data = projectDetails[id];
    content.innerHTML = `<h3 style="margin-top:0">${data.title}</h3><p class="muted">${data.body}</p>`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(e){
    const modal = document.getElementById('modal');
    if (!modal) return;
    
    if (e && e.target && e.target.id !== 'modal' && !e.target.classList.contains('modal-close')) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Logo Modal Functionality
function openLogoModal(type) {
    const modal = document.getElementById('logoModal');
    const fullLogo = document.getElementById('fullLogo');
    const logoTitle = document.getElementById('logoTitle');
    
    if (!modal || !fullLogo || !logoTitle) return;
    
    if (type === 'college') {
        fullLogo.src = 'portfolio-images/skacas.logo.png';
        logoTitle.textContent = 'Sri Krishna Adithya College of Arts and Science';
    } else if (type === 'school') {
        fullLogo.src = 'portfolio-images/avb.logo.jpg';
        logoTitle.textContent = 'Avb matriculation Higher Secondary school';
    }
    
    // Fallback if logo doesn't exist
    fullLogo.onerror = function() {
        fullLogo.style.display = 'none';
        logoTitle.textContent += ' (Logo not available)';
    };
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLogoModal(e) {
    const modal = document.getElementById('logoModal');
    if (!modal) return;
    
    if (e && e.target && e.target.id !== 'logoModal' && !e.target.classList.contains('modal-close')) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Back to top functionality
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Initialize animations and effects
document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.fade-up').forEach((el, i) => {
        el.style.animationDelay = (i * 80) + 'ms';
    });
    createParticles();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


