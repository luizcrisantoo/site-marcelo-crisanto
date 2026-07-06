/* ==========================================================================
   api.js — Configuração de contato + injeção segura de links
   >>> EDITE AQUI os dados de contato do Dr. Marcelo. É o único lugar. <<<
   Registrado no namespace global SITE para evitar poluir o escopo global.
   ========================================================================== */
(function (SITE) {
  'use strict';

  const CONTATO = {
    // WhatsApp (número da unidade Casa Forte, confirmado no Doctoralia).
    // Se houver um WhatsApp central diferente, troque aqui.
    whatsapp: '5581983084634',
    mensagemWhatsapp: 'Olá! Gostaria de agendar uma consulta com o Dr. Marcelo Crisanto.',

    // Telefone SOS Mão (secretária Marília) — confirmado no Doctoralia
    telefone: '+558130879595',

    // Perfil no Doctoralia (link de agendamento já existente)
    doctoralia: 'https://www.doctoralia.com.br/marcelo-crisanto/cirurgiao-da-mao-ortopedista-traumatologista/recife',
  };

  /* --- Helpers de segurança (GSD PRO) --- */
  function somenteDigitos(valor) {
    return String(valor).replace(/[^\d]/g, '');
  }

  function urlSegura(url) {
    try {
      const u = new URL(url);
      return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : '#';
    } catch (_) {
      return '#';
    }
  }

  function montarLinks() {
    const wa = somenteDigitos(CONTATO.whatsapp);
    const tel = somenteDigitos(CONTATO.telefone);
    return {
      wa: wa ? `https://wa.me/${wa}?text=${encodeURIComponent(CONTATO.mensagemWhatsapp)}` : '#',
      tel: tel ? `tel:+${tel}` : '#',
      doctoralia: urlSegura(CONTATO.doctoralia),
    };
  }

  /*
    Aplica os links aos elementos com data-wa / data-tel / data-doctoralia.
    Usa setAttribute (nunca innerHTML) — seguro contra XSS.
    Links externos recebem rel="noopener noreferrer".
  */
  function aplicarLinksDeContato() {
    const links = montarLinks();
    const mapa = [
      { attr: 'data-wa', href: links.wa, externo: true },
      { attr: 'data-tel', href: links.tel, externo: false },
      { attr: 'data-doctoralia', href: links.doctoralia, externo: true },
    ];

    mapa.forEach(({ attr, href, externo }) => {
      document.querySelectorAll(`[${attr}]`).forEach((el) => {
        el.setAttribute('href', href);
        if (externo && href !== '#') {
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
        }
      });
    });
  }

  SITE.api = { CONTATO, aplicarLinksDeContato };
})(window.SITE = window.SITE || {});
