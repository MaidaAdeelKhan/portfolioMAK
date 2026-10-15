/* Maida Khan portfolio — accessible, dependency-free interactions. */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  // Respect previously selected theme; default is the art-directed dark theme.
  const themeButton = $('#theme-toggle');
  const storedTheme = (() => { try { return window.localStorage.getItem('maida-theme'); } catch { return null; } })();
  const setTheme = (value) => {
    const theme = value === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    themeButton.innerHTML = theme === 'dark'
      ? '<svg class="icon" width="18" height="18" viewBox="0 0 24 24"><use href="#i-sun"/></svg>'
      : '<svg class="icon" width="18" height="18" viewBox="0 0 24 24"><use href="#i-moon"/></svg>';
    try { window.localStorage.setItem('maida-theme', theme); } catch { /* Storage might be disabled. */ }
  };
  setTheme(storedTheme);
  themeButton.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

  // Accessible mobile navigation: focus-safe close on Escape / link selection.
  const menuButton = $('#menu-toggle');
  const navigation = $('#main-nav');
  const setMenu = (open) => {
    navigation.classList.toggle('nav-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuButton.innerHTML = `<svg class="icon" width="23" height="23" viewBox="0 0 24 24"><use href="#i-${open ? 'x' : 'menu'}"/></svg>`;
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  $$('#main-nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { setMenu(false); menuButton.focus(); } });

  // Filter cards without reloading or altering project links.
  const projectCards = $$('.project-card');
  const projectFilters = $$('.project-filters button');
  projectFilters.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    projectFilters.forEach((b) => { const selected = b === button; b.classList.toggle('filter-active', selected); b.setAttribute('aria-pressed', String(selected)); });
    projectCards.forEach((card) => { card.hidden = filter !== 'All' && card.dataset.category !== filter; });
  }));

  // Show all verified CV experience entries on demand.
  const moreButton = $('#experience-more');
  const extraExperience = $$('[data-extra-experience]');
  moreButton.addEventListener('click', () => {
    const expanded = moreButton.getAttribute('aria-expanded') === 'true';
    extraExperience.forEach((row) => { row.hidden = expanded; });
    moreButton.setAttribute('aria-expanded', String(!expanded));
    moreButton.innerHTML = `${expanded ? 'View all 7 experiences' : 'Show fewer experiences'} <span class="${expanded ? '' : 'rotate-arrow'}"><svg class="icon" width="17" height="17" viewBox="0 0 24 24"><use href="#i-arrow-down"/></svg></span>`;
  });

  // Actual clipboard action (mailto fallback when permissions are unavailable).
  const copyButton = $('#copy-email');
  let copiedReset;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      copyButton.innerHTML = '<svg class="icon" width="16" height="16" viewBox="0 0 24 24"><use href="#i-check"/></svg><span>Copied!</span>';
      clearTimeout(copiedReset);
      copiedReset = window.setTimeout(() => {
        copyButton.innerHTML = '<svg class="icon" width="16" height="16" viewBox="0 0 24 24"><use href="#i-copy"/></svg><span>Copy email</span>';
      }, 2500);
    } catch {
      window.location.href = `mailto:${copyButton.dataset.email}`;
    }
  });

  // Scroll progress + current section indicator.
  const progress = $('#scroll-progress');
  const updateScroll = () => {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${distance > 0 ? Math.min(100, (window.scrollY / distance) * 100) : 0}%`;
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $$('[data-nav]').forEach((a) => a.classList.toggle('nav-active', a.dataset.nav === entry.target.id));
        }
      });
    }, { rootMargin: '-28% 0px -62% 0px', threshold: 0 });
    $$('section[id]').forEach((section) => observer.observe(section));
  }
  $('#footer-year').textContent = String(new Date().getFullYear());
})();
