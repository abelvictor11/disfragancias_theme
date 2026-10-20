/* Calculadora "¿Cuánto rinde tu decant?" (Disfragancias).
   - Inyecta el disparador en la row de cantidad del PDP.
   - Modal editable por el cliente: tamaño y atomizaciones/día.
   - Al cambiar el tamaño: la botella se llena y la grilla de puntos escala
     (cada punto = dotUnit atomizaciones; rellenos = seguras, contorno = hasta máx).
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
    var perDayInput = root.querySelector('[data-dc-slider]');
    var perDayOut = root.querySelector('[data-dc-perday]');
    var sizeBtns = root.querySelectorAll('[data-dc-size]');
    var elTotal = root.querySelector('[data-dc-total]');
    var elWeeks = root.querySelector('[data-dc-weeks]');
    var elPrice = root.querySelector('[data-dc-ppa]');
    var dotsEl = root.querySelector('[data-dc-dots]');
    var bottle = root.querySelector('[data-dc-bottle]');
    var legSure = root.querySelector('[data-dc-leg-sure]');
    var legExtra = root.querySelector('[data-dc-leg-extra]');

    var unit = Number(data.dotUnit) || 5;
    var maxMl = 0;
    for (var i = 0; i < data.sizes.length; i++) maxMl = Math.max(maxMl, Number(data.sizes[i].ml) || 0);
    if (maxMl <= 0) maxMl = 1;

    var state = { sizeIndex: 0, perDay: data.defaultPerDay || 5 };

    function rangeText(a, b, suffix) {
      a = Math.round(a); b = Math.round(b);
      if (a === b) return a + (suffix || '');
      return a + '–' + b + (suffix || '');
    }

    function renderDots(filled, total) {
      if (!dotsEl) return;
      total = Math.max(0, Math.round(total));
      filled = Math.max(0, Math.min(total, Math.round(filled)));
      // Evitar explosión de nodos.
      if (total > 160) { var k = total / 160; total = 160; filled = Math.round(filled / k); }
      dotsEl.innerHTML = '';
      var frag = document.createDocumentFragment();
      for (var i = 0; i < total; i++) {
        var d = document.createElement('span');
        d.className = 'dc-dot ' + (i < filled ? 'dc-dot--on' : 'dc-dot--off');
        frag.appendChild(d);
      }
      dotsEl.appendChild(frag);
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

      var ppaLow = price / max, ppaHigh = price / min;
      if (elPrice) {
        var lo = Math.round(ppaLow), hi = Math.round(ppaHigh);
        elPrice.textContent = (lo === hi) ? money(lo) : (money(lo) + '–' + hi.toLocaleString('es-CO'));
      }

      // Puntos: escala con el tamaño (cada punto = unit atomizaciones).
      renderDots(min / unit, max / unit);

      // Botella: fracción de llenado según el tamaño (piso 0.30 para legibilidad).
      if (bottle) {
        var frac = 0.30 + 0.70 * (ml / maxMl);
        if (frac > 1) frac = 1;
        bottle.style.setProperty('--dc-fill', (frac * 100).toFixed(1) + '%');
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

    if (legSure) legSure.textContent = unit + ' atomizaciones seguras';
    if (legExtra) legExtra.textContent = 'hasta ' + unit + ' más';

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

    // <dialog> nativo: showModal() lo pinta en el top layer (sobre todo,
    // sin importar transform/overflow de ancestros) y aporta el ::backdrop.
    function open() {
      if (!modal) return;
      if (typeof modal.showModal === 'function') modal.showModal();
      else modal.setAttribute('open', '');
    }
    function close() {
      if (!modal) return;
      if (typeof modal.close === 'function') modal.close();
      else modal.removeAttribute('open');
    }

    // Cerrar al hacer clic fuera de la tarjeta (en el backdrop).
    if (modal) {
      modal.addEventListener('click', function (e) {
        var r = modal.getBoundingClientRect();
        var inside = e.clientX >= r.left && e.clientX <= r.right &&
                     e.clientY >= r.top && e.clientY <= r.bottom;
        if (!inside) close();
      });
    }
    var closeBtns = root.querySelectorAll('[data-dc-close]');
    for (var c = 0; c < closeBtns.length; c++) closeBtns[c].addEventListener('click', close);

    // Disparador en la row de cantidad
    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'dc-trigger';
    trigger.textContent = data.triggerLabel || '¿Cuánto rinde tu decant?';
    trigger.addEventListener('click', open);

    var qty = document.querySelector('.quantity_selector');
    var placed = false;
    if (qty) {
      var row = qty.closest('.productView-moreItem') || qty.parentNode;
      if (row) { row.classList.add('dc-qty-row'); row.appendChild(trigger); placed = true; }
    }
    if (!placed) {
      var host = root.querySelector('[data-dc-trigger-fallback]') || root;
      host.appendChild(trigger);
    }

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
