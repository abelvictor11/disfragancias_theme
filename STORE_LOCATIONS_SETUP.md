# Store Locations Cards - Guía de Configuración

## Descripción

Esta sección permite mostrar las ubicaciones de tus tiendas físicas en tarjetas atractivas con fotos de fachada/logo, dirección completa, teléfono, horarios y enlaces directos a Google Maps para "Cómo llegar".

## Características

- **Hasta 3 ubicaciones** (o más si lo deseas)
- **Diseño en grid** de 3 columnas (desktop), 2 columnas (tablet) o lista
- **Foto/logo de fachada** por cada tienda
- **Información completa**: dirección, ciudad, teléfono, horarios
- **Botón "Cómo llegar"** con enlace directo a Google Maps direcciones
- **Vista previa del mapa** en modal (opcional)
- **Responsive** para mobile y tablet
- **Animaciones** al hacer hover en las cards

## Archivos Creados

| Archivo | Descripción |
|---------|-------------|
| `sections/store-locations-cards.liquid` | Sección principal |
| `assets/component-store-locations-cards.css` | Estilos CSS |
| `snippets/icon-location.liquid` | Ícono de ubicación |
| `snippets/icon-map.liquid` | Ícono de mapa |
| `snippets/icon-expand.liquid` | Ícono de expandir |
| `snippets/icon-clock.liquid` | Ícono de reloj/horario |

## Cómo Configurar

### 1. Agregar la Sección al Home

1. Ve a **Tienda Online > Temas > Personalizar**
2. En el homepage, haz clic en **"Agregar sección"**
3. Busca **"Store Locations Cards"** en la categoría **"Store"**
4. La sección se agregará con 3 bloques de ubicación por defecto

### 2. Configurar la Sección General

En la configuración de la sección puedes personalizar:

- **Subtítulo**: Texto pequeño arriba del título (ej: "Visítanos")
- **Título**: Título principal (ej: "Nuestras Ubicaciones")
- **Descripción**: Texto descriptivo debajo del título
- **Alineación**: Izquierda, Centro o Derecha
- **Diseño de cards**: 3 columnas, 2 columnas o Lista
- **Color de fondo de cards**: Color del fondo de cada tarjeta
- **Vista previa del mapa**: Habilitar modal para ver el mapa

### 3. Configurar Cada Ubicación

Haz clic en cada bloque "Ubicación" para configurar:

#### Información Básica
- **Nombre de la tienda**: Ej: "Tienda Centro"
- **Foto / Logo de fachada**: Sube una imagen cuadrada o rectangular (400x300px recomendado)

#### Dirección
- **Dirección**: Calle y número, Ej: "Av. Principal 123"
- **Ciudad / Estado / CP**: Ej: "Ciudad de México, CDMX 01000"

#### Contacto
- **Teléfono**: Ej: "(55) 1234-5678"
- **Horario de atención**: Ej: "Lun - Vie: 9:00 - 18:00, Sáb: 10:00 - 14:00"

#### Mapa y Direcciones
- **Enlace del mapa (iframe)**: URL del iframe de Google Maps
- **Enlace para "Cómo llegar"**: Enlace corto de Google Maps para direcciones
- **Texto del botón**: Personalizar (default: "Cómo llegar")

## Cómo Obtener los Enlaces de Google Maps

### Enlace para "Cómo llegar" (más importante)

