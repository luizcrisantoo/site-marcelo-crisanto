/* ==========================================================================
   script.js — Arquivo principal: inicializa os módulos (namespace SITE)
   Carregar DEPOIS de api.js, menu.js e scroll.js (a ordem é garantida por defer).
   ========================================================================== */
(function (SITE) {
  'use strict';

  function init() {
    SITE.api && SITE.api.aplicarLinksDeContato();   // injeta WhatsApp / telefone / Doctoralia
    SITE.menu && SITE.menu.initMenu();
    SITE.menu && SITE.menu.initHeaderScroll();
    SITE.menu && SITE.menu.initScrollSpy();         // destaca a seção atual no menu
    SITE.scroll && SITE.scroll.initReveal();
    SITE.scroll && SITE.scroll.initFaq();
    SITE.scroll && SITE.scroll.initAno();
    SITE.scroll && SITE.scroll.initToTop();         // botão voltar ao topo
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window.SITE = window.SITE || {});
