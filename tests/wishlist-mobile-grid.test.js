const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const css = fs.readFileSync(
  path.join(__dirname, '..', 'assets', 'component-wishlist.css'),
  'utf8'
);

test('wishlist grid columns can shrink without clipping the second card', () => {
  assert.match(
    css,
    /\.wishlist-items-display\.grid\s*{[^}]*grid-template-columns:\s*repeat\(var\(--grid-columns\),\s*minmax\(0,\s*1fr\)\);/s
  );
  assert.match(
    css,
    /\.wishlist-items-display\.grid\s*>\s*\.product\s*{[^}]*min-width:\s*0;[^}]*width:\s*100%;/s
  );
});

test('wishlist card action fits inside a two-column mobile card', () => {
  assert.match(
    css,
    /@media screen and \(max-width:\s*550px\)[\s\S]*?\.wishlist-items-display\.grid:not\(\.productList\) \.card-action \.button\s*{[^}]*min-width:\s*0;[^}]*white-space:\s*normal;/s
  );
});
