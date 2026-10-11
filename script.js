(function () {
  var CONTACT_EMAIL = 'aarondispatchservice@gmail.com';

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setNav(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () {
    setNav(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setNav(false);
  });

  // Fee calculator
  var money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  var gross = document.getElementById('gross');
  function updateCalc() {
    var g = Math.max(0, parseFloat(gross.value) || 0);
    var us = g * 0.05;
    var them = g * 0.10;
    document.getElementById('fee-us').textContent = money.format(us);
    document.getElementById('fee-them').textContent = money.format(them);
    document.getElementById('fee-save').textContent = money.format(them - us);
    document.getElementById('fee-month').textContent = money.format((them - us) * 4 * 4);
  }
  gross.addEventListener('input', updateCalc);
  updateCalc();

  // Lead form: opens the visitor's email app with the details filled in.
  var form = document.getElementById('lead-form');
  var msg = document.getElementById('form-msg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstInvalid = null;
    Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (el) {
      var bad = !el.value.trim();
      el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) {
      msg.textContent = 'Please fill in your name, phone, equipment and home base.';
      msg.className = 'form-msg err';
      firstInvalid.focus();
      return;
    }
    var d = new FormData(form);
    var body = [
      'Name: ' + d.get('name'),
      'Phone: ' + d.get('phone'),
      'MC number: ' + (d.get('mc') || '-'),
      'Equipment: ' + d.get('equipment'),
      'Home base: ' + d.get('base'),
      '',
      d.get('notes') || ''
    ].join('\n');
    var subject = 'Free lane audit request: ' + d.get('equipment') + ' out of ' + d.get('base');
    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    msg.textContent = 'Your email app should open with your details. Just hit send. Or email us at ' + CONTACT_EMAIL + '.';
    msg.className = 'form-msg';
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
