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

  // ---------- Cookie Banner ----------
  function initCookieBanner() {
    const KEY = 'orbis_cookies_v1';
    if (localStorage.getItem(KEY)) return;

    const lang = getLang();
    const texts = {
      de: {
        title: 'Cookies & Datenschutz',
        body: 'Wir verwenden nur technisch notwendige Cookies (z.B. Sprachauswahl). Keine Tracker, keine Werbung. ',
        link: 'Mehr in der Datenschutzerklärung',
        accept: 'Einverstanden',
        decline: 'Nur notwendige'
      },
      en: {
        title: 'Cookies & Privacy',
        body: 'We only use technically necessary cookies (e.g. language selection). No tracking, no ads. ',
        link: 'More in our privacy policy',
        accept: 'Got it',
        decline: 'Necessary only'
      }
    };
    const t = texts[lang] || texts.de;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-inner">
        <div class="cookie-text">
          <strong>${t.title}</strong>
          <p>${t.body}<a href="datenschutz.html">${t.link}</a>.</p>
        </div>
        <div class="cookie-actions">
          <button class="cookie-btn cookie-btn-secondary" data-action="decline">${t.decline}</button>
          <button class="cookie-btn cookie-btn-primary" data-action="accept">${t.accept}</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    setTimeout(() => banner.classList.add('visible'), 100);

    banner.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      localStorage.setItem(KEY, btn.dataset.action);
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 400);
    });
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
    initCookieBanner();
  });
})();
