/* ==========================================================================
   api.js — Configuração de contato + injeção segura de links
   >>> EDITE AQUI os dados de contato. É o único lugar. <<<
   Registrado no namespace global SITE para evitar poluir o escopo global.

   Atributos usados no HTML:
     data-call-sos   → Ligar pro SOS Mão (telefone)
     data-wa-sos     → WhatsApp do SOS Mão (some enquanto o número não for informado)
     data-wa-sec     → WhatsApp da secretária
     data-doctoralia → Perfil no Doctoralia
     data-tel        → (legado) telefone do SOS Mão
     data-wa         → (legado) WhatsApp genérico → secretária
   ========================================================================== */
(function (SITE) {
  'use strict';

  const CONTATO = {
    // Telefone do SOS Mão (também usado no "Ligar pro SOS Mão")
    telefoneSos: '+558130879595',

    // WhatsApp do SOS Mão — TODO: preencher quando o número chegar (ex.: '5581999998888').
    // Enquanto estiver vazio, os botões "WhatsApp do SOS Mão" ficam ocultos automaticamente.
    whatsappSos: '',

    // WhatsApp da secretária (confirmado no Doctoralia)
    whatsappSecretaria: '5581983084634',

    // Mensagem pré-preenchida do WhatsApp
    mensagem: 'Olá! Gostaria de agendar uma consulta com o Dr. Marcelo Crisanto.',

    // Perfil no Doctoralia
    doctoralia: 'https://www.doctoralia.com.br/marcelo-crisanto/cirurgiao-da-mao-ortopedista-traumatologista/recife',
  };

  /* --- Helpers de segurança (GSD PRO) --- */
  function somenteDigitos(v) { return String(v).replace(/[^\d]/g, ''); }

  function urlSegura(url) {
    try {
      const u = new URL(url);
      return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : '#';
    } catch (_) { return '#'; }
  }

  function waLink(num) {
    const n = somenteDigitos(num);
    return n ? `https://wa.me/${n}?text=${encodeURIComponent(CONTATO.mensagem)}` : '';
  }

  /* Aplica href a todos os elementos com o atributo. Se href vazio, oculta o elemento. */
  function setLink(attr, href, externo) {
    document.querySelectorAll('[' + attr + ']').forEach(function (el) {
      if (!href) { el.hidden = true; return; }
      el.hidden = false;
      el.setAttribute('href', href);
      if (externo && href !== '#') {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  function aplicarLinksDeContato() {
    const tel = somenteDigitos(CONTATO.telefoneSos);
    const telHref = tel ? 'tel:+' + tel : '#';
    const waSos = waLink(CONTATO.whatsappSos);
    const waSec = waLink(CONTATO.whatsappSecretaria);
    const doc = urlSegura(CONTATO.doctoralia);

    // Legados
    setLink('data-tel', telHref, false);
    setLink('data-wa', waSec || '#', true);

    // Canais nomeados (4 balões)
    setLink('data-call-sos', telHref, false);
    setLink('data-wa-sos', waSos, true);      // vazio → oculta até o número ser informado
    setLink('data-wa-sec', waSec || '#', true);
    setLink('data-doctoralia', doc, true);
  }

  SITE.api = { CONTATO, aplicarLinksDeContato };
})(window.SITE = window.SITE || {});
