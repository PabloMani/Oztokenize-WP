import { initParticles } from './particles.js';

/* ============================================================
   SCROLL SPY
   ============================================================ */
function initScrollSpy() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          const id = entry.target.getAttribute('id');
          const active = document.querySelector(`.nav-link[href="#${id}"]`);
          if (active) {
            active.classList.add('active');
            active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
      });
    },
    { rootMargin: '-15% 0px -65% 0px', threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ============================================================
   PROGRESS BAR
   ============================================================ */
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  window.addEventListener(
    'scroll',
    () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? (window.scrollY / h) * 100 + '%' : '0%';
    },
    { passive: true }
  );
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   MOBILE SIDEBAR
   ============================================================ */
function initMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebar-toggle');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar || !toggle || !overlay) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
      }
    });
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.04, rootMargin: '0px 0px -40px 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================================
   COVER CTA
   ============================================================ */
function initCoverCTA() {
  const cta = document.getElementById('cover-cta');
  if (!cta) return;

  cta.addEventListener('click', (e) => {
    e.preventDefault();
    const first = document.getElementById('disclaimer');
    if (first) {
      first.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

/* ============================================================
   MOBILE TOP BAR — hide on cover, show on content
   ============================================================ */
function initMobileTopbar() {
  const topbar = document.getElementById('mobile-topbar');
  const cover = document.querySelector('.cover');
  if (!topbar || !cover) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // When cover is visible, hide topbar; when not, show it
        topbar.classList.toggle('visible', !entry.isIntersecting);
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(cover);
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initParticles('particles-canvas');
  initScrollSpy();
  initProgressBar();
  initBackToTop();
  initMobileSidebar();
  initScrollReveal();
  initSmoothScroll();
  initCoverCTA();
  initMobileTopbar();
});
