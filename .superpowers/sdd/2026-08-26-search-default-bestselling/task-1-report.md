# Task 1 — Reporte

## Estado

DONE

## Archivos cambiados

- Creado: `tests/usf-default-search-sort.test.js`
- Creado: `.superpowers/sdd/2026-08-26-search-default-bestselling/task-1-report.md`
- No se modificó `snippets/usf.liquid`.

## Commit

- Prueba RED: `194bbd7` — `test(search): add red coverage for default bestselling sort`
- Reporte: se registrará en un commit documental posterior.

## Prueba

Comando ejecutado:

```bash
node --test tests/usf-default-search-sort.test.js
```

Resultado esperado y observado: fallo RED por ausencia del inicializador requerido en `snippets/usf.liquid`.

- Exit code: `1`
- Tests: `5`
- Pass: `0`
- Fail: `5`
- Mensaje principal: `El snippet debe incluir el inicializador del orden de búsqueda`
- El quinto caso también falla porque no existe `data-usf-default-search-sort` antes de `'usf-boot.js'`.

## Self-review

- La prueba usa el JavaScript real extraído de `snippets/usf.liquid` mediante `vm.runInNewContext`.
- Cubre búsqueda nueva, slash final, orden explícito, colecciones, búsqueda vacía y orden de carga.
- Los valores y mensajes requeridos se conservaron literalmente del brief.
- No se implementó el inicializador ni se modificó código de producción.
- `git diff --check` pasó sin errores.
