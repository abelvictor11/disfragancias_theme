const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const baseCss = fs.readFileSync(path.join(__dirname, '..', 'assets/component-card.css'), 'utf8');
const layoutCss = fs.readFileSync(path.join(__dirname, '..', 'assets/component-card-06.css'), 'utf8');
const productTab = fs.readFileSync(path.join(__dirname, '..', 'sections/product-tab-block.liquid'), 'utf8');
const themeJs = fs.readFileSync(path.join(__dirname, '..', 'assets/theme.js'), 'utf8');

test('agrupa identidad, oferta y acciones con una escala vertical consistente', () => {
  assert.match(layoutCss, /card-vendor[\s\S]*margin-bottom:\s*4px/);
  assert.match(layoutCss, /card-acordes[\s\S]*margin-top:\s*8px;[\s\S]*margin-bottom:\s*6px/);
  assert.match(layoutCss, /card-price\.card-price--primary-variant[\s\S]*margin-top:\s*8px;[\s\S]*margin-bottom:\s*0/);
  assert.match(baseCss, /card-decant-note[\s\S]*margin:\s*4px 0 0/);
  assert.match(layoutCss, /card-information__wrapper \+ \.usf-plugin-swatchs[\s\S]*margin-top:\s*12px/);
  assert.match(layoutCss, /card-swatch\+\.card-action[\s\S]*margin-top:\s*12px/);
});

test('compacta proporcionalmente el ritmo en móvil', () => {
  assert.match(layoutCss, /@media \(max-width:\s*550px\)[\s\S]*card-acordes[\s\S]*margin-top:\s*6px/);
  assert.match(layoutCss, /@media \(max-width:\s*550px\)[\s\S]*usf-plugin-swatchs[\s\S]*margin-top:\s*10px/);
});

test('Product Tab entrega cards completas en la pestaña activa sin recarga redundante', () => {
  assert.match(productTab, /assign render_complete_cards = forloop\.first/);
  assert.match(productTab, /if render_complete_cards[\s\S]*render 'product-grid-layout'/);
  assert.match(productTab, /else[\s\S]*render 'product-card-loading'/);
  assert.match(themeJs, /activeTab\.find\('\.product-item\[data-json-product\]'\)\.length/);
  assert.match(themeJs, /activeTab\.addClass\('loaded'\)/);
  assert.match(themeJs, /halo\.productBlockSilder\(activeTab\)/);
});
