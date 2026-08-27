# Search Default Best Selling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer que una búsqueda nueva abra inicialmente ordenada por “Más vendido”, sin impedir que el usuario cambie a “Relevancia” ni alterar colecciones u otras URLs.

**Architecture:** Se añadirá una inicialización pequeña y síncrona en `snippets/usf.liquid`, antes de cargar `usf-boot.js`. La inicialización normalizará únicamente una URL `/search` que tenga una consulta `q` no vacía y no tenga todavía `usf_sort`, agregando `usf_sort=bestselling` mediante `history.replaceState`; USF seguirá controlando todos los cambios posteriores del selector de orden.

**Tech Stack:** Shopify Liquid, JavaScript del navegador, Node.js `node:test` y `node:vm`.

## Global Constraints

- No modificar `assets/usf.js` ni `assets/usf-boot.js`, porque el plugin USF puede sobrescribirlos.
- No recargar la página ni disparar una segunda búsqueda.
- Conservar todos los parámetros y el fragmento (`hash`) de la URL.
- Respetar cualquier `usf_sort` explícito, incluido el cambio del usuario a Relevancia.
- La opción Relevance debe quedar primero en la configuración de Sort fields de USF; el tema transforma solamente la primera entrada directa a la página.

---

### Task 1: Proteger el comportamiento con una prueba ejecutable

**Files:**
- Create: `tests/usf-default-search-sort.test.js`
- Test: `tests/usf-default-search-sort.test.js`

- [ ] **Step 1: Escribir la prueba que ejecuta el JavaScript real del snippet**

```javascript
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
```

- [ ] **Step 2: Ejecutar la prueba y comprobar que falla por ausencia del inicializador**

Run: `node --test tests/usf-default-search-sort.test.js`

Expected: FAIL con `El snippet debe incluir el inicializador del orden de búsqueda`.

---

### Task 2: Implementar el orden inicial antes del arranque de USF

**Files:**
- Modify: `snippets/usf.liquid`
- Test: `tests/usf-default-search-sort.test.js`

- [ ] **Step 1: Insertar el inicializador justo antes de `usf-boot.js`**

```liquid
<script data-usf-default-search-sort>
(function () {
    var locationObject = window.location;
    var path = locationObject.pathname.replace(/\/+$/, '');

    if (path !== '/search') return;

    var params = new URLSearchParams(locationObject.search);
    var query = params.get('q');

    if (!query || !query.trim() || params.has('usf_sort')) return;

    params.set('usf_sort', 'bestselling');
    window.history.replaceState(
        window.history.state,
        '',
        locationObject.pathname + '?' + params.toString() + locationObject.hash
    );
})();
</script>
```

- [ ] **Step 2: Ejecutar la prueba específica y comprobar que pasa**

Run: `node --test tests/usf-default-search-sort.test.js`

Expected: PASS, 5 pruebas.

- [ ] **Step 3: Ejecutar toda la suite del tema**

Run: `node --test tests/*.test.js`

Expected: PASS en todas las pruebas, sin regresiones en filtros rápidos ni PUM.

- [ ] **Step 4: Revisar el diff y validar las mutaciones críticas**

Run: `git diff --check && git diff -- snippets/usf.liquid tests/usf-default-search-sort.test.js`

Confirmar mentalmente que las pruebas fallan si se cambia `bestselling`, se omite la validación de ruta, se ignora un `usf_sort` existente o el script se mueve después de USF.

- [ ] **Step 5: Crear el commit de implementación**

```bash
git add snippets/usf.liquid tests/usf-default-search-sort.test.js
git commit -m "feat(search): iniciar resultados por más vendidos"
```

---

### Task 3: Verificar integración y preparar la entrega

**Files:**
- Verify: `snippets/usf.liquid`
- Verify: `tests/usf-default-search-sort.test.js`

- [ ] **Step 1: Confirmar el estado final de la rama**

Run: `git status --short --branch && git log --oneline -3`

Expected: árbol limpio y commits separados para especificación e implementación.

- [ ] **Step 2: Verificar manualmente en el tema de prueba**

Comprobar estos recorridos:

1. Abrir `/search?q=lattafa`: el selector muestra “Más vendido”.
2. Cambiar a “Relevancia”: los resultados se reordenan y el selector muestra “Relevancia”.
3. Cambiar a “Fecha: nuevo a antiguo”: se respeta el orden explícito.
4. Abrir una colección: no se agrega `usf_sort` automáticamente.

- [ ] **Step 3: Subir la rama y abrir una PR hacia `main`**

Run: `git push -u origin codex/search-default-bestselling`

Crear la PR con el diagnóstico, el alcance exacto y los resultados de las pruebas. No fusionar sin validación visual en el tema de prueba.
