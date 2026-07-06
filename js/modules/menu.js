/* ==========================================================================
   menu.js — Navegação: menu hambúrguer (abrir/fechar) e header ao rolar
   ========================================================================== */
(function (SITE) {
  'use strict';

  function initMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const overlay = document.getElementById('navOverlay');
    if (!toggle || !menu) return;

    const abrir = () => {
      menu.classList.add('open');
      toggle.classList.add('open');
      if (overlay) overlay.classList.add('show');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
    };

    const fechar = () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    };

    const alternar = () => (menu.classList.contains('open') ? fechar() : abrir());

    toggle.addEventListener('click', alternar);
    if (overlay) overlay.addEventListener('click', fechar);
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', fechar));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') fechar();
    });
  }

  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    const atualizar = () => header.classList.toggle('scrolled', window.scrollY > 10);
    atualizar();
    window.addEventListener('scroll', atualizar, { passive: true });
  }

  /*
    Scrollspy — destaca no menu a seção que está sendo vista (Nielsen #1:
    visibilidade do status do sistema). Marca com a classe .active e aria-current.
  */
  function initScrollSpy() {
    const links = Array.from(document.querySelectorAll('.nav__menu a[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    const secoes = links
      .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
      .filter(Boolean);

    const marcar = (id) => {
      links.forEach((link) => {
        const ativo = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', ativo);
        if (ativo) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) marcar(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    secoes.forEach((sec) => observer.observe(sec));
  }

  SITE.menu = { initMenu, initHeaderScroll, initScrollSpy };
})(window.SITE = window.SITE || {});
