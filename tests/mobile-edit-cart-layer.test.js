const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const css = fs.readFileSync(path.join(__dirname, '..', 'assets/custom.css'), 'utf8');

test('el editor de variante queda por encima del carrito únicamente en móvil', () => {
  assert.match(css, /@media \(max-width:\s*550px\)[\s\S]*cart-sidebar-show\.edit-cart-show \.halo-cart-sidebar[\s\S]*visibility:\s*hidden/);
  assert.match(css, /cart-sidebar-show\.edit-cart-show \.background-overlay[\s\S]*z-index:\s*10000000000/);
  assert.match(css, /cart-sidebar-show\.edit-cart-show \.halo-edit-cart-popup[\s\S]*z-index:\s*10000000001/);
});

test('el ajuste no altera la jerarquía del modal en desktop', () => {
  const mobileBlock = css.match(/@media \(max-width:\s*550px\) \{[\s\S]*?\n\}/);
  assert.ok(mobileBlock);
  assert.match(mobileBlock[0], /halo-edit-cart-popup/);
});
