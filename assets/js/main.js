document.addEventListener('DOMContentLoaded', function () {
  var menuButton = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu-principal');

  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        menu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var cookieBanner = document.getElementById('cookie-banner');
  var cookieClose = document.querySelector('.cookie-close');
  var cookieKey = 'villa_serena_cookie_notice';

  if (cookieBanner && cookieClose) {
    try {
      if (localStorage.getItem(cookieKey) === 'ok') {
        cookieBanner.classList.add('hidden');
      }
      cookieClose.addEventListener('click', function () {
        localStorage.setItem(cookieKey, 'ok');
        cookieBanner.classList.add('hidden');
      });
    } catch (error) {
      cookieClose.addEventListener('click', function () {
        cookieBanner.classList.add('hidden');
      });
    }
  }

  var form = document.getElementById('contact-form');
  var feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var data = new FormData(form);
      var subject = 'Contato Villa Serena - ' + (data.get('motivo') || 'Informações gerais');
      var body = [
        'Nome: ' + (data.get('nome') || ''),
        'Telefone/WhatsApp: ' + (data.get('telefone') || ''),
        'E-mail: ' + (data.get('email') || ''),
        'Motivo: ' + (data.get('motivo') || ''),
        '',
        'Mensagem:',
        data.get('mensagem') || '',
        '',
        'Aviso: não anexar RG, CPF, laudos, imagens de documentos, dados de saúde ou informações sensíveis neste primeiro contato.'
      ].join('\n');

      var href = 'mailto:Contato@jus9tecnologia.com.br?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = href;

      if (feedback) {
        feedback.textContent = 'Seu aplicativo de e-mail será aberto para revisar e enviar a mensagem.';
      }
    });
  }
});
