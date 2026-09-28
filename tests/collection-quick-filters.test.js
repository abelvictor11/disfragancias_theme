const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function classList(initial) {
  const values = new Set(initial || []);
  return {
    contains(value) { return values.has(value); },
    toggle(value, enabled) {
      if (enabled) values.add(value);
      else values.delete(value);
    }
  };
}

test('marks a quick-filter pill active when USF selects a collection ID', () => {
  const pill = {
    classList: classList(),
    getAttribute(name) {
      return {
        'data-qf-action': 'filter',
        'data-qf-value': 'Arabe'
      }[name] || '';
    }
  };
  const facetButton = {
    classList: classList(['usf-selected']),
    querySelector(selector) {
      return selector === '.usf-label' ? { textContent: 'Arabe' } : null;
    }
  };
  const bar = {
    __qfInit: false,
    addEventListener() {},
    querySelectorAll(selector) {
      if (selector === '.qf-pill') return [pill];
      return [];
    }
  };
  const document = {
    body: { classList: classList() },
    querySelector(selector) {
      return selector === '[data-quick-filters]' ? bar : null;
    },
    querySelectorAll(selector) {
      return selector === 'button.usf-facet-value-multiple' ? [facetButton] : [];
    }
  };
  const location = {
    href: 'https://example.test/collections/masculino?uff_category_collections=469154988339',
    pathname: '/collections/masculino',
    search: '?uff_category_collections=469154988339'
  };

  const source = fs.readFileSync(
    path.join(__dirname, '..', 'assets', 'collection-quick-filters.js'),
    'utf8'
  );
  vm.runInNewContext(source, {
    URL,
    document,
    location,
    setInterval() { return 1; },
    clearInterval() {},
    setTimeout() { return 1; }
  });

  assert.equal(pill.classList.contains('is-active'), true);
});
