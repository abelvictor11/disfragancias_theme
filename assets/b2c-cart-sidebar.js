/* Delegated events survive AJAX replacement of .previewCart-wrapper. */
document.addEventListener('click', function (event) {
  const button = event.target.closest('[data-b2c-cart-more]');
  if (!button || !button.closest('#halo-cart-sidebar')) return;
  const list = button.previousElementSibling;
  if (!list || !list.classList.contains('previewCartList')) return;
  const expanded = list.classList.toggle('b2c-expanded');
  button.setAttribute('aria-expanded', String(expanded));
  button.textContent = expanded ? button.dataset.lessLabel : button.dataset.moreLabel;
});

/*
 * Fix cart quantity controls: the legacy UpdateQuantity constructor can throw
 * when the product policy map is unavailable for an AJAX-rendered line.
 * Capture drawer clicks before that handler and delegate the change to the
 * existing theme.js cart AJAX updater.
 */
document.addEventListener('click', function (event) {
  const control = event.target.closest('#halo-cart-sidebar cart-update-quantity .btn-quantity');
  if (!control) return;
  const container = control.closest('cart-update-quantity');
  const input = container && container.querySelector('input[data-cart-quantity]');
  if (!input) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const current = Math.max(1, parseInt(input.value, 10) || 1);
  const next = control.classList.contains('plus') ? current + 1 : Math.max(1, current - 1);
  const stock = parseInt(input.dataset.inventoryQuantity, 10);
  const policies = window['cart_selling_array_' + container.dataset.product];
  const policy = policies && policies[container.dataset.variant];
  if (Number.isFinite(stock) && stock > 0 && next > stock && policy === 'deny') return;
  if (next === current) return;
  input.value = next;
  input.dispatchEvent(new Event('change', { bubbles: true }));
}, true);
