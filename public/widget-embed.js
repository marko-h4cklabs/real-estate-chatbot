(function () {
  // ============================================================
  // KONFIGURACIJA — Prilagodite prema vašoj agenciji
  // ============================================================
  var CONFIG = {
    PROXY_URL: 'https://real-estate-chatbot-eta.vercel.app', // Vercel URL — ne mijenjajte
    BRAND_NAME: 'Agencija za Nekretnine',
    BRAND_COLOR: '#1a3a5c',
    ACCENT_COLOR: '#c8a96e',
    WELCOME_MSG: 'Dobar dan! Kako vam mogu pomoći danas?',
    SUGGESTIONS: [
      'Koje usluge nudite?',
      'Kolika je vaša provizija?',
      'Kako se prodaje nekretnina?',
      'Tražim stan za najam',
    ],
  };
  // ============================================================

  var HISTORY = [];
  var isOpen = false;

  // ── CSS ──────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '#re-bubble{position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:' + CONFIG.BRAND_COLOR + ';border:none;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.25);z-index:9998;display:flex;align-items:center;justify-content:center;transition:transform .2s;}',
    '#re-bubble:hover{transform:scale(1.08);}',
    '#re-bubble svg{width:28px;height:28px;fill:#fff;}',
    '#re-window{position:fixed;bottom:92px;right:24px;width:360px;max-width:calc(100vw - 48px);height:520px;max-height:calc(100vh - 120px);background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.18);z-index:9999;display:flex;flex-direction:column;overflow:hidden;transform:scale(.9) translateY(16px);opacity:0;pointer-events:none;transition:all .25s cubic-bezier(.4,0,.2,1);}',
    '#re-window.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}',
    '#re-header{background:' + CONFIG.BRAND_COLOR + ';padding:14px 16px;display:flex;align-items:center;gap:10px;}',
    '#re-header-dot{width:10px;height:10px;border-radius:50%;background:' + CONFIG.ACCENT_COLOR + ';}',
    '#re-header-name{color:#fff;font-weight:600;font-size:15px;flex:1;}',
    '#re-close{background:none;border:none;color:rgba(255,255,255,.7);cursor:pointer;font-size:22px;line-height:1;padding:0;}',
    '#re-close:hover{color:#fff;}',
    '#re-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;font-family:system-ui,sans-serif;font-size:14px;}',
    '.re-msg{max-width:82%;padding:10px 13px;border-radius:14px;line-height:1.45;word-wrap:break-word;}',
    '.re-msg.bot{background:#f0f2f5;color:#1a1a1a;align-self:flex-start;border-bottom-left-radius:4px;}',
    '.re-msg.user{background:' + CONFIG.BRAND_COLOR + ';color:#fff;align-self:flex-end;border-bottom-right-radius:4px;}',
    '.re-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;}',
    '.re-chip{background:#fff;border:1.5px solid ' + CONFIG.ACCENT_COLOR + ';color:' + CONFIG.BRAND_COLOR + ';padding:5px 11px;border-radius:20px;font-size:12px;cursor:pointer;transition:background .15s;}',
    '.re-chip:hover{background:' + CONFIG.ACCENT_COLOR + ';color:#fff;}',
    '#re-typing{display:flex;align-items:center;gap:4px;padding:10px 13px;background:#f0f2f5;border-radius:14px;align-self:flex-start;max-width:60px;}',
    '#re-typing span{width:7px;height:7px;border-radius:50%;background:#999;animation:re-bounce 1.2s infinite;}',
    '#re-typing span:nth-child(2){animation-delay:.2s;}',
    '#re-typing span:nth-child(3){animation-delay:.4s;}',
    '@keyframes re-bounce{0%,80%,100%{transform:translateY(0);}40%{transform:translateY(-6px);}}',
    '#re-footer{padding:10px 12px;border-top:1px solid #eee;display:flex;gap:8px;}',
    '#re-input{flex:1;border:1.5px solid #ddd;border-radius:22px;padding:9px 14px;font-size:14px;outline:none;font-family:system-ui,sans-serif;}',
    '#re-input:focus{border-color:' + CONFIG.BRAND_COLOR + ';}',
    '#re-send{background:' + CONFIG.BRAND_COLOR + ';border:none;color:#fff;border-radius:50%;width:38px;height:38px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .15s;}',
    '#re-send:hover{background:' + CONFIG.ACCENT_COLOR + ';}',
    '#re-send svg{width:18px;height:18px;fill:#fff;}',
  ].join('');
  document.head.appendChild(style);

  // ── Bubble button ─────────────────────────────────────────────
  var bubble = document.createElement('button');
  bubble.id = 're-bubble';
  bubble.setAttribute('aria-label', 'Otvori chat');
  bubble.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z"/></svg>';
  document.body.appendChild(bubble);

  // ── Chat window ───────────────────────────────────────────────
  var win = document.createElement('div');
  win.id = 're-window';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', 'Chat prozor');
  win.innerHTML =
    '<div id="re-header"><div id="re-header-dot"></div><span id="re-header-name">' + CONFIG.BRAND_NAME + '</span><button id="re-close" aria-label="Zatvori">&times;</button></div>' +
    '<div id="re-messages"></div>' +
    '<div id="re-footer"><input id="re-input" type="text" placeholder="Napišite poruku..." autocomplete="off" /><button id="re-send" aria-label="Pošalji"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button></div>';
  document.body.appendChild(win);

  var msgBox = win.querySelector('#re-messages');
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
    return div;
  }

  function showTyping() {
    var el = document.createElement('div');
    el.id = 're-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    msgBox.appendChild(el);
    scrollBottom();
    return el;
  }

  function removeTyping(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function showWelcome() {
    addMsg(CONFIG.WELCOME_MSG, 'bot');
    if (CONFIG.SUGGESTIONS && CONFIG.SUGGESTIONS.length) {
      var chips = document.createElement('div');
      chips.className = 're-chips';
      CONFIG.SUGGESTIONS.forEach(function (s) {
        var chip = document.createElement('button');
        chip.className = 're-chip';
        chip.textContent = s;
        chip.addEventListener('click', function () {
          chips.remove();
          sendMessage(s);
        });
        chips.appendChild(chip);
      });
      msgBox.appendChild(chips);
      scrollBottom();
    }
  }

  async function sendMessage(text) {
    if (!text.trim()) return;
    input.value = '';
    addMsg(text, 'user');
    HISTORY.push({ role: 'user', content: text });

    var typing = showTyping();
    try {
      var res = await fetch(CONFIG.PROXY_URL + '/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: HISTORY }),
      });
      var data = await res.json();
      removeTyping(typing);
      var reply = data.reply || 'Ispričavam se, došlo je do greške.';
      addMsg(reply, 'bot');
      HISTORY.push({ role: 'assistant', content: reply });
      if (HISTORY.length > 20) HISTORY = HISTORY.slice(-20);
    } catch (e) {
      removeTyping(typing);
      addMsg('Nije moguće uspostaviti vezu. Pokušajte ponovo.', 'bot');
    }
  }

  // ── Events ────────────────────────────────────────────────────
  bubble.addEventListener('click', function () {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    if (isOpen && msgBox.children.length === 0) showWelcome();
    if (isOpen) input.focus();
  });

  win.querySelector('#re-close').addEventListener('click', function () {
    isOpen = false;
    win.classList.remove('open');
  });

  win.querySelector('#re-send').addEventListener('click', function () {
    sendMessage(input.value);
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input.value);
    }
  });
})();
