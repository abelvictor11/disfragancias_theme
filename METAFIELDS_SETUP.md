# Configuración de Metafields para Colecciones

Este documento explica cómo configurar los metafields necesarios para las nuevas funcionalidades de **Banner Carousel** y **Feature Cards** en las páginas de colección.

## 📋 Tabla de Contenidos

1. [Banner Carousel - Metafields](#banner-carousel---metafields)
2. [Feature Cards - Metafields](#feature-cards---metafields)
3. [Instrucciones de Configuración](#instrucciones-de-configuración)
4. [Definiciones JSON](#definiciones-json)

---

## 🎠 Banner Carousel - Metafields

El carousel de banners permite mostrar hasta **5 slides** con imágenes diferentes para desktop y mobile.

### Metafields Requeridos

| Namespace | Key | Tipo | Descripción |
|-----------|-----|------|-------------|
| `custom` | `banner_carousel_1_desktop` | `file_reference` | Imagen desktop del banner 1 |
| `custom` | `banner_carousel_1_mobile` | `file_reference` | Imagen mobile del banner 1 |
| `custom` | `banner_carousel_1_link` | `url` | URL del enlace del banner 1 |
| `custom` | `banner_carousel_2_desktop` | `file_reference` | Imagen desktop del banner 2 |
| `custom` | `banner_carousel_2_mobile` | `file_reference` | Imagen mobile del banner 2 |
| `custom` | `banner_carousel_2_link` | `url` | URL del enlace del banner 2 |
| `custom` | `banner_carousel_3_desktop` | `file_reference` | Imagen desktop del banner 3 |
| `custom` | `banner_carousel_3_mobile` | `file_reference` | Imagen mobile del banner 3 |
| `custom` | `banner_carousel_3_link` | `url` | URL del enlace del banner 3 |
| `custom` | `banner_carousel_4_desktop` | `file_reference` | Imagen desktop del banner 4 |
| `custom` | `banner_carousel_4_mobile` | `file_reference` | Imagen mobile del banner 4 |
| `custom` | `banner_carousel_4_link` | `url` | URL del enlace del banner 4 |
| `custom` | `banner_carousel_5_desktop` | `file_reference` | Imagen desktop del banner 5 |
| `custom` | `banner_carousel_5_mobile` | `file_reference` | Imagen mobile del banner 5 |
| `custom` | `banner_carousel_5_link` | `url` | URL del enlace del banner 5 |

### Recomendaciones de Imágenes

- **Desktop**: 1920x600px (mínimo 1500px de ancho)
- **Mobile**: 750x1000px (mínimo 750px de ancho)
- **Formato**: JPG o WebP para mejor rendimiento
- **Peso**: Máximo 500KB por imagen

---

## 🎴 Feature Cards - Metafields

Las feature cards permiten mostrar hasta **5 cards** con imagen, título y enlace.

### Metafields Requeridos

| Namespace | Key | Tipo | Descripción |
|-----------|-----|------|-------------|
| `custom` | `feature_card_1_image` | `file_reference` | Imagen de la card 1 |
| `custom` | `feature_card_1_title` | `single_line_text_field` | Título de la card 1 |
| `custom` | `feature_card_1_link` | `url` | URL del enlace de la card 1 |
| `custom` | `feature_card_2_image` | `file_reference` | Imagen de la card 2 |
| `custom` | `feature_card_2_title` | `single_line_text_field` | Título de la card 2 |
| `custom` | `feature_card_2_link` | `url` | URL del enlace de la card 2 |
| `custom` | `feature_card_3_image` | `file_reference` | Imagen de la card 3 |
| `custom` | `feature_card_3_title` | `single_line_text_field` | Título de la card 3 |
| `custom` | `feature_card_3_link` | `url` | URL del enlace de la card 3 |
| `custom` | `feature_card_4_image` | `file_reference` | Imagen de la card 4 |
| `custom` | `feature_card_4_title` | `single_line_text_field` | Título de la card 4 |
| `custom` | `feature_card_4_link` | `url` | URL del enlace de la card 4 |
| `custom` | `feature_card_5_image` | `file_reference` | Imagen de la card 5 |
| `custom` | `feature_card_5_title` | `single_line_text_field` | Título de la card 5 |
| `custom` | `feature_card_5_link` | `url` | URL del enlace de la card 5 |

### Recomendaciones de Imágenes

- **Tamaño**: 800x800px (formato cuadrado 1:1)
- **Formato**: JPG o WebP
- **Peso**: Máximo 300KB por imagen

---

## ⚙️ Instrucciones de Configuración

### Método 1: Configuración Manual en Shopify Admin

1. Ve a **Configuración > Metafields > Colecciones**
2. Haz clic en **Agregar definición**
3. Para cada metafield:
   - **Nombre**: Usa el nombre descriptivo (ej: "Banner Carousel 1 Desktop")
   - **Namespace y key**: Usa exactamente los valores de las tablas anteriores
   - **Tipo de contenido**: Selecciona el tipo correspondiente
   - **Validación**: Opcional, pero recomendado para URLs
4. Guarda cada definición

### Método 2: Importación Bulk (Recomendado)

Usa el archivo JSON incluido en este repositorio para importar todas las definiciones de una vez.

**Pasos:**

1. Ve a **Configuración > Metafields > Colecciones**
2. Haz clic en **Importar definiciones**
3. Sube el archivo `metafields-definitions.json`
4. Confirma la importación

### Asignar Valores a una Colección

1. Ve a **Productos > Colecciones**
2. Selecciona la colección que deseas editar
3. Desplázate hasta la sección **Metafields**
4. Completa los campos que necesites:
   - Para banners: Sube las imágenes y agrega los enlaces
   - Para cards: Sube las imágenes, escribe los títulos y agrega los enlaces
5. Guarda los cambios

**Nota:** No es necesario completar todos los metafields. Solo completa los que necesites (mínimo 1, máximo 5 de cada tipo).

---

## 📄 Definiciones JSON

### Banner Carousel Metafields

```json
{
  "metafields": [
    {
      "namespace": "custom",
      "key": "banner_carousel_1_desktop",
      "name": "Banner Carousel 1 - Desktop",
      "description": "Imagen desktop del primer banner del carousel (1920x600px recomendado)",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_1_mobile",
      "name": "Banner Carousel 1 - Mobile",
      "description": "Imagen mobile del primer banner del carousel (750x1000px recomendado)",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_1_link",
      "name": "Banner Carousel 1 - Link",
      "description": "URL del enlace del primer banner",
      "type": "url"
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_2_desktop",
      "name": "Banner Carousel 2 - Desktop",
      "description": "Imagen desktop del segundo banner del carousel",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_2_mobile",
      "name": "Banner Carousel 2 - Mobile",
      "description": "Imagen mobile del segundo banner del carousel",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_2_link",
      "name": "Banner Carousel 2 - Link",
      "description": "URL del enlace del segundo banner",
      "type": "url"
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_3_desktop",
      "name": "Banner Carousel 3 - Desktop",
      "description": "Imagen desktop del tercer banner del carousel",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_3_mobile",
      "name": "Banner Carousel 3 - Mobile",
      "description": "Imagen mobile del tercer banner del carousel",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_3_link",
      "name": "Banner Carousel 3 - Link",
      "description": "URL del enlace del tercer banner",
      "type": "url"
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_4_desktop",
      "name": "Banner Carousel 4 - Desktop",
      "description": "Imagen desktop del cuarto banner del carousel",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_4_mobile",
      "name": "Banner Carousel 4 - Mobile",
      "description": "Imagen mobile del cuarto banner del carousel",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_4_link",
      "name": "Banner Carousel 4 - Link",
      "description": "URL del enlace del cuarto banner",
      "type": "url"
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_5_desktop",
      "name": "Banner Carousel 5 - Desktop",
      "description": "Imagen desktop del quinto banner del carousel",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_5_mobile",
      "name": "Banner Carousel 5 - Mobile",
      "description": "Imagen mobile del quinto banner del carousel",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "banner_carousel_5_link",
      "name": "Banner Carousel 5 - Link",
      "description": "URL del enlace del quinto banner",
      "type": "url"
    }
  ]
}
```

### Feature Cards Metafields

```json
{
  "metafields": [
    {
      "namespace": "custom",
      "key": "feature_card_1_image",
      "name": "Feature Card 1 - Imagen",
      "description": "Imagen de la primera card (800x800px recomendado)",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "feature_card_1_title",
      "name": "Feature Card 1 - Título",
      "description": "Título de la primera card",
      "type": "single_line_text_field"
    },
    {
      "namespace": "custom",
      "key": "feature_card_1_link",
      "name": "Feature Card 1 - Link",
      "description": "URL del enlace de la primera card",
      "type": "url"
    },
    {
      "namespace": "custom",
      "key": "feature_card_2_image",
      "name": "Feature Card 2 - Imagen",
      "description": "Imagen de la segunda card",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "feature_card_2_title",
      "name": "Feature Card 2 - Título",
      "description": "Título de la segunda card",
      "type": "single_line_text_field"
    },
    {
      "namespace": "custom",
      "key": "feature_card_2_link",
      "name": "Feature Card 2 - Link",
      "description": "URL del enlace de la segunda card",
      "type": "url"
    },
    {
      "namespace": "custom",
      "key": "feature_card_3_image",
      "name": "Feature Card 3 - Imagen",
      "description": "Imagen de la tercera card",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "feature_card_3_title",
      "name": "Feature Card 3 - Título",
      "description": "Título de la tercera card",
      "type": "single_line_text_field"
    },
    {
      "namespace": "custom",
      "key": "feature_card_3_link",
      "name": "Feature Card 3 - Link",
      "description": "URL del enlace de la tercera card",
      "type": "url"
    },
    {
      "namespace": "custom",
      "key": "feature_card_4_image",
      "name": "Feature Card 4 - Imagen",
      "description": "Imagen de la cuarta card",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "feature_card_4_title",
      "name": "Feature Card 4 - Título",
      "description": "Título de la cuarta card",
      "type": "single_line_text_field"
    },
    {
      "namespace": "custom",
      "key": "feature_card_4_link",
      "name": "Feature Card 4 - Link",
      "description": "URL del enlace de la cuarta card",
      "type": "url"
    },
    {
      "namespace": "custom",
      "key": "feature_card_5_image",
      "name": "Feature Card 5 - Imagen",
      "description": "Imagen de la quinta card",
      "type": "file_reference",
      "validations": {
        "file_type_options": ["image"]
      }
    },
    {
      "namespace": "custom",
      "key": "feature_card_5_title",
      "name": "Feature Card 5 - Título",
      "description": "Título de la quinta card",
      "type": "single_line_text_field"
    },
    {
      "namespace": "custom",
      "key": "feature_card_5_link",
      "name": "Feature Card 5 - Link",
      "description": "URL del enlace de la quinta card",
      "type": "url"
    }
  ]
}
```

---

## 🎯 Uso en Templates

### Agregar las Secciones a una Colección

1. Ve al **Editor de Temas** de Shopify
2. Navega a **Colecciones > [Nombre de tu colección]**
3. Haz clic en **Agregar sección**
4. Busca y agrega:
   - **"Banner Carousel Colección"** - Para el carousel de banners
   - **"Cards de Colección"** - Para las feature cards
5. Configura las opciones de cada sección según tus necesidades
6. Guarda los cambios

### Configuración de Secciones

**Banner Carousel:**
- Activar/desactivar autoplay
- Velocidad de autoplay
- Mostrar/ocultar flechas de navegación
- Mostrar/ocultar puntos de navegación
- Ajustar espaciado

**Feature Cards:**
- Número de cards por fila (2-5)
- Estilo de card (estándar, elevado, con borde)
- Efecto hover en imágenes
- Título de sección
- Colores y tamaños de texto
- Ajustar espaciado

---

## 🔧 Troubleshooting

### Los banners no aparecen

1. Verifica que los metafields estén correctamente configurados
2. Asegúrate de haber subido al menos una imagen desktop
3. Confirma que la sección esté activada en el template
4. Revisa que el checkbox "Activar Banner Carousel" esté marcado

### Las cards no se muestran

1. Verifica que los metafields de imagen y título estén completos
2. Asegúrate de que la sección esté activada
3. Confirma que el checkbox "Activar Cards" esté marcado

### Las imágenes se ven pixeladas

1. Sube imágenes con las dimensiones recomendadas
2. Usa formato JPG o WebP de alta calidad
3. Evita imágenes muy comprimidas

---

## 📞 Soporte

Para más información o ayuda con la configuración, consulta la documentación de Shopify sobre metafields:
https://help.shopify.com/en/manual/custom-data/metafields

---

**Última actualización:** Noviembre 2025
**Versión:** 1.0.0
