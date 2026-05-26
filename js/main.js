/* =========================================================
   ORBIS MÜLLERHOF — Main JS
   ========================================================= */
(function() {
  'use strict';

  const STORAGE_KEY = 'orbis_lang';
  const DEFAULT_LANG = 'de';

  // ---------- I18N ----------
  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }
  function setLang(lang) {
    if (!window.TRANSLATIONS || !TRANSLATIONS[lang]) return;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const t = TRANSLATIONS[lang][el.getAttribute('data-i18n')];
      if (t) el.textContent = t;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const t = TRANSLATIONS[lang][el.getAttribute('data-i18n-placeholder')];
      if (t) el.setAttribute('placeholder', t);
    });
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // ---------- Scroll-Effekt Header ----------
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    function update() {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ---------- Mobile Menu ----------
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.remove('open'));
    });
  }

  // ---------- Aktive Navigation ----------
  function highlightActive() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a[href]').forEach(a => {
      if (a.getAttribute('href') === page) a.classList.add('active');
    });
  }

  // ---------- Lightbox für Galerie ----------
  function initLightbox() {
    const imgs = document.querySelectorAll('.gallery img');
    if (!imgs.length) return;
    let box = document.querySelector('.lightbox');
    if (!box) {
      box = document.createElement('div');
      box.className = 'lightbox';
      box.innerHTML = '<button class="lightbox-close" aria-label="Schliessen">&times;</button><img src="" alt="">';
      document.body.appendChild(box);
    }
    const img = box.querySelector('img');
    const close = box.querySelector('.lightbox-close');
    imgs.forEach(i => {
      i.addEventListener('click', () => {
        img.src = i.src; img.alt = i.alt;
        box.classList.add('active');
      });
    });
    const hide = () => box.classList.remove('active');
    close.addEventListener('click', hide);
    box.addEventListener('click', e => { if (e.target === box) hide(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
  }

  // ---------- Formulare (Demo) ----------
  function initForms() {
    document.querySelectorAll('form[data-form]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const lang = getLang();
        const msg = lang === 'de'
          ? 'Vielen Dank! Wir melden uns in Kürze.'
          : 'Thank you! We will get back to you shortly.';
        alert(msg);
        form.reset();
      });
    });
  }

  // ---------- Hero Parallax ----------
  function initParallax() {
    const heroImg = document.querySelector('.hero-bg img');
    if (!heroImg) return;

    let ticking = false;
    function update() {
      const scrolled = window.scrollY;
      // Image moves 0.4× slower than scroll - creates parallax depth
      heroImg.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    setLang(getLang());
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
    initHeaderScroll();
    initMobileMenu();
    highlightActive();
    initLightbox();
    initForms();
    initParallax();
  });
})();
