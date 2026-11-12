const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const themeLayout = fs.readFileSync(path.join(root, 'layout', 'theme.liquid'), 'utf8');
const spotlightSection = fs.readFileSync(path.join(root, 'sections', 'spotlight-block.liquid'), 'utf8');

test('USF only loads on collection and search pages', () => {
  assert.match(
    themeLayout,
    /if request\.page_type == 'collection' or request\.page_type == 'search'[\s\S]*?render 'usf'[\s\S]*?endif/
  );
  assert.equal((themeLayout.match(/render 'usf'/g) || []).length, 1);
});

test('spotlight styles load before first paint to prevent the mobile carousel shift', () => {
  assert.match(spotlightSection, /component-spotlight-block\.css' \| asset_url \| stylesheet_tag/);
  assert.doesNotMatch(spotlightSection, /component-spotlight-block\.css[^\n]+media="print"/);
});
