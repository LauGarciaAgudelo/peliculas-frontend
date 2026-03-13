
# Frontend - Sistema de Gestión de Media

Aplicación web desarrollada en **ReactJS** que consume una API REST construida con **Node.js, Express y MongoDB**.

El sistema permite administrar información relacionada con contenido multimedia, incluyendo:

- Géneros
- Directores
- Productoras
- Tipos
- Medias (películas y series)

Este proyecto fue desarrollado como parte de la asignatura **Ingeniería Web II**.

---

# Tecnologías utilizadas

- ReactJS
- React Router
- Axios
- Bootstrap
- Bootstrap Icons
- SweetAlert2
- Vite

---

# Arquitectura del proyecto

El frontend sigue una estructura modular organizada por responsabilidades.

```
src/
  api/
    axiosClient.js

  components/
    Navbar.jsx
    Footer.jsx
    PageHeader.jsx

  pages/
    genero/
      GeneroList.jsx
      GeneroForm.jsx

    director/
      DirectorList.jsx
      DirectorForm.jsx

    productora/
      ProductoraList.jsx
      ProductoraForm.jsx

    tipo/
      TipoList.jsx
      TipoForm.jsx

    media/
      MediaList.jsx
      MediaForm.jsx

    home/
      Home.jsx

  routes/
    AppRouter.jsx

  App.jsx
  main.jsx
```

---

# Descripción de carpetas

## api

Contiene la configuración de Axios para consumir la API.

```
axiosClient.js
```

Define la URL base del backend:

```
http://localhost:3000/api
```

---

## components

Componentes reutilizables en toda la aplicación.

### Navbar
Barra de navegación principal del sistema.

### Footer
Pie de página visible en todas las pantallas.

### PageHeader
Componente reutilizable para mostrar títulos y subtítulos en cada módulo.

---

## pages

Cada carpeta representa un módulo del sistema.

Cada módulo contiene:

- **List** → listado de registros
- **Form** → creación y edición

Ejemplo:

```
GeneroList.jsx
GeneroForm.jsx
```

---

## routes

Contiene la configuración de navegación de la aplicación usando **React Router**.

```
AppRouter.jsx
```

Define todas las rutas del sistema.

---

# Módulos del sistema

## Género

Permite gestionar las categorías del contenido multimedia.

Funciones:

- Crear género
- Editar género
- Eliminar género
- Listar géneros

---

## Director

Permite administrar directores asociados a las producciones.

Funciones:

- Crear director
- Editar director
- Eliminar director
- Listar directores

---

## Productora

Gestiona las empresas responsables de la producción del contenido.

Funciones:

- Crear productora
- Editar productora
- Eliminar productora
- Listar productoras

---

## Tipo

Define el tipo de contenido multimedia.

Ejemplos:

- Película
- Serie

Funciones:

- Crear tipo
- Editar tipo
- Eliminar tipo
- Listar tipos

---

## Media

Entidad principal del sistema.

Representa películas o series y mantiene relaciones con:

- Género
- Director
- Productora
- Tipo

Funciones:

- Crear media
- Editar media
- Eliminar media
- Listar medias

El **serial se genera automáticamente en el backend** según el tipo de contenido.

Ejemplo:

```
MOV-0001
MOV-0002
SER-0001
```

---

# Experiencia de usuario

El sistema incluye mejoras visuales y de usabilidad como:

- navegación con **Navbar**
- página principal **Home**
- iconos con **Bootstrap Icons**
- alertas visuales con **SweetAlert2**
- confirmación antes de eliminar registros
- vista previa de imágenes de portada
- interfaz responsive usando **Bootstrap**

---

# Instalación del proyecto

1. Clonar el repositorio

```
git clone https://github.com/LauGarciaAgudelo/peliculas-frontend
```

2. Entrar al proyecto

```
cd frontend
```

3. Instalar dependencias

```
npm install
```

4. Ejecutar el proyecto

```
npm run dev
```

---

# URL de la aplicación

```
http://localhost:5173
```

---

# Conexión con el backend

El frontend consume la API REST disponible en:

```
http://localhost:3000/api
```

Es necesario tener el backend ejecutándose para que la aplicación funcione correctamente.

---

# Autor

Proyecto desarrollado por **Laura Vanessa García Agudelo**  
Asignatura **Ingeniería Web II**
