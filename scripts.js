/*!
 * AARO — minimal frontend behavior
 * Mobile nav toggle + FAQ accordion + smooth-scroll fallback
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

  // close on link click
  document.querySelectorAll('[data-mobile-nav] a').forEach(a => a.addEventListener('click', closeNav));

  // close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('is-open')) closeNav();
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
