const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'assets/card-variant-media.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'assets/component-card.css'), 'utf8');

test('elige la botella disponible de mayor volumen y separa los decants', () => {
  assert.match(script, /function isDecantVariant\(variant\)/);
  assert.match(script, /volume !== null && volume <= 20/);
  assert.match(script, /fullVariants\.sort\(function \(a, b\)/);
  assert.match(script, /return \(volumeB \|\| 0\) - \(volumeA \|\| 0\)/);
  assert.match(script, /variant\.available !== false/);
});

test('activa el swatch existente sin modificar el plugin USF', () => {
  assert.match(script, /label\[for="size-/);
  assert.match(script, /label\.click\(\)/);
  assert.match(script, /data-primary-variant-ready/);
});

test('muestra tamaño principal y precio mínimo dinámico del decant', () => {
  assert.match(script, /card-primary-variant-size/);
  assert.match(script, /card-decant-note/);
  assert.match(script, /o decant desde/);
  assert.match(script, /Shopify\.formatMoney/);
});

test('mantiene la información compacta y apilada en móvil', () => {
  assert.match(css, /\.card-price\.card-price--primary-variant/);
  assert.match(css, /\.card-primary-variant-size/);
  assert.match(css, /\.card-decant-note/);
});
