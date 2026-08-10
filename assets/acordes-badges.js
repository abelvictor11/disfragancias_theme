/*
 * Acordes principales en cards del grid de USF.
 *
 * El grid de colección/búsqueda lo renderiza la app USF desde su bundle
 * compilado (usf.js), que no podemos tocar de forma duradera. Este script,
 * 100% del tema, inyecta los badges de acordes en las cards ya renderizadas,
 * leyendo el metafield desde /products/<handle>?view=usf-data-json (que el
 * tema expone). Es idempotente: si una card ya trae .card-acordes (las cards
 * Liquid del tema), no la toca.
 */
(function () {
  var cache = {};

  function getAcordes(handle) {
    if (cache[handle]) return cache[handle];
    cache[handle] = fetch('/products/' + handle + '?view=usf-data-json', { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (t) {
        try {
          var d = JSON.parse(t);
          var a = d && d.acordes;
          if (!a) return [];
          if (!Array.isArray(a)) a = String(a).split(/[,;|]/);
          return a.map(function (x) { return String(x).trim(); }).filter(Boolean).slice(0, 3);
        } catch (e) { return []; }
      })
      .catch(function () { return []; });
    return cache[handle];
  }

  function handleFromUrl(url) {
    if (!url) return '';
    var m = url.match(/\/products\/([^/?#]+)/);
    return m ? m[1] : '';
  }

  function process(wrapper) {
    if (wrapper.__acordesDone) return;
    // Card del tema (Liquid) ya trae los badges: no duplicar.
    if (wrapper.querySelector('.card-acordes')) { wrapper.__acordesDone = true; return; }
    var heading = wrapper.querySelector('h3.card__heading');
    if (!heading) return;
    var link = wrapper.querySelector('[data-product-url]') || wrapper.querySelector('a[href*="/products/"]');
    var url = link && (link.getAttribute('data-product-url') || link.getAttribute('href'));
    var handle = handleFromUrl(url);
    if (!handle) return;
    wrapper.__acordesDone = true;
    getAcordes(handle).then(function (acordes) {
      if (!acordes.length) return;
      if (wrapper.querySelector('.card-acordes')) return;
      var ul = document.createElement('ul');
      ul.className = 'card-acordes list-unstyled';
      ul.setAttribute('aria-label', 'Acordes principales');
      acordes.forEach(function (a) {
        var li = document.createElement('li');
        li.className = 'card-acorde';
        li.textContent = a;
        ul.appendChild(li);
      });
      heading.insertAdjacentElement('afterend', ul);
    });
  }

  // Solo se procesan (fetch + inyección) las cards que entran al viewport,
  // no todas de golpe: en colecciones grandes (1000+ productos) hacer un fetch
  // por cada card colapsaba la página. Con IntersectionObserver el trabajo se
  // limita a lo visible.
  var io = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { io.unobserve(e.target); process(e.target); }
        });
      }, { rootMargin: '250px' })
    : null;

  function scan(root) {
    (root || document).querySelectorAll('.card-information__wrapper').forEach(function (w) {
      if (w.__acordesObserved) return;
      w.__acordesObserved = true;
      if (io) io.observe(w); else process(w);
    });
  }

  var raf;
  function scheduleScan() {
    if (raf) return;
    raf = requestAnimationFrame(function () { raf = null; scan(document); });
  }

  function init() {
    scan(document);
    // USF re-renderiza el grid al filtrar/ordenar/paginar (AJAX). Se observa
    // el grid si existe (más liviano que todo el body).
    var target = document.getElementById('CollectionProductGrid') ||
      document.querySelector('.halo-collection-content, .halo-search-content') ||
      document.body;
    var obs = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes && muts[i].addedNodes.length) { scheduleScan(); break; }
      }
    });
    obs.observe(target, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
