const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const css = fs.readFileSync(
  path.join(__dirname, '..', 'assets', 'custom.css'),
  'utf8'
);

test('anchors the best PUM badge to its variant card', () => {
  assert.match(
    css,
    /\.product-form__label\.product-form__card\s*{[^}]*position:\s*relative;/s
  );
  assert.match(
    css,
    /\.product-form__card \.product-form__card-best-unit\s*{[^}]*left:\s*50%;[^}]*bottom:\s*0;[^}]*transform:\s*translate\(-50%,\s*50%\);/s
  );
});

test('reserves mobile carousel space for the overlapping PUM badge', () => {
  assert.match(
    css,
    /@media \(max-width:\s*767px\)[\s\S]*?\.product-form__cards-track\s*{[^}]*padding-bottom:\s*18px;/
  );
  assert.match(
    css,
    /@media \(max-width:\s*767px\)[\s\S]*?\.product-form__card \.product-form__card-best-unit\s*{[^}]*font-size:\s*7px;/
  );
});
