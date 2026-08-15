// Dynamic year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Theme & Hue Persistence
const savedTheme = localStorage.getItem('portfolioTheme');
const savedHue = localStorage.getItem('portfolioHue');

if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.querySelector('#themeToggle i').className = 'fa-solid fa-sun';
}
if (savedHue) {
    document.documentElement.style.setProperty('--hue', savedHue);
}

// Toggle Theme
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        themeToggleBtn.querySelector('i').className = 'fa-solid fa-moon';
        localStorage.setItem('portfolioTheme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.querySelector('i').className = 'fa-solid fa-sun';
        localStorage.setItem('portfolioTheme', 'dark');
    }
});

// Random Color Theme Switcher
const colorPickerBtn = document.getElementById('colorPickerBtn');
colorPickerBtn.addEventListener('click', () => {
    const randomHue = Math.floor(Math.random() * 360);
    document.documentElement.style.setProperty('--hue', randomHue);
    localStorage.setItem('portfolioHue', randomHue);
});

// Dropdown Menu Toggle
const dotsBtn = document.getElementById('dotsBtn');
const navLinks = document.getElementById('navLinks');

dotsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('show');
});

document.addEventListener('click', () => {
    navLinks.classList.remove('show');
});

// Typewriter Effect
const roles = [
    "Computer Science Graduate", 
    "Construction Management Specialist", 
    "Frontend Web Developer",
    "MS Office Suite Specialist"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById("typewriterText");

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 1800; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
    }
    setTimeout(typeEffect, typeSpeed);
}
document.addEventListener("DOMContentLoaded", typeEffect);

// Scroll Progress & Back to Top
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress.style.width = `${(scrollTop / scrollHeight) * 100}%`;

    if (scrollTop > 300) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Section Scroll Animations & Progress Fill
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.progress-fill').forEach(fill => {
                fill.style.width = fill.getAttribute('data-progress');
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => observer.observe(section));

// Contact Modal Toggle
const contactModal = document.getElementById('contactModal');
document.getElementById('openContact').addEventListener('click', () => contactModal.classList.add('active'));
document.getElementById('closeContact').addEventListener('click', () => contactModal.classList.remove('active'));
window.addEventListener('click', (e) => { if (e.target === contactModal) contactModal.classList.remove('active'); });
