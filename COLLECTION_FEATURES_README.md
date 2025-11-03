# 🎨 Nuevas Funcionalidades de Colecciones

Este documento describe las nuevas funcionalidades agregadas a las páginas de colección: **Banner Carousel** y **Feature Cards**.

## 📦 Archivos Creados

### Secciones Liquid
- `/sections/collection-banner-carousel.liquid` - Carousel de banners con soporte desktop/mobile
- `/sections/collection-feature-cards.liquid` - Cards linkeables con imagen y título

### Archivos CSS
- `/assets/component-collection-banner-carousel.css` - Estilos del carousel
- `/assets/component-collection-feature-cards.css` - Estilos de las cards

### Documentación
- `METAFIELDS_SETUP.md` - Guía completa de configuración de metafields

## 🚀 Inicio Rápido

### 1. Configurar Metafields en Shopify

Ve a **Configuración > Metafields > Colecciones** y crea los siguientes metafields:

#### Para Banner Carousel (15 metafields):
- `custom.banner_carousel_1_desktop` (file_reference)
- `custom.banner_carousel_1_mobile` (file_reference)
- `custom.banner_carousel_1_link` (url)
- ... (repite para banners 2-5)

#### Para Feature Cards (15 metafields):
- `custom.feature_card_1_image` (file_reference)
- `custom.feature_card_1_title` (single_line_text_field)
- `custom.feature_card_1_link` (url)
- ... (repite para cards 2-5)

**Ver `METAFIELDS_SETUP.md` para instrucciones detalladas y definiciones JSON.**

### 2. Agregar Contenido a una Colección

1. Ve a **Productos > Colecciones**
2. Selecciona la colección que deseas editar
3. Desplázate hasta **Metafields**
4. Completa los campos según necesites:
   - **Banners**: Sube imágenes desktop/mobile y agrega enlaces
   - **Cards**: Sube imágenes, escribe títulos y agrega enlaces
5. Guarda los cambios

### 3. Las Secciones Ya Están Agregadas

✅ Las secciones ya fueron agregadas automáticamente a todos los templates de colección:
- `collection.json`
- `collection.no-usf.json`
- `collection.template_banner_adv.json`
- `collection.template_express_order.json`
- `collection.template_full_width.json`
- `collection.template_masonry.json`
- `collection.template_right_sidebar.json`

### 4. Personalizar las Secciones (Opcional)

1. Ve al **Editor de Temas**
2. Navega a **Colecciones > [Tu colección]**
3. Busca las secciones:
   - **"Banner Carousel Colección"**
   - **"Cards de Colección"**
4. Ajusta la configuración según tus necesidades

## ⚙️ Configuración de Secciones

### Banner Carousel

**Opciones disponibles:**
- ✅ Activar/desactivar la sección
- 📐 Ancho del contenedor (estándar, 1170px, 1770px, ancho completo)
- ▶️ Reproducción automática (activar/desactivar)
- ⏱️ Velocidad de autoplay (2000-10000ms)
- ◀️▶️ Mostrar flechas de navegación
- ⚫ Mostrar puntos de navegación
- 📏 Espaciado (padding superior/inferior para desktop, tablet, mobile)

**Características:**
- Soporte para imágenes diferentes en desktop y mobile
- Hasta 5 slides por colección
- Enlaces opcionales en cada banner
- Responsive automático
- Lazy loading de imágenes
- Animaciones suaves

### Feature Cards

**Opciones disponibles:**
- ✅ Activar/desactivar la sección
- 📐 Ancho del contenedor
- 🎨 Color de fondo
- 📝 Título de sección (opcional)
- 🔤 Alineación del título (izquierda, centro, derecha)
- 📊 Cards por fila (2, 3, 4 o 5)
- 🎭 Estilo de card (estándar, elevado, con borde)
- 🖼️ Efecto hover en imágenes (ninguno, zoom, fade)
- 🎨 Colores y tamaños personalizables
- 📏 Espaciado (padding superior/inferior para desktop, tablet, mobile)

**Características:**
- Hasta 5 cards por colección
- Imagen, título y enlace por card
- Grid responsive automático
- Efectos hover personalizables
- Lazy loading de imágenes
- Animaciones escalonadas

## 📱 Responsive

Ambas secciones son completamente responsive:

