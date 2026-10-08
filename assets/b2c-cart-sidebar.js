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
