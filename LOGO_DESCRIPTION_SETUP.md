# Configuración del Bloque Logo + Descripción

## Descripción General

El bloque **Logo + Descripción** muestra el logo de una marca junto con la descripción de la colección en un diseño horizontal (desktop) o vertical (mobile), similar al ejemplo de Creed.

## Características

- ✅ Logo de marca (SVG, PNG, JPG, etc.)
- ✅ Descripción de la colección
- ✅ Botón "texto completo" / "leer menos" para descripciones largas
- ✅ Diseño responsive (horizontal en desktop, vertical en mobile)
- ✅ Se integra como bloque dentro de `main-collection-product-grid`

## Configuración de Metafields

### 1. Crear el Metafield para el Logo

Debes crear un metafield personalizado en las colecciones para almacenar el logo de la marca:

**Configuración del Metafield:**
- **Namespace:** `custom`
- **Key:** `brand_logo`
- **Type:** `File` (permite SVG, PNG, JPG, etc.)
- **Name:** Brand Logo
- **Description:** Logo de la marca para mostrar en la sección de descripción

**Pasos en Shopify Admin:**

1. Ve a **Settings > Custom data > Collections**
2. Click en **Add definition**
3. Completa los campos:
   - Name: `Brand Logo`
   - Namespace and key: `custom.brand_logo`
   - Type: Selecciona **File**
   - Validation: (opcional) Puedes limitar a tipos de archivo específicos
4. Click en **Save**

### 2. Configurar la Descripción de la Colección

La descripción se toma automáticamente del campo **Description** de la colección. No requiere metafields adicionales.

## Uso en el Theme

### Agregar el Bloque a una Colección

1. Ve al **Theme Editor**
2. Navega a una página de colección
3. En la sección **Collection pages > Main collection**
4. Click en **Add block**
5. Selecciona **Logo + Descripción**
6. Arrastra el bloque a la posición deseada (generalmente después de Banner Carousel o Feature Cards)
7. Click en **Save**

### Configurar el Logo y Descripción

1. Ve a **Products > Collections**
2. Selecciona la colección que deseas configurar
3. En la sección de **Metafields**, busca **Brand Logo**
4. Sube el logo de la marca (SVG, PNG, JPG, etc.)
5. En el campo **Description**, escribe o edita la descripción de la colección
6. Click en **Save**

## Comportamiento

### Descripción Corta (menos de 300 caracteres)
- Se muestra completa sin botón de "texto completo"

### Descripción Larga (más de 300 caracteres)
- Se muestra colapsada (3 líneas aproximadamente)
- Aparece el botón "texto completo ▼"
- Al hacer click, se expande la descripción completa
- El botón cambia a "leer menos ▲"

## Diseño Responsive

### Desktop (> 749px)
- Layout horizontal: Logo a la izquierda (200px), descripción a la derecha
- Logo máximo: 200px de ancho, 120px de alto
- Gap entre logo y descripción: 40px

### Tablet (750px - 1024px)
- Layout horizontal: Logo a la izquierda (160px), descripción a la derecha
- Logo máximo: 160px de ancho, 100px de alto
- Gap: 30px

### Mobile (< 749px)
- Layout vertical: Logo arriba (centrado), descripción abajo
- Logo máximo: 140px de ancho, 80px de alto
- Gap: 25px
- Texto centrado

## Archivos Creados

1. **Snippet:** `/snippets/collection-logo-description-block.liquid`
2. **CSS:** `/assets/component-collection-logo-description.css`
3. **Schema:** Bloque agregado en `/sections/main-collection-product-grid.liquid`

## Ejemplo de Uso

```liquid
{%- render 'collection-logo-description-block', collection: collection -%}
```

## Notas Técnicas

- El bloque solo se renderiza si hay logo O descripción configurada
- Los SVG se manejan con `metafield_tag` para preservar la calidad vectorial
- Las imágenes (PNG, JPG) usan `srcset` para responsive images
- El JavaScript para el toggle de "leer más" se carga inline solo si es necesario
- Compatible con RTL (right-to-left) languages
- Optimizado para impresión (print styles)

## Troubleshooting

### El logo no aparece
- Verifica que el metafield `custom.brand_logo` esté creado correctamente
- Asegúrate de haber subido un archivo en el metafield de la colección
- Revisa la consola del navegador por errores

### La descripción no aparece
- Verifica que la colección tenga contenido en el campo **Description**
- El campo description debe tener texto para que se muestre

### El botón "texto completo" no funciona
- Asegúrate de que JavaScript esté habilitado en el navegador
- Revisa la consola del navegador por errores de JavaScript
- Verifica que la descripción tenga más de 300 caracteres

## Soporte

Para más información o problemas, contacta al equipo de desarrollo.
