# Variantes de cards USF: diagnóstico y corrección

Revisión del 5 de octubre de 2026. Referencia: https://disfragancias.com/collections/arabe?usf_sort=bestselling

## Causa comprobada

Las vistas `product.usf-grid-form` y `product.usf-list-form` recorren `product_card_product.options_with_values`, pero Shopify expone `product` en estas vistas. La variable anterior pertenece a snippets de cards, no a este contexto. Como el recorrido no se ejecuta, `position` llega sin valor al formulario y al snippet `product-quick-shop-popup`.

El popup trata una posición vacía como distinta de cero y genera `selector-wrapper-2` con `data-option-index="1"` para la primera opción. En la colección publicada se observó precisamente esa estructura para `Size`, mientras los radios tenían `data-index="option1"`.

El evento `changeSwatchQuickShop` de `assets/theme.js` entra en `case 1` y busca una combinación con una primera opción inexistente. No encuentra variante y retorna antes de actualizar `[name=id]` y `[data-quickshop-price-current]`. Esto explica que el precio y el carrito conserven la primera variante.

## Cambio local

- Ambas vistas recorren las opciones y variantes de `product`.
- `position` empieza en cero; si existe una opción configurada como swatch, conserva su posición real.
- No se modificaron los bundles generados `usf.js`, `usf-boot.js` ni `usf.css`.

## Verificación

`tests/usf-form-option-position.test.js` comprueba el contexto del producto y el valor inicial de posición en ambas vistas. También ejecuta el bloque real de selección de `theme.js`: con una opción Size, índice 1 no encuentra variante; índice 0 selecciona correctamente 100 ML. Las 11 pruebas del repositorio pasan.

La suite comprueba el código y el contrato de las vistas; no renderiza Liquid en Shopify ni envía un carrito real. Los archivos corregidos aún no están publicados. Validar en un tema de prueba antes de publicar:

1. Abrir la colección de referencia a 390 px y seleccionar Emper Stallion 53 o Lattafa Yara.
2. En el selector de compra rápida, cambiar de 5 ML a 10 ML y luego a 100 ML. Confirmar precio y tamaño de la línea de carrito.
3. Repetir en vista de lista, búsqueda, después de filtrar/paginar y en escritorio.
4. Probar un producto con varias opciones y uno agotado.

## Hallazgo adicional independiente

El selector de swatches de `assets/usf.js` usa `event.preventDefault()` dentro de `selectOptionValue` sin recibir `event`. Depende de una variable global no estándar. No se identificó como causa del fallo del popup anterior y no se incluyó una intervención del bundle en esta corrección.
