/* Calculadora de duración del decant (Disfragancias). */
(function () {
  'use strict';

  function money(value) {
    var amount = Math.round(Number(value) || 0);
    try { return '$' + amount.toLocaleString('es-CO'); }
    catch (error) { return '$' + String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  }

  function normalized(value) {
    return String(value || '').toLowerCase().replace(/\s+/g, '');
  }

  function variantForSize(size, variants) {
    var wanted = normalized(size.label);
    for (var index = 0; index < variants.length; index++) {
      if (normalized(variants[index].title).indexOf(wanted) !== -1) return variants[index];
    }
    return null;
  }

  function rangeFor(size, perDay, data) {
    var minimum = (Number(size.ml) || 0) * (Number(data.atomsMin) || 15);
    var maximum = (Number(size.ml) || 0) * (Number(data.atomsMax) || 18);
    return {
      minimum: Math.max(1, Math.ceil(minimum / perDay)),
      maximum: Math.max(1, Math.floor(maximum / perDay))
    };
  }

  function rangeText(range) {
    return range.minimum === range.maximum ? String(range.minimum) : range.minimum + '–' + range.maximum;
  }

  function closestFrequency(value) {
    var options = [3, 5, 8];
    var selected = options[0];
    for (var index = 1; index < options.length; index++) {
      if (Math.abs(options[index] - value) < Math.abs(selected - value)) selected = options[index];
    }
    return selected;
  }

  function init(root) {
    var uid = root.getAttribute('data-uid');
    var dataElement = document.getElementById('decant-calc-data-' + uid);
    if (!dataElement) return;
    var data;
    try { data = JSON.parse(dataElement.textContent); } catch (error) { return; }
    if (!data.sizes || data.sizes.length < 2) return;

    var modal = root.querySelector('[data-dc-modal]');
    var frequencyButtons = root.querySelectorAll('[data-dc-frequency]');
    var sizeButtons = root.querySelectorAll('[data-dc-size]');
    var resultElements = root.querySelectorAll('[data-dc-result]');
    var barElements = root.querySelectorAll('[data-dc-bar]');
    var barDayElements = root.querySelectorAll('[data-dc-bar-days]');
    var addButton = root.querySelector('[data-dc-add]');
    var foot = root.querySelector('[data-dc-foot]');
    var state = { perDay: closestFrequency(Number(data.defaultPerDay) || 5), sizeIndex: 0 };
    var variants = data.variants || [];

    function render() {
      var ranges = [];
      var longest = 1;
      var index;
      for (index = 0; index < data.sizes.length; index++) {
        ranges[index] = rangeFor(data.sizes[index], state.perDay, data);
        longest = Math.max(longest, ranges[index].maximum);
      }

      for (index = 0; index < frequencyButtons.length; index++) {
        var frequency = Number(frequencyButtons[index].getAttribute('data-dc-frequency'));
        var frequencyActive = frequency === state.perDay;
        frequencyButtons[index].classList.toggle('is-active', frequencyActive);
        frequencyButtons[index].setAttribute('aria-pressed', frequencyActive ? 'true' : 'false');
      }

      for (index = 0; index < data.sizes.length; index++) {
        var text = rangeText(ranges[index]);
        if (resultElements[index]) resultElements[index].textContent = text;
        if (barDayElements[index]) barDayElements[index].textContent = text + ' días';
        if (barElements[index]) barElements[index].style.setProperty('--dc-scale', (ranges[index].maximum / longest).toFixed(3));

        var variant = variantForSize(data.sizes[index], variants);
        var button = sizeButtons[index];
        if (!button) continue;
        var price = button.querySelector('[data-dc-size-price]');
        if (price) price.textContent = money(variant ? variant.price / 100 : data.sizes[index].price);
        button.disabled = !variant || !variant.available;
        var sizeActive = index === state.sizeIndex;
        button.classList.toggle('is-active', sizeActive);
        button.setAttribute('aria-pressed', sizeActive ? 'true' : 'false');
      }

      var selectedVariant = variantForSize(data.sizes[state.sizeIndex], variants);
      addButton.disabled = !selectedVariant || !selectedVariant.available;
      if (foot) foot.textContent = 'Duración estimada con 0,06 ml por atomización.';
    }

    function selectFirstAvailableSize() {
      for (var index = 0; index < data.sizes.length; index++) {
        var variant = variantForSize(data.sizes[index], variants);
        if (variant && variant.available) { state.sizeIndex = index; return; }
      }
    }

    function close() {
      if (!modal) return;
      if (typeof modal.close === 'function') modal.close();
      else modal.removeAttribute('open');
    }

    function open() {
      if (!modal) return;
      if (typeof modal.showModal === 'function') modal.showModal();
      else modal.setAttribute('open', '');
    }

    for (var frequencyIndex = 0; frequencyIndex < frequencyButtons.length; frequencyIndex++) {
      frequencyButtons[frequencyIndex].addEventListener('click', function () {
        state.perDay = Number(this.getAttribute('data-dc-frequency')) || 5;
        render();
      });
    }

    for (var sizeIndex = 0; sizeIndex < sizeButtons.length; sizeIndex++) {
      (function (index) {
        sizeButtons[index].addEventListener('click', function () {
          if (this.disabled) return;
          state.sizeIndex = index;
          render();
        });
      })(sizeIndex);
    }

    addButton.addEventListener('click', function () {
      var variant = variantForSize(data.sizes[state.sizeIndex], variants);
      if (!variant || !variant.available || addButton.disabled) return;
      addButton.classList.add('is-loading');
      addButton.disabled = true;
      fetch((window.routes && window.routes.cart_add_url) || '/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ items: [{ id: variant.id, quantity: 1 }] })
      })
      .then(function (response) {
        if (!response.ok) return response.json().then(function (error) { throw error; });
        return response.json();
      })
      .then(function (result) {
        close();
        if (window.ThemeCartAPI && typeof window.ThemeCartAPI.onItemAdded === 'function') {
          window.ThemeCartAPI.onItemAdded(result);
        } else {
          window.location.href = (window.routes && window.routes.cart_url) || '/cart';
        }
      })
      .catch(function (error) {
        var message = (error && (error.description || error.message)) || 'No pudimos añadir este tamaño. Inténtalo de nuevo.';
        if (typeof window.showWarning === 'function') window.showWarning(message);
        else if (foot) foot.textContent = message;
      })
      .finally(function () {
        addButton.classList.remove('is-loading');
        render();
      });
    });

    if (modal) {
      modal.addEventListener('click', function (event) {
        var bounds = modal.getBoundingClientRect();
        var inside = event.clientX >= bounds.left && event.clientX <= bounds.right &&
          event.clientY >= bounds.top && event.clientY <= bounds.bottom;
        if (!inside) close();
      });
    }
    var closeButtons = root.querySelectorAll('[data-dc-close]');
    for (var closeIndex = 0; closeIndex < closeButtons.length; closeIndex++) closeButtons[closeIndex].addEventListener('click', close);

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'dc-trigger';
    trigger.textContent = !data.triggerLabel || data.triggerLabel === '¿Cuánto rinde tu decant?'
      ? '¿Cuánto dura tu decant?'
      : data.triggerLabel;
    trigger.addEventListener('click', open);

    var quantity = document.querySelector('.quantity_selector');
    var placed = false;
    if (quantity) {
      var row = quantity.closest('.productView-moreItem') || quantity.parentNode;
      if (row) { row.classList.add('dc-qty-row'); row.appendChild(trigger); placed = true; }
    }
    if (!placed) (root.querySelector('[data-dc-trigger-fallback]') || root).appendChild(trigger);

    selectFirstAvailableSize();
    render();
  }

  function boot() {
    var roots = document.querySelectorAll('[data-decant-calc]');
    for (var index = 0; index < roots.length; index++) init(roots[index]);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
