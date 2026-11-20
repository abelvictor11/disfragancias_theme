const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const template = fs.readFileSync(path.join(__dirname, '..', 'assets/usf.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'assets/usf.css'), 'utf8');

test('mobile collections use a compact previous, status and next paginator', () => {
    assert.match(template, /v-if="usf\.isMobile" class="usf-pagination-mobile"/);
    assert.match(template, /<span>Página<\/span>[\s\S]*<strong>{{page}}<\/strong>[\s\S]*<span>de {{pagesTotal}}<\/span>/);
    assert.match(styles, /grid-template-columns:\s*44px minmax\(0, 1fr\) 44px/);
    assert.match(styles, /width:\s*min\(100%, 320px\)/);
});

test('desktop keeps numbered pagination with real fallback URLs', () => {
    assert.match(template, /<ul v-else class="pagination__list list-unstyled">/);
    assert.match(template, /:href="getPageUrl\(e\.page\)"/);
    assert.doesNotMatch(template.slice(template.indexOf('searchResultsPages:'), template.indexOf('// List view item')), /javascript:void\(0\)/);
});
