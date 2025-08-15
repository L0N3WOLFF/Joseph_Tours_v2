# Joseph Tours v2 - Sitio Web Informativo

## Resumen General del Proyecto

**Joseph Tours v2** es un sitio web moderno, responsive y bilingüe (español e inglés) desarrollado para la agencia de turismo Joseph Tours. El objetivo principal es proporcionar una plataforma informativa atractiva y fácil de usar para que los potenciales clientes puedan explorar los paquetes turísticos a las islas de San Blas, Panamá.

El sitio presenta un diseño visualmente impactante, con una galería de imágenes interactiva, descripciones detalladas de los tours, información esencial sobre la cultura Guna y la logística del viaje. La interfaz está optimizada para ofrecer una experiencia de usuario fluida tanto en dispositivos de escritorio como móviles.

**Tecnologías Clave:**
- **Framework:** React con TypeScript
- **Herramienta de Compilación:** Vite
- **Estilos:** Tailwind CSS (cargado vía CDN)
- **Despliegue:** GitHub Pages

---

## Documentación Técnica Detallada del Proyecto

### 1. Objetivo y Filosofía del Proyecto

El propósito central fue crear un sitio web estático pero dinámico en su interacción para reemplazar una presencia online anticuada. Los pilares del desarrollo fueron:

- **Mobile-First:** El diseño se concibió priorizando la experiencia en dispositivos móviles, ya que una gran parte de los turistas buscan información desde sus teléfonos.
- **Rendimiento:** Se optó por un enfoque ligero, utilizando Vite para una compilación optimizada y evitando librerías pesadas donde no eran estrictamente necesarias (ej. internacionalización).
- **Claridad Informativa:** La arquitectura del contenido se estructuró para que los usuarios encuentren fácilmente la información que buscan: qué incluye un tour, qué necesitan llevar, políticas de la empresa, etc.
- **Mantenibilidad:** El uso de TypeScript y una estructura de componentes bien definida facilita futuras actualizaciones y la corrección de errores.

### 2. Arquitectura y Pila Tecnológica

- **React (con TypeScript):** Se eligió React por su paradigma de componentización, que permite encapsular la lógica y la vista en piezas reutilizables. TypeScript añade una capa de seguridad y autocompletado, haciendo el código más robusto y fácil de refactorizar.

- **Vite:** Es el motor del proyecto. Proporciona un servidor de desarrollo con Hot Module Replacement (HMR) casi instantáneo y un proceso de compilación (`build`) altamente optimizado que empaqueta el código para producción.

- **Tailwind CSS (vía CDN):** Para agilizar el desarrollo de la interfaz, se utilizó Tailwind CSS. En lugar de escribir CSS tradicional, se aplican clases de utilidad directamente en el HTML/JSX. Se carga desde una CDN para simplificar la configuración, eliminando la necesidad de un paso de compilación de CSS (como PostCSS) en el entorno de desarrollo.

- **Internacionalización (i18n):** Se implementó una solución a medida utilizando el Context API de React. Para un sitio de esta escala, es más performante que incluir librerías completas como `i18next`. Esta solución permite cambiar de idioma de forma global y persistir la selección del usuario.

- **Despliegue (GitHub Pages):** Es una solución de hosting gratuita y eficiente para sitios estáticos. El proyecto está configurado para ser desplegado fácilmente en esta plataforma.

### 3. Estructura de Archivos Detallada

El proyecto sigue una organización lógica para separar responsabilidades:

```
/
├── components/           # Componentes reutilizables de React
│   ├── ui/               # Componentes genéricos de UI (vacío actualmente)
│   ├── AboutUs.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Gallery.tsx
│   ├── GalleryModal.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ReturnPolicy.tsx
│   ├── TourModal.tsx
│   ├── TravelInfo.tsx
│   └── TripPlanner.tsx
├── contexts/             # Context API de React para estado global
│   └── AppContext.tsx
├── lib/                  # Librerías o utilidades personalizadas
│   └── translations.ts
├── services/             # Lógica de comunicación con APIs (vacío actualmente)
│   └── geminiService.ts
├── App.tsx               # Componente raíz que ensambla la aplicación
├── index.html            # Punto de entrada HTML
├── index.tsx             # Punto de entrada de React
├── package.json          # Dependencias y scripts del proyecto
├── types.ts              # Definiciones de tipos de TypeScript
├── vite.config.ts        # Configuración de Vite
└── tsconfig.json         # Configuración de TypeScript
```

### 4. Análisis Profundo de Componentes y Lógica

