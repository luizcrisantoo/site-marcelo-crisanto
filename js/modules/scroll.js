/* ==========================================================================
   scroll.js — Animações on-scroll (reveal), acordeão do FAQ e ano do rodapé
   ========================================================================== */
(function (SITE) {
  'use strict';

  function initReveal() {
    const alvos = document.querySelectorAll('.reveal');
    if (!alvos.length) return;

    if (!('IntersectionObserver' in window)) {
      alvos.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    alvos.forEach((el) => observer.observe(el));
  }

  function initFaq() {
    const itens = document.querySelectorAll('.faq__item');
    if (!itens.length) return;

    itens.forEach((item) => {
      const botao = item.querySelector('.faq__q');
      const resposta = item.querySelector('.faq__a');
      if (!botao || !resposta) return;

      botao.addEventListener('click', () => {
        const aberto = item.classList.toggle('open');
        botao.setAttribute('aria-expanded', String(aberto));
        resposta.style.maxHeight = aberto ? `${resposta.scrollHeight}px` : '0';
      });
    });
  }

  function initAno() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /*
    Voltar ao topo — controle do usuário (Nielsen #3 / ISO 9241-110 controlabilidade).
    Só aparece após rolar; respeita prefers-reduced-motion.
  */
  function initToTop() {
    const btn = document.getElementById('toTop');
    if (!btn) return;

    const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const atualizar = () => {
      const mostrar = window.scrollY > 600;
      btn.hidden = !mostrar;
    };

    atualizar();
    window.addEventListener('scroll', atualizar, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: semAnimacao ? 'auto' : 'smooth' });
    });
  }

  SITE.scroll = { initReveal, initFaq, initAno, initToTop };
})(window.SITE = window.SITE || {});
