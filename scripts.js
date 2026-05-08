/*!
 * AARO — site behavior
 *  - mobile nav drawer
 *  - desktop dropdown nav
 *  - mobile dropdown accordion
 *  - FAQ / accordion rows
 *  - scroll-triggered reveals
 *  - animated counters on viewport entry
 *  - current-page highlight in nav
 */
(function () {
  'use strict';

  /* ---------- Mobile nav drawer ---------- */
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navClose  = document.querySelector('[data-nav-close]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  function openNav()  { if (mobileNav) { mobileNav.classList.add('is-open'); document.body.style.overflow = 'hidden'; } }
  function closeNav() { if (mobileNav) { mobileNav.classList.remove('is-open'); document.body.style.overflow = ''; } }

  if (navToggle) navToggle.addEventListener('click', openNav);
  if (navClose)  navClose.addEventListener('click', closeNav);

  document.querySelectorAll('[data-mobile-nav] a').forEach(a => {
    a.addEventListener('click', () => closeNav());
  });

  /* ---------- Mobile dropdown accordion ---------- */
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

  /* ---------- Desktop dropdown — touch fallback ---------- */
  document.querySelectorAll('[data-dropdown-toggle]').forEach(btn => {
    btn.addEventListener('click', e => {
      if (window.matchMedia('(hover: hover)').matches) return;
      e.preventDefault();
      e.stopPropagation();
      const li = btn.closest('.has-dropdown');
      if (!li) return;
      document.querySelectorAll('.primary-nav .has-dropdown.is-open').forEach(other => {
        if (other !== li) other.classList.remove('is-open');
      });
      const isOpen = li.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.primary-nav')) {
      document.querySelectorAll('.primary-nav .has-dropdown.is-open').forEach(li => li.classList.remove('is-open'));
    }
  });

  /* ---------- Escape closes all menus ---------- */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (mobileNav && mobileNav.classList.contains('is-open')) closeNav();
    document.querySelectorAll('.primary-nav .has-dropdown.is-open').forEach(li => li.classList.remove('is-open'));
  });

  /* ---------- FAQ + Accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      if (item) item.classList.toggle('is-open');
    });
  });
  document.querySelectorAll('.accordion-row').forEach(row => {
    row.addEventListener('click', () => row.classList.toggle('is-open'));
  });

  /* ---------- Toggle ---------- */
  document.querySelectorAll('.toggle').forEach(t => {
    t.addEventListener('click', e => e.currentTarget.classList.toggle('is-on'));
  });

  /* ---------- Current-page highlight in nav ---------- */
  const path = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    const target = link.getAttribute('data-nav-link');
    if (target && (path === target || (path === '' && target === 'index.html'))) {
      link.classList.add('is-current');
    }
  });

  /* ---------- Respect reduced motion ---------- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll-triggered reveals ---------- */
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
  } else {
    // No observer / reduced motion — show everything immediately
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
  }

  /* ---------- Animated counters ---------- */
  function animateCounters(container) {
    container.querySelectorAll('[data-target]').forEach((el, i) => {
      const target = parseInt(el.dataset.target, 10);
      if (isNaN(target)) return;
      const suffix = el.dataset.suffix || '';
      const duration = 1300;
      const startDelay = i * 90;
      el.textContent = '0' + suffix;
      setTimeout(() => {
        const start = performance.now();
        function tick(now) {
          const t = Math.min(1, (now - start) / duration);
          const ease = 1 - Math.pow(1 - t, 3);
          const val = Math.floor(target * ease);
          el.textContent = (val >= 1000 ? val.toLocaleString() : val) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }, startDelay);
    });
  }

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const counterFlags = new WeakSet();
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterFlags.has(entry.target)) {
          counterFlags.add(entry.target);
          animateCounters(entry.target);
        }
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('.trust-bar, .counter-bar, [data-counter-group]').forEach(el =>
      counterObserver.observe(el)
    );
  }

  /* ---------- Footer year ---------- */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

})();

// ============================================================
// VIDEO POSTER LAZY-LOAD — click poster → swap in real iframe
// ============================================================
(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.video-poster');
    if (!btn) return;
    e.preventDefault();
    var vid = btn.getAttribute('data-video-id');
    if (!vid) return;
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + vid + '?autoplay=1&rel=0&modestbranding=1';
    iframe.title = btn.getAttribute('aria-label') || 'Patient story video';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.position = 'absolute';
    iframe.style.inset = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    btn.parentNode.replaceChild(iframe, btn);
  });
})();

