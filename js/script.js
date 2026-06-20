// ============================================================
// SWASTIK POLY PRINTS PVT. LTD. – script.js
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- NAVBAR SCROLL EFFECT ----
  const navbar = document.getElementById('navbar');
  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ---- ACTIVE NAV LINK ON SCROLL ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ---- SMOOTH SCROLL FOR NAV LINKS ----
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 72;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
          // close mobile menu if open
          navLinksEl.classList.remove('open');
        }
      }
    });
  });

  // ---- MOBILE MENU TOGGLE ----
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navLinksEl.classList.toggle('open');
    });
  }

  // ---- ANIMATED COUNTER ----
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800; // ms
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  // Use IntersectionObserver to trigger counters when stats section is visible
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ---- FADE-UP ON SCROLL ----
  const fadeEls = document.querySelectorAll(
    '.service-card, .why-card, .process-step, .contact-card, .stat-item, .about-content, .about-illustration'
  );
  fadeEls.forEach(el => el.classList.add('fade-up'));

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger delay based on index in parent
          const siblings = Array.from(entry.target.parentElement.children);
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = (idx * 80) + 'ms';
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => fadeObserver.observe(el));
  } else {
    // fallback: show all
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ---- BACK TO TOP ----
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
