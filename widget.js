(function () {
  'use strict';

  var MATIJA_PHOTO = 'MATIJA_PHOTO_URL';
  var NAVY = '#1a3a5c';
  var GOLD = '#c8a96e';

  // ── DM Sans ──────────────────────────────────────────────────
  if (!document.getElementById('re-dmsans')) {
    var fontLink = document.createElement('link');
    fontLink.id = 're-dmsans';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);
  }

  // ── CSS ──────────────────────────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.textContent =
    '#re-bubble{position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;border:3px solid ' + GOLD + ';cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,.28);z-index:9998;overflow:hidden;padding:0;background:' + NAVY + ';transition:transform .2s;display:flex;align-items:center;justify-content:center;}' +
    '#re-bubble:hover{transform:scale(1.07);}' +
    '#re-bubble img{width:100%;height:100%;object-fit:cover;display:block;border-radius:50%;}' +
    '#re-bubble-icon{width:100%;height:100%;display:flex;align-items:center;justify-content:center;}' +
    '#re-bubble-icon svg{width:30px;height:30px;fill:#fff;}' +
    '#re-window{position:fixed;bottom:96px;right:24px;width:370px;max-width:calc(100vw - 32px);height:540px;max-height:calc(100vh - 120px);background:#fff;border-radius:20px;box-shadow:0 12px 48px rgba(0,0,0,.2);z-index:9999;display:flex;flex-direction:column;overflow:hidden;font-family:"DM Sans",system-ui,sans-serif;transform:scale(.92) translateY(16px);opacity:0;pointer-events:none;transition:transform .25s cubic-bezier(.4,0,.2,1),opacity .25s;}' +
    '#re-window.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}' +
    '#re-header{background:' + NAVY + ';padding:14px 16px;display:flex;align-items:center;gap:11px;flex-shrink:0;}' +
    '#re-header-photo{width:42px;height:42px;border-radius:50%;border:2px solid ' + GOLD + ';overflow:hidden;flex-shrink:0;background:' + NAVY + ';}' +
    '#re-header-photo img{width:100%;height:100%;object-fit:cover;display:block;}' +
    '#re-header-info{flex:1;}' +
    '#re-header-name{color:#fff;font-weight:600;font-size:15px;line-height:1.2;}' +
    '#re-header-sub{display:flex;align-items:center;gap:5px;margin-top:2px;}' +
    '#re-online-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;flex-shrink:0;}' +
    '#re-subtitle{color:rgba(255,255,255,.55);font-size:12px;}' +
    '#re-close{background:none;border:none;color:rgba(255,255,255,.65);cursor:pointer;font-size:24px;line-height:1;padding:0 2px;}' +
    '#re-close:hover{color:#fff;}' +
    '#re-messages{flex:1;overflow-y:auto;padding:16px 14px 10px;display:flex;flex-direction:column;gap:9px;scroll-behavior:smooth;}' +
    '#re-messages::-webkit-scrollbar{width:4px;}' +
    '#re-messages::-webkit-scrollbar-thumb{background:#ddd;border-radius:4px;}' +
    '.re-msg{max-width:80%;padding:10px 14px;border-radius:18px;font-size:14px;line-height:1.5;word-wrap:break-word;}' +
    '.re-msg.bot{background:#f0f2f5;color:#1a1a2e;align-self:flex-start;border-bottom-left-radius:4px;}' +
    '.re-msg.user{background:' + NAVY + ';color:#fff;align-self:flex-end;border-bottom-right-radius:4px;}' +
    '.re-chips{display:flex;flex-wrap:wrap;gap:7px;align-self:flex-start;padding:2px 0;}' +
    '.re-chip{background:#fff;border:1.5px solid ' + GOLD + ';color:' + NAVY + ';font-family:"DM Sans",system-ui,sans-serif;font-size:13px;font-weight:500;padding:7px 14px;border-radius:22px;cursor:pointer;transition:background .15s,color .15s;white-space:nowrap;}' +
    '.re-chip:hover{background:' + GOLD + ';color:#fff;}' +
    '.re-typing{display:flex;align-items:center;gap:4px;padding:10px 14px;background:#f0f2f5;border-radius:18px;border-bottom-left-radius:4px;align-self:flex-start;width:fit-content;}' +
    '.re-typing span{width:7px;height:7px;border-radius:50%;background:#999;animation:re-bounce 1.2s infinite;}' +
    '.re-typing span:nth-child(2){animation-delay:.2s;}' +
    '.re-typing span:nth-child(3){animation-delay:.4s;}' +
    '@keyframes re-bounce{0%,80%,100%{transform:translateY(0);opacity:.5;}40%{transform:translateY(-6px);opacity:1;}}' +
    '.re-contact-card{align-self:flex-start;background:#f8f9fc;border:1px solid #e8eaf0;border-radius:16px;padding:18px 16px;display:flex;flex-direction:column;align-items:center;gap:10px;width:260px;max-width:90%;}' +
    '.re-contact-photo{width:72px;height:72px;border-radius:50%;border:3px solid ' + GOLD + ';overflow:hidden;background:' + NAVY + ';}' +
    '.re-contact-photo img{width:100%;height:100%;object-fit:cover;display:block;}' +
    '.re-contact-name{font-size:15px;font-weight:700;color:#1a1a2e;text-align:center;}' +
    '.re-contact-tagline{font-size:13px;color:#666;text-align:center;margin-top:-4px;}' +
    '.re-contact-links{display:flex;flex-direction:column;gap:7px;width:100%;}' +
    '.re-contact-link{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:10px;background:#fff;border:1px solid #e5e7eb;text-decoration:none;font-size:13.5px;color:' + NAVY + ';font-weight:500;font-family:"DM Sans",system-ui,sans-serif;transition:border-color .15s;}' +
    '.re-contact-link:hover{border-color:' + GOLD + ';}' +
    '.re-contact-link svg{width:16px;height:16px;fill:' + GOLD + ';flex-shrink:0;}' +
    '.re-reset-btn{margin-top:4px;background:' + NAVY + ';color:#fff;border:none;border-radius:22px;padding:9px 18px;font-size:13px;font-weight:500;font-family:"DM Sans",system-ui,sans-serif;cursor:pointer;transition:background .15s;width:100%;}' +
    '.re-reset-btn:hover{background:#234b75;}' +
    '#re-footer{padding:10px 12px;border-top:1px solid #eee;display:flex;gap:8px;flex-shrink:0;background:#fff;}' +
    '#re-footer.hidden{display:none;}' +
    '#re-input{flex:1;border:1.5px solid #ddd;border-radius:22px;padding:9px 14px;font-size:14px;outline:none;font-family:"DM Sans",system-ui,sans-serif;transition:border-color .2s;}' +
    '#re-input:focus{border-color:' + NAVY + ';}' +
    '#re-send{background:' + NAVY + ';border:none;color:#fff;border-radius:50%;width:38px;height:38px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .15s;}' +
    '#re-send:hover{background:' + GOLD + ';}' +
    '#re-send svg{width:17px;height:17px;fill:#fff;}';
  document.head.appendChild(styleEl);

  // ── Flow definition ──────────────────────────────────────────
  var STEPS = {
    welcome: {
      msg: 'Kako vam Matija može pomoći?',
      type: 'buttons',
      buttons: [
        { label: 'Želim kupiti nekretninu', next: 'a1' },
        { label: 'Želim prodati nekretninu', next: 'b1' },
        { label: 'Želim iznajmiti nekretninu', next: 'c1' },
        { label: 'Kontakt s agentom', next: 'contact' }
      ]
    },
    // ── Path A: Kupnja
    a1: {
      msg: 'Što tražite?',
      type: 'buttons',
      buttons: [
        { label: 'Stan', next: 'a2' },
        { label: 'Kuća', next: 'a2' },
        { label: 'Poslovni prostor', next: 'a2' },
        { label: 'Ostalo', next: 'a2' }
      ]
    },
    a2: { msg: 'U kojoj lokaciji?', type: 'text', next: 'a3' },
    a3: {
      msg: 'Koji je vaš okvirni budžet?',
      type: 'buttons',
      buttons: [
        { label: 'Do 100.000€', next: 'contact' },
        { label: '100.000€ – 200.000€', next: 'contact' },
        { label: '200.000€ – 400.000€', next: 'contact' },
        { label: '400.000€+', next: 'contact' }
      ]
    },
    // ── Path B: Prodaja
    b1: {
      msg: 'Što prodajete?',
      type: 'buttons',
      buttons: [
        { label: 'Stan', next: 'b2' },
        { label: 'Kuća', next: 'b2' },
        { label: 'Poslovni prostor', next: 'b2' },
        { label: 'Ostalo', next: 'b2' }
      ]
    },
    b2: { msg: 'Gdje se nalazi nekretnina?', type: 'text', next: 'contact' },
    // ── Path C: Najam
    c1: {
      msg: 'Tražite ili iznajmljujete nekretninu?',
      type: 'buttons',
      buttons: [
        { label: 'Tražim najam', next: 'c2' },
        { label: 'Iznajmljujem svoju nekretninu', next: 'c2' }
      ]
    },
    c2: { msg: 'U kojoj lokaciji?', type: 'text', next: 'contact' },
    // ── Contact
    contact: { type: 'contact' }
  };

  // ── State ────────────────────────────────────────────────────
  var isOpen = false;
  var currentStep = null;

  // ── Build DOM ─────────────────────────────────────────────────

  // Floating bubble
  var bubble = document.createElement('button');
  bubble.id = 're-bubble';
  bubble.setAttribute('aria-label', 'Otvori chat s Matijom');
  var bubbleImg = document.createElement('img');
  bubbleImg.src = MATIJA_PHOTO;
  bubbleImg.alt = 'Matija';
  bubbleImg.onerror = function () {
    bubble.innerHTML = '<div id="re-bubble-icon"><svg viewBox="0 0 24 24"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z"/></svg></div>';
  };
  bubble.appendChild(bubbleImg);
  document.body.appendChild(bubble);

  // Chat window
  var win = document.createElement('div');
  win.id = 're-window';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', 'Chat s Matijom');

  var headerPhotoHtml = '<div id="re-header-photo"><img src="' + MATIJA_PHOTO + '" alt="Matija"></div>';
  var contactPhotoHtml = '<div class="re-contact-photo"><img src="' + MATIJA_PHOTO + '" alt="Matija"></div>';

  win.innerHTML =
    '<div id="re-header">' +
      headerPhotoHtml +
      '<div id="re-header-info">' +
        '<div id="re-header-name">Matija Blažević</div>' +
        '<div id="re-header-sub"><div id="re-online-dot"></div><span id="re-subtitle">EdenVille agent</span></div>' +
      '</div>' +
      '<button id="re-close" aria-label="Zatvori">&times;</button>' +
    '</div>' +
    '<div id="re-messages"></div>' +
    '<div id="re-footer" class="hidden">' +
      '<input id="re-input" type="text" placeholder="Upišite odgovor…" autocomplete="off" />' +
      '<button id="re-send" aria-label="Pošalji"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>' +
    '</div>';

  document.body.appendChild(win);

  var msgBox = win.querySelector('#re-messages');
  var footer = win.querySelector('#re-footer');
  var input = win.querySelector('#re-input');

  // ── Helpers ───────────────────────────────────────────────────
  function scrollBottom() {
    msgBox.scrollTop = msgBox.scrollHeight;
  }

  function addMsg(text, role) {
    var div = document.createElement('div');
    div.className = 're-msg ' + role;
    div.textContent = text;
    msgBox.appendChild(div);
    scrollBottom();
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 're-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    msgBox.appendChild(el);
    scrollBottom();
    return el;
  }

  function botSay(text, delay, cb) {
    var typing = showTyping();
    setTimeout(function () {
      if (typing.parentNode) typing.parentNode.removeChild(typing);
      if (text) addMsg(text, 'bot');
      if (cb) cb();
    }, delay || 600);
  }

  function showButtons(buttons) {
    var chips = document.createElement('div');
    chips.className = 're-chips';
    buttons.forEach(function (b) {
      var btn = document.createElement('button');
      btn.className = 're-chip';
      btn.textContent = b.label;
      btn.addEventListener('click', function () {
        if (chips.parentNode) chips.parentNode.removeChild(chips);
        addMsg(b.label, 'user');
        goToStep(b.next);
      });
      chips.appendChild(btn);
    });
    msgBox.appendChild(chips);
    scrollBottom();
  }

  function showContactCard() {
    var card = document.createElement('div');
    card.className = 're-contact-card';
    card.innerHTML =
      contactPhotoHtml +
      '<div class="re-contact-name">Matija Blažević</div>' +
      '<div class="re-contact-tagline">Matija je spreman pomoći vam!</div>' +
      '<div class="re-contact-links">' +
        '<a class="re-contact-link" href="tel:0913635480">' +
          '<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>' +
          '0913635480' +
        '</a>' +
        '<a class="re-contact-link" href="mailto:matija@edenville.hr">' +
          '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>' +
          'matija@edenville.hr' +
        '</a>' +
      '</div>' +
      '<button class="re-reset-btn">Započni novi razgovor</button>';

    card.querySelector('.re-reset-btn').addEventListener('click', reset);
    msgBox.appendChild(card);
    scrollBottom();
  }

  function goToStep(stepKey) {
    currentStep = stepKey;
    footer.classList.add('hidden');
    input.value = '';

    var step = STEPS[stepKey];

    if (stepKey === 'contact') {
      botSay(null, 500, function () {
        showContactCard();
      });
      return;
    }

    botSay(step.msg, 600, function () {
      if (step.type === 'buttons') {
        showButtons(step.buttons);
      } else if (step.type === 'text') {
        footer.classList.remove('hidden');
        input.focus();
      }
    });
  }

  function submitText() {
    var text = input.value.trim();
    if (!text) return;
    var step = STEPS[currentStep];
    if (!step || step.type !== 'text') return;
    footer.classList.add('hidden');
    input.value = '';
    addMsg(text, 'user');
    goToStep(step.next);
  }

  function reset() {
    msgBox.innerHTML = '';
    footer.classList.add('hidden');
    input.value = '';
    currentStep = null;
    startFlow();
  }

  function startFlow() {
    addMsg(STEPS.welcome.msg, 'bot');
    showButtons(STEPS.welcome.buttons);
  }

  // ── Events ────────────────────────────────────────────────────
  bubble.addEventListener('click', function () {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    if (isOpen && msgBox.children.length === 0) startFlow();
  });

  win.querySelector('#re-close').addEventListener('click', function () {
    isOpen = false;
    win.classList.remove('open');
  });

  win.querySelector('#re-send').addEventListener('click', submitText);

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitText();
    }
  });
})();