#### `contexts/AppContext.tsx`
Es el cerebro del estado global de la aplicación.
- **`AppProvider`**: Componente que envuelve toda la aplicación para proveer el contexto.
- **Estado Gestionado**:
    - `language`: Almacena el idioma actual (`'es'` o `'en'`). Utiliza `localStorage` para recordar la preferencia del usuario entre visitas.
    - `isScrolled`: Un booleano que se activa cuando el usuario desplaza la página más de 10px. Es consumido por el `Header` para cambiar su estilo.
- **Función `t`**: Es la función de traducción. Se memoriza con `useMemo` para que solo se recalcule si cambia el idioma, mejorando el rendimiento. Busca la clave de texto correspondiente en el objeto `translations`.
- **Hook `useApp`**: Un hook personalizado que simplifica el acceso al contexto y lanza un error si se intenta usar fuera del `AppProvider`.

#### `lib/translations.ts`
Archivo central para todo el texto de la aplicación.
- Contiene un objeto `translations` con dos claves principales: `es` y `en`.
- `TranslationKeys`: Un tipo de TypeScript generado dinámicamente (`keyof typeof translations.es`) que asegura que todas las claves de traducción existan, previniendo errores en tiempo de compilación si una clave falta.

#### Componentes Principales (`components/`)
- **`Header.tsx`**: La barra de navegación. Es fija (`fixed`) y cambia de transparente a un fondo blanco translúcido cuando el estado `isScrolled` es `true`. Gestiona su propio estado `isMenuOpen` para el menú de hamburguesa en móviles.
- **`Hero.tsx`**: La sección principal de bienvenida. Implementa un carrusel de imágenes de fondo que cambia automáticamente cada 5 segundos mediante un `useEffect` con `setInterval`.
- **`TripPlanner.tsx`**: Muestra los paquetes de tours.
    - **Datos**: Los datos de los tours están "hardcodeados" dentro del componente, pero `useMemo` se usa para evitar que se redeclaren en cada renderizado.
    - **Filtrado**: Utiliza un estado local `activeFilter` para filtrar los tours mostrados. La lista `filteredTours` se recalcula con `useMemo` solo cuando cambia el filtro o los datos de los tours.
    - **Modal**: Gestiona el estado `selectedTour`. Cuando un usuario hace clic en "Ver Detalles", este estado se actualiza con los datos del tour, lo que provoca que el componente `TourModal` se renderice.
- **`Gallery.tsx` y `ReturnPolicy.tsx`**: Estos componentes utilizan la etiqueta nativa de HTML `<details>` y `<summary>` para crear secciones colapsables (acordeones). Esta es una técnica excelente para la accesibilidad y no requiere JavaScript para funcionar.
- **`TourModal.tsx` y `GalleryModal.tsx`**: Componentes modales que se superponen al contenido.
    - **Gestión de Cierre**: Se cierran al presionar la tecla `Escape` (manejado con un `useEffect`), al hacer clic en el botón de cierre, o al hacer clic en el fondo oscuro. El `e.stopPropagation()` en el contenedor del contenido del modal es crucial para evitar que el clic se propague al fondo y cierre el modal accidentalmente.

### 5. Proceso de Desarrollo y Despliegue

#### Configuración Inicial
1.  Clonar el repositorio.
2.  Asegurarse de tener Node.js y npm instalados.
3.  Ejecutar `npm install` en la raíz del proyecto para instalar todas las dependencias listadas en `package.json`.

#### Ejecución en Desarrollo
-   Ejecutar el comando `npm run dev`.
-   Vite iniciará un servidor de desarrollo local, típicamente en `http://localhost:5173`.
-   Gracias a HMR, cualquier cambio en el código fuente se reflejará instantáneamente en el navegador sin necesidad de recargar la página completa.

#### Compilación para Producción
-   Ejecutar el comando `npm run build`.
-   Vite compilará y optimizará todo el código (TypeScript, JSX) y los assets, generando una carpeta `dist/`.
-   Esta carpeta contiene los archivos estáticos (HTML, CSS, JS) listos para ser desplegados en un servidor web.

#### Despliegue en GitHub Pages
1.  **Configuración en `vite.config.ts`**: La propiedad `base: '/Joseph_Tours_v2/'` es fundamental. Le indica a Vite que todos los assets en producción estarán alojados bajo ese subdirectorio, correspondiente al nombre del repositorio. Sin esto, las rutas a los archivos CSS y JS se romperían.
2.  **Proceso de Despliegue**:
    a.  Después de ejecutar `npm run build`, se genera la carpeta `dist`.
    b.  El contenido de la carpeta `dist` debe ser subido a la rama `gh-pages` del repositorio en GitHub.
    c.  En la configuración del repositorio de GitHub (`Settings > Pages`), se debe seleccionar la rama `gh-pages` como la fuente de despliegue.
    d.  GitHub automáticamente publicará el sitio en la URL `https://<username>.github.io/<repository-name>/`.
