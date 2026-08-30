// ===== AOS INIT =====
AOS.init({
  duration: 800,
  once: true,
  offset: 80,
});

// ===== SPA NAVIGATION =====
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a, .logo a, .hero-actions a');
  const pages = {
    home: document.getElementById('page-home'),
    about: document.getElementById('page-about'),
    collection: document.getElementById('page-collection'),
    contact: document.getElementById('page-contact'),
  };
  const navLinkElements = document.querySelectorAll('.nav-links a');

  function navigateTo(pageId) {
    // Hide all pages
    Object.values(pages).forEach(page => page.classList.remove('active-page'));
    
    // Show target page
    const targetPage = pages[pageId];
    if (targetPage) {
      targetPage.classList.add('active-page');
    }

    // Update active nav link
    navLinkElements.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === pageId) {
        link.classList.add('active');
      }
    });

    // Close mobile menu
    document.getElementById('navLinks').classList.remove('show');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle all navigation clicks
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page) navigateTo(page);
    });
  });

  // Handle logo click (goes to home)
  document.querySelector('.logo a').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('home');
  });

  // ===== MOBILE HAMBURGER =====
  const hamburger = document.getElementById('hamburger');
  const navLinksMobile = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinksMobile.classList.toggle('show');
  });

  // ===== COUNTER ANIMATION (for stats) =====
  const statNumbers = document.querySelectorAll('.stat-item .number');
  
  function animateCounters() {
    statNumbers.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      if (isNaN(target)) return;
      
      let current = 0;
      const increment = target / 60; // 60 steps over 1.5s
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + (target === 63 ? '★' : '+');
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 20);
    });
  }

  // ===== TRIGGER COUNTERS WHEN HOME PAGE IS VISIBLE =====
  const homePage = document.getElementById('page-home');
  let countersTriggered = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersTriggered) {
        animateCounters();
        countersTriggered = true;
      }
    });
  }, { threshold: 0.5 });

  if (homePage) observer.observe(homePage);

  // ===== SMOOTH SCROLL FOR INTERNAL LINKS (fallback) =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== ACTIVE NAV ON SCROLL (optional enhancement) =====
  // This is a simple SPA, so we keep it clean with click navigation
});