1. Ve a [Google Maps](https://maps.google.com)
2. Busca tu ubicación
3. Haz clic en tu negocio/ubicación
4. Click en el botón **"Compartir"**
5. Selecciona **"Enlace corto"**
6. Copia el enlace (ej: `https://goo.gl/maps/xxxxx`)
7. Pégalo en el campo **"Enlace para 'Cómo llegar'"**

### Enlace para Vista Previa del Mapa (opcional)

Si quieres habilitar el modal con vista previa del mapa:

1. Ve a [Google Maps](https://maps.google.com)
2. Busca tu ubicación
3. Click en **"Compartir"**
4. Selecciona **"Insertar un mapa"**
5. Copia el código HTML del iframe
6. Extrae solo la URL del atributo `src` del iframe
   - Ejemplo del código: `<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
   - Extrae solo: `https://www.google.com/maps/embed?pb=...`
7. Pégalo en el campo **"Enlace del mapa (iframe URL)"**

**Nota**: El enlace de iframe debe comenzar con `https://www.google.com/maps/embed?pb=`

## Ejemplo de Configuración Completa

### Ubicación 1: Tienda Centro

- **Nombre**: Tienda Centro
- **Foto**: [Imagen de fachada]
- **Dirección**: Av. Insurgentes Sur 1234
- **Ciudad**: Ciudad de México, CDMX 03100
- **Teléfono**: (55) 1234-5678
- **Horario**: Lun - Vie: 10:00 - 20:00, Sáb - Dom: 10:00 - 18:00
- **Enlace cómo llegar**: `https://goo.gl/maps/xxxxx1`
- **Enlace mapa**: `https://www.google.com/maps/embed?pb=...1`

### Ubicación 2: Tienda Norte

- **Nombre**: Tienda Norte
- **Foto**: [Imagen de fachada]
- **Dirección**: Av. Universidad 567
- **Ciudad**: Ciudad de México, CDMX 04360
- **Teléfono**: (55) 8765-4321
- **Horario**: Lun - Sáb: 9:00 - 21:00
- **Enlace cómo llegar**: `https://goo.gl/maps/xxxxx2`
- **Enlace mapa**: `https://www.google.com/maps/embed?pb=...2`

### Ubicación 3: Tienda Sur

- **Nombre**: Tienda Sur
- **Foto**: [Imagen de fachada]
- **Dirección**: Calz. del Hueso 890
- **Ciudad**: Ciudad de México, CDMX 04900
- **Teléfono**: (55) 5555-9999
- **Horario**: Lun - Dom: 11:00 - 19:00
- **Enlace cómo llegar**: `https://goo.gl/maps/xxxxx3`
- **Enlace mapa**: `https://www.google.com/maps/embed?pb=...3`

## Diseños Disponibles

### 3 Columnas (Default)
- Desktop: 3 tarjetas lado a lado
- Tablet: 2 tarjetas por fila
- Mobile: 1 tarjeta por fila

### 2 Columnas
- Desktop/Tablet: 2 tarjetas por fila
- Mobile: 1 tarjeta por fila

### Lista
- Todos los dispositivos: tarjetas en formato horizontal (imagen a la izquierda, info a la derecha)

## Personalización de Estilos

Para modificar los colores o estilos, edita el archivo:
- `assets/component-store-locations-cards.css`

Variables CSS principales:
```css
--card-bg: Color de fondo de las tarjetas
--color-link: Color de los íconos y enlaces
--color-button-background: Color de fondo del botón primario
--color-button-text: Color de texto del botón primario
```

## Solución de Problemas

### El mapa no se muestra en el modal
- Verifica que la URL del iframe comience con `https://www.google.com/maps/embed?pb=`
- Asegúrate de copiar solo la URL del atributo `src`, no todo el código HTML
- Verifica que la opción "Habilitar vista previa del mapa" esté activada

### Las imágenes no se ven
- Verifica que las imágenes estén subidas correctamente
- El formato recomendado es JPG o PNG
- Tamaño recomendado: 400x300px (4:3)

### El botón "Cómo llegar" no funciona
- Asegúrate de que el enlace comience con `https://`
- El enlace debe ser el "Enlace corto" de Google Maps, no el iframe

## Soporte

Si necesitas agregar más de 3 ubicaciones o personalizar el diseño, puedes:

1. Duplicar el bloque "Ubicación" en el personalizador
2. Modificar el archivo `sections/store-locations-cards.liquid` para cambiar el layout
3. Ajustar los estilos en `assets/component-store-locations-cards.css`

## Vistas Previas

La sección incluye efectos visuales:
- **Hover en tarjeta**: Efecto de elevación y sombra
- **Hover en imagen**: Ligero zoom
- **Modal de mapa**: Animación de entrada suave
- **Scroll**: Animaciones de entrada si están habilitadas en el tema
