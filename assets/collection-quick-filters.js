/*
 * Filtros rápidos de colección (pills) → filtros de USF.
 *
 * Cada pill activa la faceta REAL de USF (button.usf-facet-value-multiple)
 * buscándola por su etiqueta de valor. Al accionar la faceta propia de USF,
 * el filtro se aplica sobre la colección actual (vía AJAX, sin cambiar de
 * página) y no dependemos del formato interno de URL del plugin.
 *
 *  - filter:  activa/desactiva la faceta cuyo valor coincide (ignora los
 *             valores tipo "link a colección" = usf-facet-value-single).
 *             Se pueden combinar varios (USF suma los filtros).
 *  - sort:    fija usf_sort (recarga; es un orden, no un filtro; conserva
 *             los filtros activos).
 *  - clear:   quita todos los filtros uff_ de la URL.
 *  - sidebar: abre el panel lateral con todos los filtros de USF.
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

  // Valores de filtro actualmente aplicados, leídos de la URL de USF.
  // USF codifica cada faceta como uff_<id>_...=Valor (o Valor1,Valor2).
  function activeFilterValues() {
    var out = [];
    var qs = location.search.replace(/^\?/, '');
    if (!qs) return out;
    qs.split('&').forEach(function (pair) {
      var eq = pair.indexOf('=');
      if (eq < 0) return;
      var key = pair.slice(0, eq);
      if (key.indexOf('uff_') !== 0) return;
      var val = decodeURIComponent(pair.slice(eq + 1).replace(/\+/g, ' '));
      val.split(',').forEach(function (v) { out.push(norm(v)); });
    });
    return out;
  }

  function isValueActive(value) {
    return activeFilterValues().indexOf(norm(value)) >= 0;
  }

  function currentSort() {
    var m = location.search.match(/[?&]usf_sort=([^&]+)/);
    return m ? decodeURIComponent(m[1]) : '';
  }

  function hasAnyFilter() {
    return /(^|[?&])uff_/.test(location.search);
  }

  function applyFilter(value) {
    var btn = findFilterBtn(value);
    if (btn) { btn.click(); return true; }
    // USF aún no renderiza la faceta: reintentar un momento.
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      var b = findFilterBtn(value);
      if (b) { clearInterval(iv); b.click(); }
      else if (tries > 12) { clearInterval(iv); }
    }, 300);
    return false;
  }

  function applySort(sortValue) {
    var u = new URL(location.href); // conserva los filtros uff_ activos
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

  function openSidebar() {
    // El tema tiene un handler global que cierra el drawer al hacer clic
    // fuera de [data-sidebar]/#halo-sidebar. Añadimos la clase y confiamos en
    // que el clic no llegue a ese handler (stopPropagation en el listener) y
    // en que el pill lleve data-sidebar (queda excluido del cierre).
    document.body.classList.add('open-mobile-sidebar');
  }

  function refreshActive() {
    var anyFilter = hasAnyFilter();
    var sort = currentSort();
    bar.querySelectorAll('.qf-pill').forEach(function (p) {
      var action = p.getAttribute('data-qf-action');
      var active = false;
      if (action === 'filter') active = isValueActive(p.getAttribute('data-qf-value'));
      else if (action === 'sort') active = sort === (p.getAttribute('data-qf-sort') || 'bestselling');
      else if (action === 'clear') active = !anyFilter; // "Todos" activo si no hay filtros
      p.classList.toggle('is-active', active);
    });
  }

  bar.addEventListener('click', function (e) {
    var pill = e.target.closest('.qf-pill');
    if (!pill) return;
    var action = pill.getAttribute('data-qf-action');
    if (action === 'sidebar') { e.stopPropagation(); return openSidebar(); }
    if (action === 'link') { var u = pill.getAttribute('data-qf-link'); if (u) window.location.href = u; return; }
    if (action === 'sort') return applySort(pill.getAttribute('data-qf-sort'));
    if (action === 'clear') return clearAll();
    if (action === 'filter') applyFilter(pill.getAttribute('data-qf-value'));
    // el estado activo se refresca al detectar el cambio de URL (abajo)
  });

  // Refrescar estado activo cuando USF cambia la URL (usa pushState).
  var lastUrl = location.href;
  setInterval(function () {
    if (location.href !== lastUrl) { lastUrl = location.href; refreshActive(); pruneDeadPills(); }
  }, 400);

  // Los pills se MUESTRAN por defecto. Solo cuando USF ya renderizó sus
  // facetas se OCULTAN los de filtro cuyo valor no existe en esta colección.
  // Si USF no cargó (o carga tarde), no se oculta nada: es preferible mostrar
  // de más que dejar los pills invisibles.
  function pruneDeadPills() {
    if (multiButtons().length === 0) return false; // USF aún no cargó
    bar.querySelectorAll('.qf-pill--filter').forEach(function (p) {
      var val = p.getAttribute('data-qf-value');
      if (findFilterBtn(val) || isValueActive(val)) p.classList.remove('qf-pill--hidden');
      else p.classList.add('qf-pill--hidden');
    });
    return true;
  }
  var pruneTries = 0;
  var pruneIv = setInterval(function () {
    pruneTries++;
    if (pruneDeadPills() || pruneTries > 25) clearInterval(pruneIv);
  }, 400);

  // Estado activo al cargar (refleja los filtros que ya vienen en la URL).
  refreshActive();
  // y de nuevo un momento después, por si USF ajusta la URL al inicializar.
  setTimeout(refreshActive, 800);
  setTimeout(refreshActive, 2000);
})();
