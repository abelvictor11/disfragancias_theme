# Más vendido como orden inicial de búsqueda

## Objetivo

Mostrar los resultados de una búsqueda nueva ordenados inicialmente por **Más vendido**, sin eliminar ni romper la opción **Relevancia** de Ultimate Search & Filter (USF).

## Restricción de USF

USF representa Relevancia mediante la ausencia del parámetro `sort`. El servicio no acepta `sort=r`. Por eso Relevance debe permanecer como primer campo en la configuración del plugin; mover Best Selling al primer lugar convierte tanto Relevancia como Más vendido en el mismo orden.

## Diseño

Antes de cargar `usf-boot.js`, el tema inspeccionará la URL. Solo cuando se cumplan todas estas condiciones agregará `usf_sort=bestselling` mediante `history.replaceState`:

- La ruta es `/search` (también se acepta la variante con barra final).
- Existe una consulta `q` con contenido.
- La URL todavía no contiene `usf_sort`.

El cambio no recarga la página, conserva el término y cualquier otro parámetro, y ocurre antes de que USF lea su estado inicial. Las colecciones, búsquedas vacías y órdenes elegidos explícitamente no se modifican.

Cuando el comprador seleccione Relevancia, USF eliminará `usf_sort` con su comportamiento nativo y ejecutará la relevancia textual real durante esa navegación. Una recarga posterior sin `usf_sort` vuelve al orden predeterminado Más vendido, que es el comportamiento solicitado para una primera carga.

## Ubicación

La inicialización se añadirá en `snippets/usf.liquid`, inmediatamente antes de `usf-boot.js`. No se modificará `assets/usf.js` ni `assets/usf-boot.js`, porque esos archivos son administrados y reemplazados por el plugin.

## Verificación

Una prueba automatizada comprobará que la inicialización:

- aplica Best Selling a `/search?q=lattafa`;
- respeta `/search?q=lattafa&usf_sort=-date`;
- no actúa en colecciones;
- no actúa en búsquedas vacías;
- se ejecuta antes del script de arranque de USF.
