// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved preference
const savedTheme = localStorage.getItem('dj-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('dj-theme', next);
});

// ===== HAMBURGER NAV =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.section, .skill-card, .project-card, .stat, .contact-box');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 60 * (Array.from(revealEls).indexOf(entry.target) % 5));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const w = fill.getAttribute('data-w');
      fill.style.width = w + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(item => {
        item.style.color = item.getAttribute('href') === '#' + id
          ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const toast = document.createElement('div');
toast.className = 'toast';
toast.textContent = '🚀 Message sent! I\'ll get back to you soon.';
document.body.appendChild(toast);

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  toast.classList.add('show');
  contactForm.reset();
  setTimeout(() => toast.classList.remove('show'), 3500);
});

// ===== NAVBAR SHADOW ON SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(0,0,0,0.25)'
    : 'none';
});