/* Listado B2B de colección: toggle grilla/pedido, quick-add por talla,
   totales en vivo y añadir-todo multi-item. Se re-inicializa cuando el
   filtro/paginación del tema reemplaza el HTML de .collection (via
   MutationObserver), y sincroniza cantidad y talla entre ambas vistas. */
(function () {
  if (window.__b2bCollLoaded) return;
  window.__b2bCollLoaded = true;

  var currency = (window.Shopify && Shopify.currency && Shopify.currency.active) || 'COP';
  function money(cents) {
    try { return new Intl.NumberFormat('es-CO', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(cents / 100); }
    catch (e) { return '$' + Math.round(cents / 100).toLocaleString('es-CO'); }
  }

  function initColl(root) {
    if (!root || root.__b2bInit) return;
    root.__b2bInit = true;

    var state = {};
    function key(el) { return el.getAttribute('data-product-url'); }

    function readSize(item) {
      var sel = item.querySelector('[data-b2b-size]');
      if (!sel) return null;
      if (sel.tagName === 'SELECT') {
        var opt = sel.options[sel.selectedIndex];
        return { id: sel.value, price: parseInt(opt.getAttribute('data-price')) || 0, sku: opt.getAttribute('data-sku') || '—', available: opt.getAttribute('data-available') === 'true' };
      }
      return { id: sel.value, price: parseInt(sel.getAttribute('data-price')) || 0, sku: sel.getAttribute('data-sku') || '—', available: sel.getAttribute('data-available') === 'true' };
    }

    function itemsFor(k) {
      var esc = (window.CSS && CSS.escape) ? CSS.escape(k) : k.replace(/"/g, '\\"');
      return root.querySelectorAll('[data-b2b-item][data-product-url="' + esc + '"]');
    }

    function applyToItem(item, st) {
      var sel = item.querySelector('[data-b2b-size]');
      if (sel && sel.tagName === 'SELECT' && sel.value !== st.id) sel.value = st.id;
      var skuEl = item.querySelector('[data-b2b-sku]');
      if (skuEl) { skuEl.textContent = st.sku || '—'; skuEl.title = st.sku || ''; }
      var priceEl = item.querySelector('[data-b2b-price]'); if (priceEl) priceEl.textContent = money(st.price);
      var qtyEl = item.querySelector('[data-b2b-qty]'); if (qtyEl && (parseInt(qtyEl.value) || 0) !== st.qty) qtyEl.value = st.qty;
      var subEl = item.querySelector('[data-b2b-sub]'); if (subEl) subEl.textContent = money(st.qty * st.price);
    }

    function syncProduct(k) { itemsFor(k).forEach(function (it) { applyToItem(it, state[k]); }); }

    function recalc() {
      var refs = 0, units = 0, total = 0;
      Object.keys(state).forEach(function (k) {
        var st = state[k];
        if (st.qty > 0) { refs++; units += st.qty; total += st.qty * st.price; }
      });
      var r = root.querySelector('[data-b2b-refs]'); if (r) r.textContent = refs;
      var u = root.querySelector('[data-b2b-units]'); if (u) u.textContent = units;
      var t = root.querySelector('[data-b2b-total]'); if (t) t.textContent = money(total);
      var btn = root.querySelector('[data-b2b-addall]'); if (btn) btn.disabled = units === 0;
    }

    root.querySelectorAll('[data-b2b-view="grid"] [data-b2b-item]').forEach(function (item) {
      var sz = readSize(item);
      if (sz) state[key(item)] = { id: sz.id, price: sz.price, sku: sz.sku, available: sz.available, qty: 0 };
    });

    root.addEventListener('change', function (e) {
      var sel = e.target.closest && e.target.closest('[data-b2b-size]');
      if (!sel) return;
      var item = e.target.closest('[data-b2b-item]'); var k = key(item); var sz = readSize(item);
      state[k].id = sz.id; state[k].price = sz.price; state[k].sku = sz.sku; state[k].available = sz.available;
      syncProduct(k); recalc();
    });

    root.addEventListener('input', function (e) {
      if (!e.target.matches || !e.target.matches('[data-b2b-qty]')) return;
      var item = e.target.closest('[data-b2b-item]'); var k = key(item);
      state[k].qty = Math.max(0, parseInt(e.target.value) || 0);
      syncProduct(k); recalc();
    });

    root.addEventListener('click', function (e) {
      var plus = e.target.closest && e.target.closest('[data-b2b-plus]');
      if (!plus) return;
      var item = e.target.closest('[data-b2b-item]'); var k = key(item);
      state[k].qty = Math.max(1, state[k].qty + 1);
      syncProduct(k); recalc();
    });

    root.querySelectorAll('[data-view-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var v = btn.getAttribute('data-view-btn');
        root.querySelectorAll('[data-view-btn]').forEach(function (b) {
          var on = b === btn; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on);
        });
        root.querySelectorAll('[data-b2b-view]').forEach(function (view) {
          view.hidden = view.getAttribute('data-b2b-view') !== v;
        });
      });
    });

    var addBtn = root.querySelector('[data-b2b-addall]');
    if (addBtn) addBtn.addEventListener('click', function () {
      var items = [];
      Object.keys(state).forEach(function (k) { var st = state[k]; if (st.qty > 0) items.push({ id: parseInt(st.id), quantity: st.qty }); });
      if (!items.length) return;
      addBtn.disabled = true; addBtn.classList.add('is-loading');
      fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: items }) })
        .then(function (r) { if (!r.ok) return r.json().then(function (e) { throw e; }); return r.json(); })
        .then(function () { return fetch('/cart.js').then(function (r) { return r.json(); }); })
        .then(function (cart) {
          Object.keys(state).forEach(function (k) { state[k].qty = 0; syncProduct(k); });
          recalc();
          document.body.classList.add('cart-sidebar-show');
          if (window.halo && typeof window.halo.updateSidebarCart === 'function') window.halo.updateSidebarCart(cart);
          document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = cart.item_count; });
        })
        .catch(function (e) { alert((e && e.description) || 'No se pudo añadir al carrito'); })
        .then(function () { addBtn.classList.remove('is-loading'); recalc(); });
    });

    recalc();
  }

  // Cards B2B sueltas en sliders (recomendados / recientemente vistos):
  // el "+" añade la variante seleccionada directamente al carrito.
  function initSingles(scope) {
    (scope || document).querySelectorAll('[data-b2b-single]').forEach(function (card) {
      if (card.__b2bSingle) return;
      card.__b2bSingle = true;
      var sel = card.querySelector('[data-b2b-size]');
      function cur() {
        if (sel && sel.tagName === 'SELECT') {
          var o = sel.options[sel.selectedIndex];
          return { id: sel.value, price: parseInt(o.getAttribute('data-price')) || 0, sku: o.getAttribute('data-sku') || '—', available: o.getAttribute('data-available') === 'true' };
        }
        return { id: sel.value, price: parseInt(sel.getAttribute('data-price')) || 0, sku: sel.getAttribute('data-sku') || '—', available: sel.getAttribute('data-available') === 'true' };
      }
      if (sel && sel.tagName === 'SELECT') sel.addEventListener('change', function () {
        var c = cur();
        var sk = card.querySelector('[data-b2b-sku]'); if (sk) { sk.textContent = c.sku || '—'; sk.title = c.sku || ''; }
        var pr = card.querySelector('[data-b2b-price]'); if (pr) pr.textContent = money(c.price);
        var act = card.querySelector('[data-b2b-actions]'); if (act) act.hidden = !c.available;
      });
      var addBtn = card.querySelector('[data-b2b-single-add]');
      if (addBtn) addBtn.addEventListener('click', function () {
        var c = cur(); if (!c.available) return;
        var qtyEl = card.querySelector('[data-b2b-qty]');
        var qty = Math.max(1, parseInt(qtyEl && qtyEl.value) || 1);
        addBtn.disabled = true; addBtn.classList.add('is-loading');
        fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: parseInt(c.id), quantity: qty }] }) })
          .then(function (r) { if (!r.ok) return r.json().then(function (e) { throw e; }); return r.json(); })
          .then(function () { return fetch('/cart.js').then(function (r) { return r.json(); }); })
          .then(function (cart) {
            document.body.classList.add('cart-sidebar-show');
            if (window.halo && typeof window.halo.updateSidebarCart === 'function') window.halo.updateSidebarCart(cart);
            document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = cart.item_count; });
          })
          .catch(function (e) { alert((e && e.description) || 'No se pudo añadir al carrito'); })
          .then(function () { addBtn.disabled = false; addBtn.classList.remove('is-loading'); });
      });
    });
  }

  function scan() {
    document.querySelectorAll('[data-b2b-coll]').forEach(initColl);
    initSingles(document);
  }

  function start() {
    scan();
    var host = document.getElementById('CollectionProductGrid') || document.body;
    if (host && window.MutationObserver) {
      new MutationObserver(function () { scan(); }).observe(host, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
