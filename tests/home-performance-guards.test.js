const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const themeLayout = fs.readFileSync(path.join(root, 'layout', 'theme.liquid'), 'utf8');
const spotlightSection = fs.readFileSync(path.join(root, 'sections', 'spotlight-block.liquid'), 'utf8');
const spotlightCss = fs.readFileSync(path.join(root, 'assets', 'component-spotlight-block.css'), 'utf8');

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

test('spotlight reserves Slick one-row geometry before initialization', () => {
  assert.match(
    spotlightCss,
    /\.spotlight-block\.enable_slider \.halo-row\[data-spotlight-slider\]:not\(\.slick-initialized\)[\s\S]*?flex-wrap: nowrap;[\s\S]*?overflow: hidden;/
  );
  assert.match(
    spotlightCss,
    /:not\(\.slick-initialized\) \.halo-item[\s\S]*?flex: 0 0 50%;[\s\S]*?margin-top: 0 !important;/
  );
});
