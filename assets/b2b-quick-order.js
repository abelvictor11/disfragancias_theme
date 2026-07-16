/* Pedido rápido por SKU: cada fila busca el SKU contra
   /search?q=<sku>&type=product&view=b2b-sku (JSON de variantes), resuelve la
   coincidencia exacta y permite añadir todas las líneas al carrito de una vez. */
(function () {
  if (window.__b2bQuickOrderLoaded) return;
  window.__b2bQuickOrderLoaded = true;

  var currency = (window.Shopify && Shopify.currency && Shopify.currency.active) || 'COP';
  function money(cents) {
    try { return new Intl.NumberFormat('es-CO', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(cents / 100); }
    catch (e) { return '$' + Math.round(cents / 100).toLocaleString('es-CO'); }
  }
  function debounce(fn, ms) {
    var t; return function () { var a = arguments, c = this; clearTimeout(t); t = setTimeout(function () { fn.apply(c, a); }, ms); };
  }

  var cache = {};
  function lookup(sku) {
    var k = sku.toLowerCase();
    if (cache[k]) return Promise.resolve(cache[k]);
    return fetch('/search?q=' + encodeURIComponent(sku) + '&type=product&view=b2b-sku')
      .then(function (r) { return r.text(); })
      .then(function (txt) {
        var rows = [];
        try { rows = JSON.parse(txt.trim()); } catch (e) { rows = []; }
        var hit = rows.filter(function (v) { return v.sku && v.sku.toLowerCase() === k; })[0] || null;
        cache[k] = hit;
        return hit;
      })
      .catch(function () { return null; });
  }

  function initQO(root) {
    if (!root || root.__b2bQoInit) return;
    root.__b2bQoInit = true;

    var body = root.querySelector('[data-b2b-qo-body]');
    var initialRows = parseInt(root.getAttribute('data-rows')) || 5;

    function addRow() {
      var tr = document.createElement('tr');
      tr.className = 'b2b-qo__row';
      tr.innerHTML =
        '<td><input type="text" class="b2b-qo__sku" data-qo-sku placeholder="SKU" autocomplete="off" aria-label="SKU"></td>' +
        '<td class="b2b-qo__prod" data-qo-prod><span class="b2b-qo__placeholder">—</span></td>' +
        '<td class="ta-r b2b-qo__price" data-qo-price>—</td>' +
        '<td class="ta-c"><input type="number" class="b2b-qty" min="0" step="1" value="0" data-qo-qty aria-label="Cantidad" disabled></td>' +
        '<td class="ta-r" data-qo-sub>' + money(0) + '</td>' +
        '<td class="ta-c"><button type="button" class="b2b-qo__del" data-qo-del aria-label="Quitar fila">×</button></td>';
      body.appendChild(tr);
      return tr;
    }

    for (var i = 0; i < initialRows; i++) addRow();

    function rowState(tr) { return tr.__qo || (tr.__qo = { hit: null, qty: 0 }); }

    function recalc() {
      var refs = 0, units = 0, total = 0;
      body.querySelectorAll('.b2b-qo__row').forEach(function (tr) {
        var st = rowState(tr);
        var sub = st.hit ? st.qty * st.hit.price : 0;
        tr.querySelector('[data-qo-sub]').textContent = money(sub);
        if (st.hit && st.qty > 0) { refs++; units += st.qty; total += sub; }
      });
      root.querySelector('[data-b2b-qo-refs]').textContent = refs;
      root.querySelector('[data-b2b-qo-units]').textContent = units;
      root.querySelector('[data-b2b-qo-total]').textContent = money(total);
      root.querySelector('[data-b2b-qo-addall]').disabled = units === 0;
    }

    var resolveSku = debounce(function (tr) {
      var input = tr.querySelector('[data-qo-sku]');
      var sku = (input.value || '').trim();
      var st = rowState(tr);
      var prodCell = tr.querySelector('[data-qo-prod]');
      var priceCell = tr.querySelector('[data-qo-price]');
      var qtyInput = tr.querySelector('[data-qo-qty]');
      if (!sku) {
        st.hit = null; st.qty = 0;
        tr.classList.remove('is-found', 'is-error');
        prodCell.innerHTML = '<span class="b2b-qo__placeholder">—</span>';
        priceCell.textContent = '—'; qtyInput.value = 0; qtyInput.disabled = true;
        recalc(); return;
      }
      tr.classList.add('is-loading');
      lookup(sku).then(function (hit) {
        tr.classList.remove('is-loading');
        st.hit = hit;
        if (!hit) {
          tr.classList.add('is-error'); tr.classList.remove('is-found');
          prodCell.innerHTML = '<span class="b2b-qo__notfound">SKU no encontrado</span>';
          priceCell.textContent = '—'; qtyInput.value = 0; qtyInput.disabled = true; st.qty = 0;
        } else if (!hit.available) {
          tr.classList.add('is-error'); tr.classList.remove('is-found');
          prodCell.innerHTML = '<span class="b2b-qo__notfound">' + hit.product + ' — ' + hit.variant + ' (agotado)</span>';
          priceCell.textContent = money(hit.price); qtyInput.value = 0; qtyInput.disabled = true; st.qty = 0;
        } else {
          tr.classList.add('is-found'); tr.classList.remove('is-error');
          prodCell.innerHTML =
            (hit.img ? '<span class="b2b-qo__thumb"><img src="' + hit.img + '" width="34" height="34" alt=""></span>' : '') +
            '<a href="' + hit.url + '">' + hit.product + '</a> <span class="b2b-qo__variant">' + hit.variant + '</span>';
          priceCell.textContent = money(hit.price);
          qtyInput.disabled = false;
          if (st.qty === 0) { st.qty = 1; qtyInput.value = 1; }
        }
        recalc();
      });
    }, 400);

    root.addEventListener('input', function (e) {
      var tr = e.target.closest && e.target.closest('.b2b-qo__row');
      if (!tr) return;
      if (e.target.matches('[data-qo-sku]')) resolveSku(tr);
      if (e.target.matches('[data-qo-qty]')) { rowState(tr).qty = Math.max(0, parseInt(e.target.value) || 0); recalc(); }
    });

    root.addEventListener('click', function (e) {
      if (e.target.closest('[data-qo-del]')) {
        var tr = e.target.closest('.b2b-qo__row');
        if (body.querySelectorAll('.b2b-qo__row').length > 1) tr.remove(); else {
          tr.querySelector('[data-qo-sku]').value = ''; resolveSku(tr);
        }
        recalc();
      }
      if (e.target.closest('[data-b2b-qo-addrow]')) { addRow(); }
    });

    // Enter en el SKU salta a la cantidad; en cantidad, añade fila nueva.
    root.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var tr = e.target.closest && e.target.closest('.b2b-qo__row');
      if (!tr) return;
      e.preventDefault();
      if (e.target.matches('[data-qo-sku]')) { tr.querySelector('[data-qo-qty]').focus(); }
      else if (e.target.matches('[data-qo-qty]')) {
        var rows = [].slice.call(body.querySelectorAll('.b2b-qo__row'));
        var next = rows[rows.indexOf(tr) + 1] || addRow();
        next.querySelector('[data-qo-sku]').focus();
      }
    });

    root.querySelector('[data-b2b-qo-addall]').addEventListener('click', function () {
      var btn = this, items = [];
      body.querySelectorAll('.b2b-qo__row').forEach(function (tr) {
        var st = rowState(tr);
        if (st.hit && st.hit.available && st.qty > 0) items.push({ id: st.hit.id, quantity: st.qty });
      });
      if (!items.length) return;
      btn.disabled = true; btn.classList.add('is-loading');
      fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: items }) })
        .then(function (r) { if (!r.ok) return r.json().then(function (e) { throw e; }); return r.json(); })
        .then(function () { return fetch('/cart.js').then(function (r) { return r.json(); }); })
        .then(function (cart) {
          body.querySelectorAll('.b2b-qo__row').forEach(function (tr) {
            var st = rowState(tr); st.qty = 0;
            var q = tr.querySelector('[data-qo-qty]'); if (q) q.value = 0;
          });
          recalc();
          document.body.classList.add('cart-sidebar-show');
          if (window.halo && typeof window.halo.updateSidebarCart === 'function') window.halo.updateSidebarCart(cart);
          document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = cart.item_count; });
        })
        .catch(function (e) { alert((e && e.description) || 'No se pudo añadir al carrito'); })
        .then(function () { btn.classList.remove('is-loading'); recalc(); });
    });

    recalc();
  }

  function scan() { document.querySelectorAll('[data-b2b-qo]').forEach(initQO); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan();
  document.addEventListener('shopify:section:load', scan);
})();
