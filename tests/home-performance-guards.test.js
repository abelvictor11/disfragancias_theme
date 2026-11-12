const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const themeLayout = fs.readFileSync(path.join(root, 'layout', 'theme.liquid'), 'utf8');
const themeJs = fs.readFileSync(path.join(root, 'assets', 'theme.js'), 'utf8');
const productTabs = fs.readFileSync(path.join(root, 'sections', 'product-tab-block.liquid'), 'utf8');

test('USF only loads on collection and search pages', () => {
  assert.match(
    themeLayout,
    /if request\.page_type == 'collection' or request\.page_type == 'search'[\s\S]*?render 'usf'[\s\S]*?endif/
  );
  assert.equal((themeLayout.match(/render 'usf'/g) || []).length, 1);
});

test('server-rendered product tabs are marked loaded without an initial AJAX refresh', () => {
  assert.match(
    themeJs,
    /tabContent\.each\([\s\S]*?find\('\.products-load \.product'\)\.length[\s\S]*?addClass\('loaded'\)/
  );
  assert.match(
    themeJs,
    /if \(activeTab\.hasClass\('loaded'\)\)[\s\S]*?\$block\.addClass\('ajax-loaded'\)[\s\S]*?else[\s\S]*?halo\.doAjaxProductTabs/
  );
});

test('the first product tab renders complete cards and later tabs wait for interaction', () => {
  assert.match(
    productTabs,
    /if forloop\.first[\s\S]*?render 'product-grid-layout'[\s\S]*?else[\s\S]*?class="loading center"[\s\S]*?endif/
  );
  assert.doesNotMatch(productTabs, /render 'product-card-loading'/);
});