### Banner Carousel
- **Desktop**: Muestra imagen desktop
- **Mobile**: Muestra imagen mobile (si está disponible, sino usa desktop)
- Controles adaptativos según dispositivo

### Feature Cards
- **Desktop**: 2-5 cards por fila (según configuración)
- **Tablet**: Máximo 3 cards por fila
- **Mobile**: 2 cards por fila (1 para grids de 3+ cards en móviles pequeños)

## 🎯 Casos de Uso

### Banner Carousel
- Promociones especiales de la colección
- Destacar productos nuevos
- Banners de temporada
- Ofertas exclusivas
- Lookbooks

### Feature Cards
- Subcategorías de la colección
- Productos destacados
- Guías de estilo
- Enlaces a contenido relacionado
- Colecciones relacionadas

## 🔧 Personalización Avanzada

### Modificar Estilos CSS

Edita los archivos CSS para personalizar:
- `/assets/component-collection-banner-carousel.css`
- `/assets/component-collection-feature-cards.css`

### Modificar Funcionalidad

Edita las secciones Liquid:
- `/sections/collection-banner-carousel.liquid`
- `/sections/collection-feature-cards.liquid`

## 💡 Tips y Mejores Prácticas

### Imágenes

**Banner Carousel:**
- Desktop: 1920x600px (ratio 16:5)
- Mobile: 750x1000px (ratio 3:4)
- Formato: JPG o WebP
- Peso: Máximo 500KB

**Feature Cards:**
- Tamaño: 800x800px (ratio 1:1)
- Formato: JPG o WebP
- Peso: Máximo 300KB

### Contenido

- **Títulos**: Mantén los títulos cortos (máximo 50 caracteres)
- **Banners**: Usa imágenes de alta calidad con texto legible
- **Cards**: Usa imágenes consistentes en estilo y proporción
- **Enlaces**: Asegúrate de que todos los enlaces funcionen

### Performance

- Optimiza las imágenes antes de subirlas
- Usa WebP cuando sea posible
- No uses más de 3-4 slides en el carousel
- Limita las cards a 3-4 por colección para mejor UX

## 🐛 Troubleshooting

### Las secciones no aparecen

1. ✅ Verifica que los metafields estén configurados correctamente
2. ✅ Asegúrate de haber agregado contenido a los metafields de la colección
3. ✅ Confirma que las secciones estén activadas en el editor de temas
4. ✅ Revisa que los checkboxes "Activar" estén marcados

### Las imágenes no cargan

1. ✅ Verifica que las imágenes estén correctamente subidas
2. ✅ Confirma que el tipo de metafield sea `file_reference`
3. ✅ Asegúrate de que las imágenes no excedan 20MB

### El carousel no funciona

1. ✅ Verifica que Flickity esté cargado (usado en otras secciones del tema)
2. ✅ Revisa la consola del navegador por errores JavaScript
3. ✅ Confirma que haya al menos 1 banner configurado

### Las cards se ven desalineadas

1. ✅ Usa imágenes con la misma proporción (1:1 recomendado)
2. ✅ Ajusta el número de cards por fila en la configuración
3. ✅ Verifica el espaciado en diferentes dispositivos

## 📊 Estructura de Datos

### Metafields por Colección

```
collection.metafields.custom
├── banner_carousel_1_desktop (image)
├── banner_carousel_1_mobile (image)
├── banner_carousel_1_link (url)
├── banner_carousel_2_desktop (image)
├── banner_carousel_2_mobile (image)
├── banner_carousel_2_link (url)
├── ... (hasta banner 5)
├── feature_card_1_image (image)
├── feature_card_1_title (text)
├── feature_card_1_link (url)
├── feature_card_2_image (image)
├── feature_card_2_title (text)
├── feature_card_2_link (url)
└── ... (hasta card 5)
```

## 🔄 Actualizaciones Futuras

Posibles mejoras:
- [ ] Soporte para videos en el carousel
- [ ] Descripción en las feature cards
- [ ] Más opciones de layout
- [ ] Integración con productos
- [ ] A/B testing de banners

## 📞 Soporte

Para más información:
- Ver `METAFIELDS_SETUP.md` para configuración detallada
- Consultar documentación de Shopify sobre metafields
- Revisar código fuente de las secciones

---

**Versión:** 1.0.0  
**Fecha:** Noviembre 2025  
**Compatibilidad:** Shopify 2.0 Themes
