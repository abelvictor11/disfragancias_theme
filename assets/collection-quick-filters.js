/*
 * Filtros rápidos de colección (pills) → filtros de USF.
 *
 * Cada pill activa la faceta REAL de USF (button.usf-facet-value-multiple)
 * buscándola por su etiqueta de valor. Al accionar la faceta propia de USF,
 * el filtro se aplica sobre la colección actual (vía AJAX, sin cambiar de
 * página) y no dependemos del formato interno de URL del plugin.
 *
 *  - filter: activa/desactiva la faceta cuyo valor coincide (ignora los
 *            valores tipo "link a colección" = usf-facet-value-single).
 *  - sort:   fija usf_sort (recarga; es un orden, no un filtro).
 *  - clear:  quita todos los filtros uff_ de la URL.
 */
(function () {
  var bar = document.querySelector('[data-quick-filters]');
  if (!bar || bar.__qfInit) return;
  bar.__qfInit = true;

  function norm(s) { return (s || '').replace(/\s+/g, ' ').trim().toLowerCase(); }

  // Botones de faceta que SÍ combinan con la colección (multi-select).
  function multiButtons() {
    return Array.prototype.slice.call(
      document.querySelectorAll('button.usf-facet-value-multiple'));
  }

  function findFilterBtn(value) {
    var v = norm(value);
    return multiButtons().find(function (b) {
      var l = b.querySelector('.usf-label');
      return l && norm(l.textContent) === v;
    }) || null;
  }

  // ¿Está el valor aplicado actualmente? (se refleja en la URL de USF)
  function isValueActive(value) {
    var s = decodeURIComponent(location.search);
    // los filtros de USF quedan como ...=Valor (posible lista separada por coma)
    var re = new RegExp('=[^&]*(^|,|=)' + value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(,|&|$)', 'i');
    return re.test(s) || new RegExp('=' + value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(,|&|$)', 'i').test(s);
  }

  function hasAnyFilter() {
    return /(^|[?&])uff_/.test(location.search);
  }

  function applyFilter(value, pill) {
    var btn = findFilterBtn(value);
    if (btn) { btn.click(); return true; }
    // USF aún no renderiza la faceta: reintentar un momento.
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      var b = findFilterBtn(value);
      if (b) { clearInterval(iv); b.click(); }
      else if (tries > 10) { clearInterval(iv); }
    }, 300);
    return false;
  }

  function applySort(sortValue) {
    var u = new URL(location.href);
    u.searchParams.set('usf_sort', sortValue || 'bestselling');
    location.href = u.toString();
  }

  function clearAll() {
    var u = new URL(location.href);
    Array.prototype.slice.call(u.searchParams.keys()).forEach(function (k) {
      if (k.indexOf('uff_') === 0) u.searchParams.delete(k);
    });
    location.href = u.toString();
  }

  function refreshActive() {
    var pills = bar.querySelectorAll('.qf-pill');
    var anyFilter = hasAnyFilter();
    pills.forEach(function (p) {
      var action = p.getAttribute('data-qf-action');
      var val = p.getAttribute('data-qf-value');
      var active = false;
      if (action === 'filter') active = isValueActive(val);
      else if (action === 'clear') active = !anyFilter; // "Todos" activo si no hay filtros
      p.classList.toggle('is-active', active);
    });
  }

  bar.addEventListener('click', function (e) {
    var pill = e.target.closest('.qf-pill');
    if (!pill) return;
    var action = pill.getAttribute('data-qf-action');
    if (action === 'sort') return applySort(pill.getAttribute('data-qf-sort'));
    if (action === 'clear') return clearAll();
    if (action === 'filter') {
      applyFilter(pill.getAttribute('data-qf-value'), pill);
      // el estado se refresca al detectar el cambio de URL (abajo)
    }
  });

  // Refrescar estado activo cuando USF cambia la URL (usa pushState).
  var lastUrl = location.href;
  setInterval(function () {
    if (location.href !== lastUrl) { lastUrl = location.href; refreshActive(); }
  }, 500);

  // Oculta los pills de filtro cuyo valor no existe en esta colección
  // (una vez USF cargó sus facetas), para no dejar pills muertos.
  function pruneDeadPills() {
    if (multiButtons().length === 0) return false; // USF aún no cargó
    bar.querySelectorAll('.qf-pill--filter').forEach(function (p) {
      var val = p.getAttribute('data-qf-value');
      if (!findFilterBtn(val) && !isValueActive(val)) p.classList.add('qf-pill--hidden');
      else p.classList.remove('qf-pill--hidden');
    });
    return true;
  }
  var pruneTries = 0;
  var pruneIv = setInterval(function () {
    pruneTries++;
    if (pruneDeadPills() || pruneTries > 20) clearInterval(pruneIv);
  }, 400);

  refreshActive();
})();
