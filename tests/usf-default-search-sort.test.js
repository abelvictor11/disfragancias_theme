const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');

const snippetPath = path.join(__dirname, '..', 'snippets', 'usf.liquid');
const snippet = fs.readFileSync(snippetPath, 'utf8');
const match = snippet.match(/<script data-usf-default-search-sort>([\s\S]*?)<\/script>/);

function executeInitialSort(url) {
  assert.ok(match, 'El snippet debe incluir el inicializador del orden de búsqueda');
  const parsed = new URL(url);
  let replacedUrl = null;
  const history = {
    state: { test: true },
    replaceState(state, title, nextUrl) {
      assert.deepEqual(state, { test: true });
      assert.equal(title, '');
      replacedUrl = nextUrl;
    }
  };

  vm.runInNewContext(match[1], {
    window: {
      location: {
        pathname: parsed.pathname,
        search: parsed.search,
        hash: parsed.hash
      },
      history
    },
    URLSearchParams
  });

  return replacedUrl;
}

test('una búsqueda nueva inicia en Más vendido y conserva la URL', () => {
  assert.equal(
    executeInitialSort('https://disfragancias.com/search?q=lattafa&options%5Bprefix%5D=last#productos'),
    '/search?q=lattafa&options%5Bprefix%5D=last&usf_sort=bestselling#productos'
  );
});

test('también reconoce /search/ con slash final', () => {
  assert.equal(
    executeInitialSort('https://disfragancias.com/search/?q=lattafa'),
    '/search/?q=lattafa&usf_sort=bestselling'
  );
});

test('respeta el orden seleccionado explícitamente por el usuario', () => {
  assert.equal(
    executeInitialSort('https://disfragancias.com/search?q=lattafa&usf_sort=-date'),
    null
  );
});

test('no altera colecciones ni búsquedas vacías', () => {
  assert.equal(
    executeInitialSort('https://disfragancias.com/collections/masculino?q=lattafa'),
    null
  );
  assert.equal(
    executeInitialSort('https://disfragancias.com/search?q=%20%20'),
    null
  );
});

test('el inicializador se ejecuta antes de usf-boot.js', () => {
  const initializerIndex = snippet.indexOf('data-usf-default-search-sort');
  const bootIndex = snippet.indexOf("'usf-boot.js'");
  assert.ok(initializerIndex >= 0 && initializerIndex < bootIndex);
});
