# Trabajo Final: Programación JavaScript Avanzado

Este proyecto forma parte de la evaluación final del módulo de JavaScript Avanzado. Consiste en un sitio web empresarial interactivo que utiliza **HTML5**, **CSS3**, **jQuery** y **AJAX** para gestionar contenido dinámico y cálculos en tiempo real.

## 🔗 Enlaces de Entrega (Obligatorio)
* **Repositorio en GitHub:** https://github.com/Aja1702/trabajo-javascript
* **Hosting en GitHub Pages:** https://aja1702.github.io/trabajo-javascript/

## 🛠️ Tecnologías Utilizadas
- **HTML5/CSS3:** Estructura semántica y diseño responsivo.
- **jQuery (v3.7.1):** Manipulación del DOM y gestión de eventos.
- **AJAX:** Carga de noticias desde un archivo JSON externo.
- **Leaflet.js:** Integración de mapa interactivo dinámico con geolocalización.

## 📁 Estructura del Proyecto
Siguiendo los estándares profesionales, el proyecto se organiza de la siguiente manera:
- `/index.html`: Portada con 4 secciones y carga de noticias vía AJAX.
- `/views/galeria.html`: Galería de imágenes dinámica (Slider de 8 imágenes).
- `/views/presupuesto.html`: Formulario con cálculo de presupuesto automático.
- `/views/contacto.html`: Ubicación con mapa dinámico y geolocalización.
- `/views/aviso-legal.html`: Página de aviso legal.
- `/views/politica-cookies.html`: Página de política de cookies.
- `/css/estilos.css`: Hoja de estilos (incluye navegación fija, layout Flexbox y diseño responsive).
- `/js/`: Archivos JavaScript separados por página:
  - `/js/index.js`: Lógica de inicio (cookies, noticias).
  - `/js/galeria.js`: Lógica del slider de galería.
  - `/js/presupuesto.js`: Lógica del formulario de presupuesto.
  - `/js/contacto.js`: Lógica del mapa con geolocalización.
- `/data/noticias.json`: Fuente de datos externa para la sección de noticias.
- `/assets/images/`: Imágenes de la galería.
- `/assets/icons/`: Iconos de redes sociales.

## 🚀 Funcionalidades Destacadas
1. **Navegación Fija:** Menú que acompaña al usuario durante el scroll y resalta la sección activa.
2. **Carga Dinámica:** Las noticias se cargan sin refrescar la página mediante `$.getJSON`.
3. **Presupuesto Inteligente:** Los costes se actualizan instantáneamente al cambiar opciones de producto, plazos o extras.
4. **Mapa Dinámico con Geolocalización:** El mapa muestra la ruta desde la ubicación del usuario hasta la oficina.
5. **Layout con Flexbox:** El footer siempre se mantiene al final de la página.
6. **Validación:** Control de errores en formularios antes del envío.

## ✒️ Autor
* **Nombre:** Arturo Jimenez A
* **Curso:** Programación JavaScript Avanzado
