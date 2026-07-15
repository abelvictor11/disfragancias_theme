/* Listado B2B de colección: toggle grilla/pedido, quick-add por talla,
   totales en vivo y añadir-todo multi-item. Sincroniza cantidad y talla
   entre la card (grilla) y la fila (pedido) del mismo producto. */
(function () {
  var root = document.querySelector('[data-b2b-coll]');
  if (!root) return;

  var currency = (window.Shopify && Shopify.currency && Shopify.currency.active) || 'COP';
  function money(cents) {
    try { return new Intl.NumberFormat('es-CO', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(cents / 100); }
    catch (e) { return '$' + Math.round(cents / 100).toLocaleString('es-CO'); }
  }

  // Estado por producto (clave = URL), compartido entre vistas.
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

  function applyToItem(item, st) {
    var sel = item.querySelector('[data-b2b-size]');
    if (sel && sel.tagName === 'SELECT' && sel.value !== st.id) sel.value = st.id;
    var skuEl = item.querySelector('[data-b2b-sku]'); if (skuEl) skuEl.textContent = st.sku || '—';
    var priceEl = item.querySelector('[data-b2b-price]'); if (priceEl) priceEl.textContent = money(st.price);
    var qtyEl = item.querySelector('[data-b2b-qty]'); if (qtyEl && (parseInt(qtyEl.value) || 0) !== st.qty) qtyEl.value = st.qty;
    var subEl = item.querySelector('[data-b2b-sub]'); if (subEl) subEl.textContent = money(st.qty * st.price);
  }

  function itemsFor(k) { return root.querySelectorAll('[data-b2b-item][data-product-url="' + (window.CSS && CSS.escape ? CSS.escape(k) : k) + '"]'); }

  function syncProduct(k) {
    var st = state[k];
    itemsFor(k).forEach(function (it) { applyToItem(it, st); });
  }

  function recalc() {
    var refs = 0, units = 0, total = 0;
    Object.keys(state).forEach(function (k) {
      var st = state[k];
      if (st.qty > 0) { refs++; units += st.qty; total += st.qty * st.price; }
    });
    root.querySelector('[data-b2b-refs]').textContent = refs;
    root.querySelector('[data-b2b-units]').textContent = units;
    root.querySelector('[data-b2b-total]').textContent = money(total);
    var btn = root.querySelector('[data-b2b-addall]');
    btn.disabled = units === 0;
  }

  // Inicializar estado desde el DOM (una vez por producto).
  root.querySelectorAll('[data-b2b-view="grid"] [data-b2b-item]').forEach(function (item) {
    var k = key(item), sz = readSize(item);
    state[k] = { id: sz.id, price: sz.price, sku: sz.sku, available: sz.available, qty: 0 };
  });

  root.addEventListener('change', function (e) {
    var sel = e.target.closest('[data-b2b-size]');
    if (!sel) return;
    var item = e.target.closest('[data-b2b-item]'); var k = key(item);
    var sz = readSize(item);
    state[k].id = sz.id; state[k].price = sz.price; state[k].sku = sz.sku; state[k].available = sz.available;
    syncProduct(k); recalc();
  });

  root.addEventListener('input', function (e) {
    if (!e.target.matches('[data-b2b-qty]')) return;
    var item = e.target.closest('[data-b2b-item]'); var k = key(item);
    state[k].qty = Math.max(0, parseInt(e.target.value) || 0);
    syncProduct(k); recalc();
  });

  root.addEventListener('click', function (e) {
    var plus = e.target.closest('[data-b2b-plus]');
    if (!plus) return;
    var item = e.target.closest('[data-b2b-item]'); var k = key(item);
    state[k].qty = Math.max(1, state[k].qty + 1);
    syncProduct(k); recalc();
  });

  // Toggle de vista.
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

  // Añadir todo.
  root.querySelector('[data-b2b-addall]').addEventListener('click', function () {
    var btn = this;
    var items = [];
    Object.keys(state).forEach(function (k) {
      var st = state[k];
      if (st.qty > 0) items.push({ id: parseInt(st.id), quantity: st.qty });
    });
    if (!items.length) return;
    btn.disabled = true; btn.classList.add('is-loading');
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
      .then(function () { btn.classList.remove('is-loading'); recalc(); });
  });

  recalc();
})();
