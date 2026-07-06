# TP Final - Programación Visual 2026

## Repositorio: pv_tp_integrador_grupo10

### Integrantes

| Nombre completo | Usuario de GitHub |
| :--- | :--- |
| Lucas Alvaro Flores | [LucasAFlores](https://github.com/LucasAFlores) |
| Federico Rios Marcial | [Fede-Marcial](https://github.com/Fede-Marcial) |
| Mauro Arcangel Chauque | [Mauro006](https://github.com/Mauro006) |
| Vega Brian Agustin | [mitisbroken-debug](https://github.com/mitisbroken-debug) |

## Descripción general

Esta aplicación web es una SPA desarrollada en React con Vite para la gestión y visualización de clientes, con una interfaz orientada a panel de control, autenticación simulada y navegación protegida. El proyecto combina React Bootstrap, routing, estado global y consumo de datos desde una API externa para construir una experiencia funcional y visualmente consistente.

## Estructura del proyecto

```text
pv_tp3_grupo10/
├─ index.html
├─ package.json
├─ README.md
├─ vite.config.js
├─ public/
└─ src/
   ├─ App.css
   ├─ App.jsx
   ├─ index.css
   ├─ main.jsx
   ├─ assets/
   │  ├─ hero.png
   │  ├─ react.svg
   │  └─ vite.svg
   ├─ components/
   │  ├─ common/
   │  │  ├─ BotonEliminar.jsx
   │  │  └─ FormularioCliente.jsx
   │  └─ layout/
   │     ├─ Footer.jsx
   │     └─ Header.jsx
   ├─ context/
   │  └─ AdminContext.jsx
   ├─ css/
   │  ├─ Dashboard.css
   │  ├─ DetalleCliente.css
   │  ├─ ListaCliente.css
   │  └─ login.css
   └─ views/
      ├─ Dashboard.jsx
      ├─ DetalleCliente.jsx
      ├─ ListaClientes.jsx
      └─ Login.jsx
```

## Tecnologías utilizadas

- React 19.2.7
- React DOM 19.2.7
- Vite 8.1.0
- React Router DOM 7.18.0
- React Bootstrap 2.10.10
- Bootstrap 5.3.8
- React Icons 5.6.0
- Recharts 3.9.0
- Oxlint 1.69.0

## Módulos de desarrollo

### 1. Arranque, enrutamiento y contexto global

| Módulo | Archivo(s) | Qué hicimos |
| :--- | :--- | :--- |
| Punto de entrada de la app | src/main.jsx | Monta la aplicación React con StrictMode y renderiza el componente principal App dentro del elemento root. |
| Composición general de la SPA | src/App.jsx | Define la estructura base de la interfaz, incorpora BrowserRouter, configura rutas públicas y privadas, aplica un layout común con Header y Footer, y redirige cualquier ruta no válida al dashboard. |
| Estado de sesión del administrador | src/context/AdminContext.jsx | Implementa un contexto global con useState y useEffect. Lee la sesión previa desde localStorage mediante la clave sesionAdmin, la persiste al modificar el estado y la elimina al cerrar sesión. |

### 2. Autenticación, navegación y layout principal

| Módulo | Archivo(s) | Qué hicimos |
| :--- | :--- | :--- |
| Login del panel | src/views/Login.jsx | Diseña la vista de acceso con formularios controlados con useState para nombre, contraseña y sector. Al enviar, guarda el usuario en el contexto global y navega al dashboard. |
| Cabecera de navegación | src/components/layout/Header.jsx | Renderiza el header institucional, muestra el estado de sesión activa, muestra nombre y sector del usuario autenticado y permite cerrar la sesión mediante navigate y logout. |
| Pie de página | src/components/layout/Footer.jsx | Implementa un footer estático con datos institucionales, enlaces externos y estructura responsive. |

### 3. Panel de control y métricas

| Módulo | Archivo(s) | Qué hicimos |
| :--- | :--- | :--- |
| Dashboard principal | src/views/Dashboard.jsx | Crea una vista de tipo panel de infraestructura con métricas, barras de progreso, tarjetas de rendimiento y una tabla de auditoría. Toda la información se representa desde arrays estáticos definidos en el componente, sin conexión a backend. |

### 4. Gestión de clientes

| Módulo | Archivo(s) | Qué hicimos |
| :--- | :--- | :--- |
| Listado de clientes | src/views/ListaClientes.jsx | Implementa la vista de directorio con useState para clientes, cargando, error y búsqueda. Consume la API pública FakeStore mediante fetch en useEffect, filtra resultados por nombre, apellido, email o ciudad y renderiza tarjetas con navegación al detalle. |
| Ficha de cliente | src/views/DetalleCliente.jsx | Desarrolla la vista de detalle utilizando useParams para obtener el id de la ruta, useEffect para cargar un cliente específico y estados de loading/error para manejar la respuesta. |

### 5. Componentes reutilizables y lógica de negocio

| Módulo | Archivo(s) | Qué hicimos |
| :--- | :--- | :--- |
| Formulario de registro | src/components/common/FormularioCliente.jsx | Construye un formulario reutilizable con validación de texto para nombre y apellido, select de provincias y manejo de estado a través de props. |
| Botón de eliminación | src/components/common/BotonEliminar.jsx | Implementa un botón de eliminación que verifica permisos de sector, pide confirmación con window.confirm y ejecuta una llamada DELETE a la API cuando el usuario pertenece a Gerencia. |

### 6. Estilos y recursos visuales

| Módulo | Archivo(s) | Qué hicimos |
| :--- | :--- | :--- |
| Estilos principales | src/App.css | Define utilidades generales, sombras, espaciados y reglas responsive para las vistas principales. |
| Estilos globales | src/index.css | Establece variables de color, tipografías, fondo global y estilos base para títulos, textos y formularios. |
| Estilos del login | src/css/login.css | Diseña el fondo, overlay, tarjeta glassmorphism, inputs flotantes y botones del formulario de autenticación. |
| Estilos del listado de clientes | src/css/ListaCliente.css | Define hover, tarjetas de cliente, avatar, botones de acción y barra de búsqueda. |
| Estilos del detalle de cliente | src/css/DetalleCliente.css | Establece el esquema visual oscuro de la ficha del cliente con tarjetas y contraste de texto. |
| Estilos del dashboard | src/css/Dashboard.css | Contiene estilos auxiliares para la vista de métricas y paneles del dashboard. |
| Recursos estáticos | src/assets/ | Incluye imágenes y assets base usados por la interfaz y la plantilla visual del proyecto. |

## Comportamiento agregado

- El sistema usa React Router para navegar entre login, dashboard, listado de clientes y detalle de clientes.
- El acceso a las rutas privadas está protegido por un componente RutaPrivada que valida la existencia del usuario autenticado en el contexto.
- La sesión del administrador se persiste en localStorage mediante la clave sesionAdmin, lo que permite recuperar la sesión al recargar la página.
- El estado global se concentra en AdminContext y expone login y logout para compartir la sesión entre vistas y componentes.
- La interfaz principal utiliza un esquema visual oscuro fijo, con estilos altamente personalizados y componentes de Bootstrap para la estructura responsive.
- El listado y detalle de clientes consumen datos reales de la API pública FakeStore, mientras que el dashboard muestra información estática simulada para fines de presentación.
- El botón de eliminación está condicionado al sector Gerencia y solo aparece cuando el usuario tiene permiso para ejecutarlo.

## Requisitos y ejecución

### Requisitos

- Node.js 18 o superior
- npm o pnpm

### Instalación

```bash
npm install
```

### Desarrollo local

```bash
npm run dev
```

La aplicación queda disponible normalmente en http://localhost:5173.

### Build de producción

```bash
npm run build
```

## Notas técnicas

- El proyecto no implementa un backend propio; la lógica de negocio se apoya en llamadas fetch a una API externa y en el almacenamiento local de sesión.
- No existe un switch de tema oscuro ni un modo claro alternativo; el diseño está orientado a un tema oscuro persistente.
- Los componentes FormularioCliente y BotonEliminar quedan disponibles como piezas reutilizables, aunque en la versión actual no están conectados a una vista de alta/edición de clientes.
