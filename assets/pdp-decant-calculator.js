/* Calculadora "¿Cuánto rinde tu decant?" (Disfragancias).
   - Inyecta el disparador en la row de cantidad del PDP.
   - Modal editable por el cliente: tamaño y atomizaciones/día.
   - Valor por atomización calculado desde el precio del producto (o manual).
   Datos entran por un <script type="application/json" id="decant-calc-data-{uid}">.
*/
(function () {
  'use strict';

  function money(n) {
    var v = Math.round(Number(n) || 0);
    try { return '$' + v.toLocaleString('es-CO'); }
    catch (e) { return '$' + String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  }
  function norm(s) { return String(s || '').toLowerCase().replace(/\s+/g, ''); }

  function priceForSize(size, data) {
    // Precio en pesos. Preferir variante del producto si así se configuró.
    if (data.priceSource === 'product_variant' && data.variants && data.variants.length) {
      var want = norm(size.label);
      for (var i = 0; i < data.variants.length; i++) {
        var v = data.variants[i];
        if (norm(v.title).indexOf(want) !== -1) return v.price / 100;
      }
    }
    return Number(size.price) || 0;
  }

  function init(root) {
    var uid = root.getAttribute('data-uid');
    var dataEl = document.getElementById('decant-calc-data-' + uid);
    if (!dataEl) return;
    var data;
    try { data = JSON.parse(dataEl.textContent); } catch (e) { return; }
    if (!data.sizes || !data.sizes.length) return;

    var modal = root.querySelector('[data-dc-modal]');
    var overlay = root.querySelector('[data-dc-overlay]');
    var perDayInput = root.querySelector('[data-dc-slider]');
    var perDayOut = root.querySelector('[data-dc-perday]');
    var sizeBtns = root.querySelectorAll('[data-dc-size]');
    var elTotal = root.querySelector('[data-dc-total]');
    var elWeeks = root.querySelector('[data-dc-weeks]');
    var elPrice = root.querySelector('[data-dc-ppa]');
    var dotsSure = root.querySelector('[data-dc-dots-sure]');
    var dotsExtra = root.querySelector('[data-dc-dots-extra]');
    var legSure = root.querySelector('[data-dc-leg-sure]');
    var legExtra = root.querySelector('[data-dc-leg-extra]');

    var state = { sizeIndex: 0, perDay: data.defaultPerDay || 5 };

    function dots(container, count, cls) {
      if (!container) return;
      container.innerHTML = '';
      for (var i = 0; i < count; i++) {
        var d = document.createElement('span');
        d.className = cls;
        container.appendChild(d);
      }
    }

    function rangeText(a, b, suffix) {
      a = Math.round(a); b = Math.round(b);
      if (a === b) return a + (suffix || '');
      return a + '–' + b + (suffix || '');
    }

    function recompute() {
      var size = data.sizes[state.sizeIndex];
      var ml = Number(size.ml) || 0;
      var min = ml * data.atomsMin;
      var max = ml * data.atomsMax;
      var price = priceForSize(size, data);

      if (elTotal) elTotal.textContent = rangeText(min, max);

      var perWeek = (state.perDay || 1) * 7;
      if (elWeeks) elWeeks.textContent = '≈ ' + rangeText(min / perWeek, max / perWeek);

      // Más atomizaciones => menor costo por atomización.
      var ppaLow = price / max;
      var ppaHigh = price / min;
      if (elPrice) {
        var lo = Math.round(ppaLow), hi = Math.round(ppaHigh);
        elPrice.textContent = (lo === hi) ? money(lo) : (money(lo) + '–' + Math.round(hi).toLocaleString('es-CO'));
      }
    }

    function selectSize(idx) {
      state.sizeIndex = idx;
      for (var i = 0; i < sizeBtns.length; i++) {
        var on = (i === idx);
        sizeBtns[i].classList.toggle('is-active', on);
        sizeBtns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      recompute();
    }

    // Nota al pie con precios por tamaño
    var elFoot = root.querySelector('[data-dc-foot]');
    if (elFoot) {
      var parts = [];
      for (var fi = 0; fi < data.sizes.length; fi++) {
        parts.push(data.sizes[fi].label + ' ' + money(priceForSize(data.sizes[fi], data)));
      }
      var prefix = data.notePrefix || '*Con precios de';
      var title = data.productTitle ? (' ' + data.productTitle) : '';
      elFoot.textContent = prefix + title + ': ' + parts.join(' · ') + '.';
    }

    // Dots por ml (constantes): seguras = atomsMin, extra = atomsMax - atomsMin.
    var extra = Math.max(0, data.atomsMax - data.atomsMin);
    dots(dotsSure, data.atomsMin, 'dc-dot dc-dot--on');
    dots(dotsExtra, extra, 'dc-dot dc-dot--off');
    if (legSure) legSure.textContent = data.atomsMin + ' atomizaciones seguras por ml';
    if (legExtra) legExtra.textContent = 'hasta ' + data.atomsMax + ' por ml';

    // Relleno visual del slider (webkit; Firefox usa ::-moz-range-progress)
    function paintSlider() {
      if (!perDayInput) return;
      var mn = Number(perDayInput.min) || 1;
      var mx = Number(perDayInput.max) || 20;
      var vl = Number(perDayInput.value) || mn;
      var pct = mx === mn ? 0 : ((vl - mn) / (mx - mn)) * 100;
      perDayInput.style.background =
        'linear-gradient(to right, var(--dc-accent) 0%, var(--dc-accent) ' + pct +
        '%, var(--dc-track) ' + pct + '%, var(--dc-track) 100%)';
    }

    // Slider
    if (perDayInput) {
      perDayInput.min = 1;
      perDayInput.max = data.maxPerDay || 20;
      perDayInput.value = state.perDay;
      if (perDayOut) perDayOut.textContent = state.perDay;
      paintSlider();
      perDayInput.addEventListener('input', function () {
        state.perDay = Number(perDayInput.value) || 1;
        if (perDayOut) perDayOut.textContent = state.perDay;
        paintSlider();
        recompute();
      });
    }

    for (var b = 0; b < sizeBtns.length; b++) {
      (function (i) {
        sizeBtns[i].addEventListener('click', function () { selectSize(i); });
      })(b);
    }

    // Modal open/close
    function open() {
      if (overlay) overlay.hidden = false;
      if (modal) modal.hidden = false;
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
    }
    function close() {
      if (overlay) overlay.hidden = true;
      if (modal) modal.hidden = true;
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }

    if (overlay) overlay.addEventListener('click', close);
    var closeBtns = root.querySelectorAll('[data-dc-close]');
    for (var c = 0; c < closeBtns.length; c++) closeBtns[c].addEventListener('click', close);

    // Inyectar disparador en la row de cantidad
    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'dc-trigger';
    trigger.textContent = data.triggerLabel || '¿Cuánto rinde tu decant?';
    trigger.addEventListener('click', open);

    var qty = document.querySelector('.quantity_selector');
    var placed = false;
    if (qty) {
      var row = qty.closest('.productView-moreItem') || qty.parentNode;
      if (row) {
        row.classList.add('dc-qty-row');
        row.appendChild(trigger);
        placed = true;
      }
    }
    if (!placed) {
      var host = root.querySelector('[data-dc-trigger-fallback]') || root;
      host.appendChild(trigger);
    }

    // Portal: mover el root al <body> para que overlay/modal queden fijos al
    // viewport (si un ancestro tiene transform/filter, 'fixed' se rompería).
    if (root.parentNode !== document.body) document.body.appendChild(root);

    selectSize(0);
  }

  function boot() {
    var roots = document.querySelectorAll('[data-decant-calc]');
    for (var i = 0; i < roots.length; i++) init(roots[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
