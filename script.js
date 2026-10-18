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

  // Lead form: submitted from the page via FormSubmit, delivered to CONTACT_EMAIL.
  var form = document.getElementById('lead-form');
  var msg = document.getElementById('form-msg');
  var done = document.getElementById('form-done');
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn.innerHTML;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (submitBtn.disabled) return;
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
    var email = form.elements.email;
    if (email.value.trim() && !email.checkValidity()) {
      email.setAttribute('aria-invalid', 'true');
      msg.textContent = 'Please check your email address, or leave it blank.';
      msg.className = 'form-msg err';
      email.focus();
      return;
    }
    email.setAttribute('aria-invalid', 'false');

    var d = new FormData(form);
    if (d.get('_honey')) return;
    var payload = {
      _subject: 'New carrier lead: ' + d.get('equipment') + ' out of ' + d.get('base'),
      _template: 'table',
      Name: d.get('name'),
      Phone: d.get('phone'),
      'MC number': d.get('mc') || '-',
      Equipment: d.get('equipment'),
      'Home base': d.get('base'),
      Notes: d.get('notes') || '-'
    };
    if (d.get('email')) payload.email = d.get('email');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    msg.textContent = '';
    msg.className = 'form-msg';

    fetch('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'Request failed');
        });
      })
      .then(function () {
        form.hidden = true;
        done.hidden = false;
        done.focus();
      })
      .catch(function () {
        msg.textContent = 'Sorry, something went wrong. Please try again, or email us at ' + CONTACT_EMAIL + '.';
        msg.className = 'form-msg err';
      })
      .then(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitLabel;
      });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
