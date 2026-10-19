(function () {
  "use strict";

  try {
    if (window.__YAKW_WIDGET__) return;
    window.__YAKW_WIDGET__ = { version: "1.3.1" };

    var CONFIG = {
      id: "yakw",
      title: "Связаться",
      appearAfterScrollPx: 220,
      bottomPx: 24,
      rightPx: 24,
      zIndex: 2147483000,
      metrikaCounterId: null,
      triggerIconRotateMs: 2500,
      theme: {
        panelBg: "#101014",
        panelBorder: "rgba(255,133,98,.4)",
        text: "#ffffff",
        muted: "rgba(255,255,255,.72)",
        chipBg: "#18181d",
        chipBorder: "rgba(255,133,98,.55)",
        chipText: "#ff8562",
        accent: "#df5500",
        triggerBg: "#df5500",
        triggerHover: "#ff8562",
        shadow: "0 12px 28px rgba(0,0,0,.45)",
        triggerShadow: "0 8px 20px rgba(0,0,0,.4)",
        ring: "rgba(223,85,0,.45)"
      },
      actions: [
        { id: "phone", goal: "telefonvidget", label: "Телефон", icon: "phone", href: "tel:+79146988838", target: "_self" },
        { id: "telegram", goal: "tgvidget", label: "Телеграм", icon: "telegram", href: "https://t.me/YakkavtO", target: "_blank" },
        { id: "mail", goal: "mailvidget", label: "Почта", icon: "mail", href: "mailto:info@yakk-auto.ru", target: "_self" },
        { id: "quiz", goal: "quizvidget", label: "Рассчитать авто", icon: "quiz", href: "#popup:marquiz_69cf0cabf7a9ad001907b3ea", target: "_self", popup: true }
      ],
      labels: {
        open: "Открыть контакты",
        close: "Закрыть"
      },
      track: function (goalId) {
        if (!goalId) return;

        var attempts = 0;
        function sendGoal() {
          var counterId = Number(window.mainMetrikaId || CONFIG.metrikaCounterId);

          if (counterId && typeof window.ym === "function") {
            try {
              window.ym(counterId, "reachGoal", goalId);
            } catch (_) {}
            return;
          }

          attempts += 1;
          if (attempts < 10) window.setTimeout(sendGoal, 500);
        }

        sendGoal();
      }
    };

    function el(tag, attrs) {
      var n = document.createElement(tag);
      if (!attrs) return n;
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        if (k === "class") n.className = attrs[k];
        else if (k === "text") n.textContent = attrs[k];
        else if (k === "html") n.innerHTML = attrs[k];
        else n.setAttribute(k, attrs[k]);
      }
      return n;
    }

    function on(node, evt, fn, opts) {
      if (node) node.addEventListener(evt, fn, opts || false);
    }

    function safeUrl(href) {
      var s = String(href || "").trim();
      if (!s) return "#";
      if (s[0] === "#") return s;
      if (s.indexOf("/") === 0) return s;
      if (/^https?:\/\//i.test(s)) return s;
      if (/^tel:/i.test(s)) return s;
      if (/^mailto:/i.test(s)) return s;
      return "#";
    }

    function isMobile480() {
      try {
        return window.matchMedia && window.matchMedia("(max-width: 480px)").matches;
      } catch (_) {
        return false;
      }
    }

    function openSitePopup(href) {
      var hash = String(href || "");
      if (hash.charAt(0) !== "#") hash = "#" + hash;
      var link = null;
      try {
        link = document.querySelector('a[href="' + hash + '"]');
      } catch (_) {}
      if (link) {
        link.click();
        return;
      }
      try {
        history.replaceState(null, "", location.pathname + location.search);
      } catch (_) {}
      location.hash = hash;
    }

    function iconSvg(name) {
      if (name === "quiz") {
        return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8.75 4.75H15.25C16.9069 4.75 18.25 6.09315 18.25 7.75V16.25C18.25 17.9069 16.9069 19.25 15.25 19.25H8.75C7.09315 19.25 5.75 17.9069 5.75 16.25V7.75C5.75 6.09315 7.09315 4.75 8.75 4.75Z" stroke="currentColor" stroke-width="1.7"></path><path d="M9.25 9.25H14.75M9.25 12.25H14.75M9.25 15.25H12.25" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path><circle cx="16.35" cy="7.15" r="2.85" fill="currentColor"></circle><path d="M16.35 5.95V7.55L17.25 8.15" stroke="#101014" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
      }
      if (name === "phone") {
        return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M5.00017 9.86053C6.91657 14.0344 10.3266 17.3529 14.5661 19.1519L15.2457 19.4547C16.8005 20.1475 18.6283 19.6212 19.5766 18.2077L20.4647 16.884C20.7534 16.4536 20.6655 15.8739 20.2622 15.5485L17.2503 13.1187C16.8079 12.7618 16.1574 12.845 15.819 13.3016L14.8873 14.5589C12.4965 13.3795 10.5554 11.4385 9.37607 9.04768L10.6333 8.11596C11.09 7.77754 11.1731 7.12702 10.8162 6.68464L8.38635 3.6727C8.061 3.26942 7.4815 3.18145 7.05113 3.47002L5.71829 4.36372C4.29595 5.31742 3.77257 7.16027 4.4813 8.71922L4.99939 9.85884L5.00017 9.86053Z" fill="currentColor"></path></svg>';
      }
      if (name === "telegram") {
        return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.4831 19.79L18.4838 19.7883L18.5012 19.7448L21.5 4.62568V4.57657C21.5 4.19987 21.3608 3.87101 21.0579 3.67375C20.7928 3.50109 20.4881 3.48879 20.2744 3.50501C20.0483 3.52217 19.8352 3.57858 19.6877 3.62554C19.6118 3.6497 19.5483 3.67298 19.5028 3.69059C19.48 3.69943 19.4615 3.70692 19.4481 3.71251L19.4349 3.71807L2.71508 10.277L2.71048 10.2787C2.70145 10.2819 2.68951 10.2864 2.67508 10.292C2.64633 10.3032 2.60719 10.3192 2.56121 10.3401C2.47093 10.381 2.34619 10.4441 2.21969 10.5307C2.00484 10.6779 1.59572 11.0262 1.6648 11.5784C1.72202 12.0358 2.03733 12.3263 2.2499 12.4767C2.36384 12.5574 2.47286 12.6155 2.55269 12.6535C2.59313 12.6728 2.62749 12.6875 2.65308 12.6979C2.66591 12.7032 2.67663 12.7073 2.68493 12.7105L2.69556 12.7144L2.70235 12.717L5.62759 13.7018C5.61772 13.8853 5.63592 14.0724 5.68459 14.2571L7.14988 19.8155C7.32361 20.4745 7.91984 20.9336 8.60141 20.9331C9.21234 20.9327 9.75417 20.5631 9.98435 20.0117L12.272 17.5656L16.201 20.5778L16.2569 20.6022C16.6138 20.758 16.9474 20.8073 17.2523 20.7657C17.5568 20.7241 17.7987 20.5964 17.9805 20.451C18.1594 20.3079 18.2819 20.1464 18.359 20.0248C18.3982 19.963 18.4274 19.9087 18.4476 19.8679C18.4578 19.8473 18.4658 19.83 18.4718 19.8164L18.4794 19.799L18.4821 19.7926L18.4831 19.79ZM7.13499 13.8747C7.10169 13.7484 7.15397 13.615 7.26426 13.545L17.1863 7.24407C17.1863 7.24407 17.7699 6.88978 17.749 7.24407C17.749 7.24407 17.8532 7.30664 17.5404 7.59837C17.2438 7.87544 10.4688 14.4165 9.78322 15.0784C9.74365 15.1166 9.72003 15.1604 9.70608 15.2136L8.60028 19.4331L7.13499 13.8747Z" fill="currentColor"></path></svg>';
      }
      if (name === "mail") {
        return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="3.25" y="5.25" width="17.5" height="13.5" stroke="currentColor" stroke-width="1.7"></rect><path d="M4 6.5L12 12.75L20 6.5" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"></path></svg>';
      }
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M7 12h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    }

    if (!document.getElementById("yakw-style")) {
      var css = ""
        + "@font-face{font-family:'Yakk';src:url('https://static.tildacdn.com/tild3066-3236-4236-b361-626336396266/WixMadeforDisplay-Re.woff') format('woff');font-weight:400;font-style:normal;font-display:swap}"
        + "@font-face{font-family:'Yakk';src:url('https://static.tildacdn.com/tild3565-3963-4262-a565-366365323437/WixMadeforDisplay-Se.woff') format('woff');font-weight:600;font-style:normal;font-display:swap}"
        + "@font-face{font-family:'Yakk';src:url('https://static.tildacdn.com/tild3838-6362-4265-a131-333663646534/Bicubik-71qR.woff') format('woff');font-weight:700;font-style:normal;font-display:swap}"
        + ".yakw-root{--yakw-btn:54px;--yakw-cut:polygon(0% 0%,100% 0%,100% 100%,10px 100%,0% calc(100% - 10px));position:fixed;right:" + CONFIG.rightPx + "px;bottom:" + CONFIG.bottomPx + "px;z-index:" + CONFIG.zIndex + ";pointer-events:none;font-family:Yakk,Arial,sans-serif}"
        + ".yakw-root[data-visible='0']{opacity:0;visibility:hidden;transform:translateY(10px)}"
        + ".yakw-root[data-visible='1']{opacity:1;visibility:visible;transform:translateY(0)}"
        + ".yakw-root{transition:opacity .22s ease,visibility .22s ease,transform .22s ease;will-change:opacity,transform}"
        + ".yakw-btn{pointer-events:auto;display:inline-flex;align-items:center;justify-content:center;width:var(--yakw-btn);height:var(--yakw-btn);min-width:var(--yakw-btn);min-height:var(--yakw-btn);aspect-ratio:1/1;border-radius:0;border:0;padding:0;cursor:pointer;background:" + CONFIG.theme.triggerBg + ";box-shadow:" + CONFIG.theme.triggerShadow + ";color:#fff;position:relative;z-index:1;overflow:hidden;clip-path:var(--yakw-cut);transition:opacity .18s ease,visibility .18s ease,transform .18s ease,background .18s ease}"
        + ".yakw-btn::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(120deg,rgba(255,255,255,0) 34%,rgba(255,255,255,.28) 50%,rgba(255,255,255,0) 66%);transform:translateX(-140%);animation:yakw-trigger-shine 3.6s ease-in-out infinite}"
        + ".yakw-btn:hover{background:" + CONFIG.theme.triggerHover + "}"
        + ".yakw-btnIcon{display:block;line-height:0;width:24px;height:24px;opacity:1;transform:scale(1);transition:opacity .28s ease,transform .28s ease}"
        + ".yakw-btnIcon.is-switching{opacity:0;transform:scale(.82)}"
        + ".yakw-btnIcon>svg{width:100%;height:100%;display:block;transform-origin:50% 50%;animation:yakw-trigger-icon-pulse 2.2s ease-in-out infinite}"
        + ".yakw-btn.yakw-btn--cross .yakw-btnIcon>svg{animation:none}"
        + ".yakw-root[data-open='1'] .yakw-btn{opacity:0;visibility:hidden;transform:scale(.96);pointer-events:none}"
        + ".yakw-btn:focus{outline:none}"
        + ".yakw-btn:focus-visible{box-shadow:" + CONFIG.theme.triggerShadow + ",0 0 0 4px " + CONFIG.theme.ring + "}"
        + ".yakw-panel{pointer-events:auto;position:absolute;right:0;bottom:0;z-index:2;transform:translateY(10px);opacity:0;visibility:hidden;transition:opacity .34s cubic-bezier(.16,1,.3,1),transform .34s cubic-bezier(.16,1,.3,1),visibility .34s;will-change:opacity,transform}"
        + ".yakw-root[data-open='1'] .yakw-panel{opacity:1;visibility:visible;transform:translateY(0)}"
        + ".yakw-card{width:196px;max-width:calc(100vw - 18px);box-sizing:border-box;background:" + CONFIG.theme.panelBg + ";border:1px solid " + CONFIG.theme.panelBorder + ";border-radius:0;box-shadow:" + CONFIG.theme.shadow + ";padding:12px 8px 54px;color:" + CONFIG.theme.text + ";overscroll-behavior:contain;touch-action:manipulation;overflow:hidden;position:relative}"
        + ".yakw-header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;padding:0}"
        + ".yakw-title{font-weight:600;font-size:13px;letter-spacing:.02em;text-transform:uppercase;margin:0;padding:4px 2px 0;color:" + CONFIG.theme.text + "}"
        + ".yakw-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 8px;align-items:start;min-width:0}"
        + ".yakw-action{display:flex;flex-direction:column;align-items:center;gap:7px;text-decoration:none;color:" + CONFIG.theme.text + ";min-width:0;min-height:auto}"
        + ".yakw-icon{width:44px;height:44px;border-radius:0;background:" + CONFIG.theme.chipBg + ";border:1px solid " + CONFIG.theme.chipBorder + ";display:flex;align-items:center;justify-content:center;color:" + CONFIG.theme.chipText + ";transition:background .2s ease,color .2s ease,border-color .2s ease}"
        + ".yakw-action:hover .yakw-icon{background:" + CONFIG.theme.accent + ";border-color:" + CONFIG.theme.accent + ";color:#fff}"
        + ".yakw-icon svg{width:20px;height:20px;display:block}"
        + ".yakw-label{font-size:11px;letter-spacing:.02em;text-transform:uppercase;text-align:center;line-height:1.25;max-width:88px;font-weight:600;color:" + CONFIG.theme.muted + ";white-space:normal}"
        + ".yakw-labelWrap{max-width:120px;overflow:hidden;white-space:nowrap;text-align:center;font-size:11px;letter-spacing:.04em;text-transform:uppercase;line-height:1.25;font-weight:600;box-sizing:border-box;color:" + CONFIG.theme.muted + "}"
        + ".yakw-labelWrap--marquee{max-width:118px;text-align:left;isolation:isolate}"
        + ".yakw-labelMarquee{display:inline-flex;flex-wrap:nowrap;white-space:nowrap;width:max-content;max-width:none;will-change:margin-left;margin-left:0;animation:yakw-marquee-rtl var(--yakw-marquee-duration,3.2s) linear infinite}"
        + ".yakw-labelText{display:inline-block;flex:0 0 auto;white-space:nowrap;padding-right:22px}"
        + ".yakw-footer{position:absolute;left:12px;right:12px;bottom:10px;display:flex;align-items:center;justify-content:flex-end;gap:10px;margin:0;height:32px}"
        + ".yakw-close{width:32px;height:32px;min-width:32px;min-height:32px;padding:0;border-radius:0;border:1px solid rgba(223,85,0,.55);background:transparent;color:" + CONFIG.theme.text + ";cursor:pointer;display:flex;align-items:center;justify-content:center;box-sizing:border-box;line-height:0;transition:background .2s ease,border-color .2s ease}"
        + ".yakw-close:hover{background:" + CONFIG.theme.accent + ";border-color:" + CONFIG.theme.accent + "}"
        + ".yakw-close svg{width:12px;height:12px;display:block}"
        + ".yakw-close svg path{stroke-width:1.6}"
        + ".yakw-close:focus{outline:none}"
        + ".yakw-close:focus-visible{box-shadow:0 0 0 4px " + CONFIG.theme.ring + "}"
        + "@keyframes yakw-marquee-rtl{0%{margin-left:0}100%{margin-left:var(--yakw-marquee-shift,-50%)}}"
        + "@keyframes yakw-trigger-shine{0%,70%,100%{transform:translateX(-140%)}78%{transform:translateX(140%)}}"
        + "@keyframes yakw-trigger-icon-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}"
        + "@media (prefers-reduced-motion: reduce){.yakw-btn::after,.yakw-btnIcon>svg,.yakw-labelMarquee{animation:none}.yakw-btnIcon{transition:none}}"
        + ".yakw-root[data-open='1'] .yakw-btn::after{opacity:0}"
        + "@media (max-width:480px){"
          + ".yakw-root{--yakw-btn:58px;right:16px;bottom:16px;width:var(--yakw-btn)}"
          + ".yakw-panel{left:50%;right:auto;bottom:calc(var(--yakw-btn) + 12px);transform:translate(-50%,10px)}"
          + ".yakw-root[data-open='1'] .yakw-panel{transform:translate(-50%,0)}"
          + ".yakw-root[data-open='1'] .yakw-btn{opacity:1;visibility:visible;transform:none;pointer-events:auto}"
          + ".yakw-btnIcon{width:26px;height:26px}"
          + ".yakw-btn.yakw-btn--cross .yakw-btnIcon{width:18px;height:18px}"
          + ".yakw-card{width:min(116px,calc(100vw - 18px));padding:14px 0;border-radius:0;display:block;overflow:visible;box-shadow:" + CONFIG.theme.shadow + ";border-color:" + CONFIG.theme.panelBorder + "}"
          + ".yakw-header{display:none}"
          + ".yakw-grid{display:flex;flex-direction:column;gap:18px;align-items:center;overflow:visible}"
          + ".yakw-action{flex-direction:column;justify-content:flex-start;align-items:center;gap:5px;min-height:auto;overflow:visible}"
          + ".yakw-action:first-child{margin-top:4px}"
          + ".yakw-action:last-child{margin-bottom:4px}"
          + ".yakw-icon{width:34px;height:34px}"
          + ".yakw-icon svg{width:17px;height:17px}"
          + ".yakw-label{display:block;max-width:100px;white-space:normal;overflow:visible;text-overflow:clip;text-align:center;font-size:10px;line-height:1.15}"
          + ".yakw-labelWrap{display:block;width:88px;max-width:88px;overflow:hidden;white-space:nowrap;text-overflow:clip;text-align:center;font-size:10px;line-height:1.1}"
          + ".yakw-labelWrap--marquee{width:88px;max-width:88px;transform:none;text-align:left;overflow:hidden;text-overflow:clip;isolation:isolate;-webkit-mask-image:linear-gradient(90deg,#000 82%,transparent);mask-image:linear-gradient(90deg,#000 82%,transparent)}"
          + ".yakw-labelMarquee{display:inline-flex!important;flex-wrap:nowrap;white-space:nowrap;width:max-content;max-width:none;margin-left:0;animation:yakw-marquee-rtl var(--yakw-marquee-duration,3.2s) linear infinite!important}"
          + ".yakw-labelText{display:inline-block;flex:0 0 auto;padding-right:22px}"
          + ".yakw-footer{display:none}"
        + "}"
        + "@media (max-width:360px){.yakw-root{--yakw-btn:52px}.yakw-card{padding:10px 0}.yakw-icon{width:34px;height:34px}.yakw-btnIcon{width:22px;height:22px}}";

      document.head.appendChild(el("style", { id: "yakw-style", text: css }));
    }

    var root = el("div", {
      class: "yakw-root",
      id: "yakw-root",
      "data-visible": "0",
      "data-open": "0"
    });

    var openBtn = el("button", {
      class: "yakw-btn",
      type: "button",
      "aria-label": CONFIG.labels.open
    });

    var openBtnIcon = el("span", {
      class: "yakw-btnIcon",
      "aria-hidden": "true"
    });

    openBtn.appendChild(openBtnIcon);

    var triggerIconNames = [];
    var ti;
    for (ti = 0; ti < CONFIG.actions.length; ti++) {
      if (CONFIG.actions[ti] && CONFIG.actions[ti].icon) {
        triggerIconNames.push(CONFIG.actions[ti].icon);
      }
    }
    if (!triggerIconNames.length) triggerIconNames.push("phone");

    var triggerIconIndex = 0;
    var triggerRotateTimer = null;
    var triggerSwitchTimer = null;
    var prefersReducedMotion = false;

    try {
      prefersReducedMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch (_) {}

    var openBtnCrossHtml =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" fill="none" aria-hidden="true">' +
      '<path d="M0.5 0.5L16.5 16.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.6"></path>' +
      '<path d="M0.5 16.5L16.5 0.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.6"></path>' +
      "</svg>";

    function currentTriggerIconHtml() {
      return iconSvg(triggerIconNames[triggerIconIndex] || "phone");
    }

    function setTriggerIconHtml(html, withFade) {
      if (!withFade || prefersReducedMotion) {
        openBtnIcon.classList.remove("is-switching");
        openBtnIcon.innerHTML = html;
        return;
      }

      if (triggerSwitchTimer) {
        window.clearTimeout(triggerSwitchTimer);
        triggerSwitchTimer = null;
      }

      openBtnIcon.classList.add("is-switching");
      triggerSwitchTimer = window.setTimeout(function () {
        openBtnIcon.innerHTML = html;
        openBtnIcon.classList.remove("is-switching");
        triggerSwitchTimer = null;
      }, 280);
    }

    function stopTriggerIconRotate() {
      if (triggerRotateTimer) {
        window.clearInterval(triggerRotateTimer);
        triggerRotateTimer = null;
      }
    }

    function startTriggerIconRotate() {
      if (triggerRotateTimer) return;
      if (prefersReducedMotion || triggerIconNames.length < 2) return;
      if (isMobile480() && root.getAttribute("data-open") === "1") return;

      var ms = Number(CONFIG.triggerIconRotateMs) || 2500;
      triggerRotateTimer = window.setInterval(function () {
        if (isMobile480() && root.getAttribute("data-open") === "1") return;
        triggerIconIndex = (triggerIconIndex + 1) % triggerIconNames.length;
        setTriggerIconHtml(currentTriggerIconHtml(), true);
      }, ms);
    }

    setTriggerIconHtml(currentTriggerIconHtml(), false);

    var panel = el("div", {
      class: "yakw-panel",
      role: "dialog",
      "aria-modal": "false",
      "aria-label": CONFIG.title
    });

    var card = el("div", { class: "yakw-card" });
    var header = el("div", { class: "yakw-header" });
    header.appendChild(el("div", { class: "yakw-title", text: CONFIG.title }));

    var grid = el("div", { class: "yakw-grid" });

    function syncMarqueeShift(track) {
      if (!track) return;
      var w = track.scrollWidth || 0;
      if (w < 2) return;
      track.style.setProperty("--yakw-marquee-shift", (-Math.round(w / 2)) + "px");
    }

    function makeAction(a) {
      var node = el("a", {
        class: "yakw-action",
        href: safeUrl(a.href),
        target: a.target || "_self",
        rel: a.target === "_blank" ? "noopener noreferrer" : ""
      });

      node.setAttribute("data-action-id", a.id || "");
      node.setAttribute("data-metrika-goal", a.goal || "");
      node.appendChild(el("div", { class: "yakw-icon", html: iconSvg(a.icon) }));

      if (a.marquee) {
        var lw = el("div", { class: "yakw-labelWrap yakw-labelWrap--marquee" });
        var track = el("span", { class: "yakw-labelMarquee", "aria-hidden": "true" });
        var lbl = a.label || "";
        var ratio = Math.max(1, lbl.length / 13);
        track.style.setProperty("--yakw-marquee-duration", (3.2 * ratio).toFixed(2) + "s");
        track.appendChild(el("span", { class: "yakw-labelText", text: lbl + "   " }));
        track.appendChild(el("span", { class: "yakw-labelText", text: lbl + "   " }));
        lw.appendChild(track);
        node.appendChild(lw);
        node.setAttribute("aria-label", lbl);
        node._yakwMarqueeTrack = track;
      } else {
        node.appendChild(el("div", { class: "yakw-label", text: a.label || "" }));
      }

      on(node, "click", function (e) {
        if (a.popup) {
          e.preventDefault();
          CONFIG.track(a.goal);
          closePanel();
          openSitePopup(a.href);
          return;
        }

        CONFIG.track(a.goal);
        closePanel();
      });

      return node;
    }

    var i;
    for (i = 0; i < CONFIG.actions.length; i++) {
      grid.appendChild(makeAction(CONFIG.actions[i]));
    }

    var footer = el("div", { class: "yakw-footer" });
    var closeBtn = el("button", {
      class: "yakw-close",
      type: "button",
      "aria-label": CONFIG.labels.close
    });

    closeBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" fill="none" aria-hidden="true">' +
      '<path d="M0.5 0.5L16.5 16.5" stroke="currentColor" stroke-linecap="round"></path>' +
      '<path d="M0.5 16.5L16.5 0.5" stroke="currentColor" stroke-linecap="round"></path>' +
      "</svg>";

    footer.appendChild(closeBtn);
    card.appendChild(header);
    card.appendChild(grid);
    card.appendChild(footer);
    panel.appendChild(card);
    root.appendChild(panel);
    root.appendChild(openBtn);

    function setVisible(v) {
      root.setAttribute("data-visible", v ? "1" : "0");
    }

    function applyTriggerIcon() {
      var mobile = isMobile480();
      var opened = root.getAttribute("data-open") === "1";
      var showCross = mobile && opened;
      var html = showCross ? openBtnCrossHtml : currentTriggerIconHtml();

      if (showCross) openBtn.classList.add("yakw-btn--cross");
      else openBtn.classList.remove("yakw-btn--cross");

      if (showCross) {
        stopTriggerIconRotate();
        if (triggerSwitchTimer) {
          window.clearTimeout(triggerSwitchTimer);
          triggerSwitchTimer = null;
        }
        openBtnIcon.classList.remove("is-switching");
        openBtnIcon.innerHTML = html;
        return;
      }

      if (openBtn.classList.contains("yakw-btn--cross") || openBtnIcon.innerHTML === openBtnCrossHtml) {
        openBtnIcon.innerHTML = html;
      }

      startTriggerIconRotate();
    }

    function refreshMarquees() {
      var nodes = grid.querySelectorAll(".yakw-labelMarquee");
      var n;
      for (n = 0; n < nodes.length; n++) syncMarqueeShift(nodes[n]);
    }

    function openPanel() {
      root.setAttribute("data-open", "1");
      applyTriggerIcon();
      window.requestAnimationFrame(function () {
        refreshMarquees();
        window.requestAnimationFrame(refreshMarquees);
      });
      try {
        closeBtn.focus({ preventScroll: true });
      } catch (_) {}
    }

    function closePanel() {
      root.setAttribute("data-open", "0");
      applyTriggerIcon();
      updateVisibility();
    }

    on(openBtn, "click", function (e) {
      e.preventDefault();
      if (root.getAttribute("data-open") === "1") closePanel();
      else openPanel();
    });

    on(closeBtn, "click", function (e) {
      e.preventDefault();
      closePanel();
    });

    on(
      document,
      "click",
      function (e) {
        if (root.getAttribute("data-open") !== "1") return;
        if (root.contains(e.target)) return;
        closePanel();
      },
      true
    );

    on(document, "keydown", function (e) {
      if (e.key === "Escape" && root.getAttribute("data-open") === "1") {
        closePanel();
      }
    });

    on(
      document,
      "wheel",
      function (e) {
        if (root.getAttribute("data-open") === "1" && card.contains(e.target)) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      { passive: false, capture: true }
    );

    on(
      document,
      "touchmove",
      function (e) {
        if (root.getAttribute("data-open") === "1" && card.contains(e.target)) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      { passive: false, capture: true }
    );

    var ticking = false;

    function updateVisibility() {
      ticking = false;
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var threshold = CONFIG.appearAfterScrollPx || 0;

      if (root.getAttribute("data-open") === "1" && y < threshold) {
        root.setAttribute("data-open", "0");
      }

      var should = y >= threshold;
      setVisible(should);
      applyTriggerIcon();
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    }

    function init() {
      if (!document.body) return;
      if (document.getElementById(root.id)) return;

      document.body.appendChild(root);
      setVisible(false);
      root.setAttribute("data-open", "0");
      updateVisibility();

      on(window, "scroll", onScroll, { passive: true });
      on(window, "resize", function () {
        onScroll();
        refreshMarquees();
      });
      applyTriggerIcon();
      refreshMarquees();
    }

    if (document.readyState === "loading") {
      on(document, "DOMContentLoaded", init);
    } else {
      init();
    }
  } catch (e) {
    try {
      console.error("[YAKW] init failed:", e);
    } catch (_) {}
  }
})();
