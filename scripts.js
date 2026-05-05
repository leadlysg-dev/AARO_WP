/*!
 * AARO — minimal frontend behavior
 * Mobile nav + FAQ accordion + nav dropdowns + smooth-scroll fallback
 */
(function () {
  'use strict';

  /* ---------- Mobile nav drawer ---------- */
  const navToggle  = document.querySelector('[data-nav-toggle]');
  const navClose   = document.querySelector('[data-nav-close]');
  const mobileNav  = document.querySelector('[data-mobile-nav]');

  function openNav()  { if (mobileNav) { mobileNav.classList.add('is-open'); document.body.style.overflow = 'hidden'; } }
  function closeNav() { if (mobileNav) { mobileNav.classList.remove('is-open'); document.body.style.overflow = ''; } }

  if (navToggle) navToggle.addEventListener('click', openNav);
  if (navClose)  navClose.addEventListener('click', closeNav);

  // close on link click — but not when clicking the chevron toggle inside an accordion row
  document.querySelectorAll('[data-mobile-nav] a').forEach(a => {
    a.addEventListener('click', () => closeNav());
  });

  // Mobile accordion toggles
  document.querySelectorAll('[data-mobile-dropdown-toggle]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const li = btn.closest('.has-dropdown-mobile');
      if (!li) return;
      const isOpen = li.classList.toggle('is-expanded');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  /* ---------- Desktop nav dropdowns (click-toggle for non-hover devices) ---------- */
  document.querySelectorAll('[data-dropdown-toggle]').forEach(btn => {
    btn.addEventListener('click', e => {
      // Only intercept on touch / non-hover devices.
      // On real hover devices, we let CSS :hover handle it and don't preventDefault here.
      if (window.matchMedia('(hover: hover)').matches) return;
      e.preventDefault();
      e.stopPropagation();
      const li = btn.closest('.has-dropdown');
      if (!li) return;
      // close other open dropdowns first
      document.querySelectorAll('.primary-nav .has-dropdown.is-open').forEach(other => {
        if (other !== li) other.classList.remove('is-open');
      });
      const isOpen = li.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // close any open desktop dropdown on click outside
  document.addEventListener('click', e => {
    if (!e.target.closest('.primary-nav')) {
      document.querySelectorAll('.primary-nav .has-dropdown.is-open').forEach(li => {
        li.classList.remove('is-open');
      });
    }
  });

  /* ---------- Escape closes any open menu/dropdown ---------- */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (mobileNav && mobileNav.classList.contains('is-open')) closeNav();
    document.querySelectorAll('.primary-nav .has-dropdown.is-open').forEach(li => li.classList.remove('is-open'));
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      if (!item) return;
      item.classList.toggle('is-open');
    });
  });

  /* ---------- Highlight current page in nav ---------- */
  const path = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    const target = link.getAttribute('data-nav-link');
    if (target && (path === target || (path === '' && target === 'index.html'))) {
      link.classList.add('is-current');
    }
  });

})();
