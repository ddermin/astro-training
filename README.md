# 🚀 LASAID Demo - Astro Training

Prototipo web desarrollado con **Astro** como parte del programa de capacitación para modelar, validar y desplegar el directorio de estudiantes y sistemas de software de **LASAID**.

El proyecto integra componentes reutilizables, plantillas compartidas (`Layouts`), diseño adaptable (`Responsive Design`), colecciones de contenido (`Content Collections`) validadas con esquemas `Zod`, generación estática de rutas dinámicas (`getStaticPaths`) e interactividad del lado del cliente (filtros y búsqueda en tiempo real).

---

## 1. 🛠️ Instalación

### Requisitos previos
* **Node.js** (versión 18 o superior)
* **Git**

### Pasos de instalación
1. Clonar el repositorio desde GitHub:
   ```bash
   git clone [https://github.com/ddermin/astro-training.git](https://github.com/ddermin/astro-training.git)
   ```

2. Entrar al directorio del proyecto:
   ```bash
   cd astro-training
   ```

3. Instalar todas las dependencias necesarias:
   ```bash
   npm install
   ```

---

## 2. ▶️ Ejecución y Compilación

Desde la terminal en la raíz del proyecto, puedes utilizar los siguientes comandos según el entorno de trabajo:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con recarga en vivo en `http://localhost:4321`. |
| `npm run build` | Valida los esquemas de contenido y compila la versión optimizada de producción en la carpeta `./dist/`. |
| `npm run preview` | Levanta un servidor local para revisar y probar la compilación de producción generada en `./dist/`. |

### Flujo de verificación de producción
Para comprobar que el sitio compila sin errores antes de desplegar:
```bash
npm run build
npm run preview
```

---

## 3. 📂 Estructura del Proyecto

El proyecto sigue la arquitectura modular recomendada por Astro:

```text
astro-training/
├── dist/                          # Compilación estática de producción (generada con npm run build)
├── public/                        # Archivos estáticos públicos (iconos, recursos directos)
├── src/
│   ├── components/                # Componentes UI modulares y reutilizables
│   │   ├── Header.astro           # Encabezado principal del sitio
│   │   ├── Navigation.astro       # Menú de navegación adaptable
│   │   ├── Footer.astro           # Pie de página institucional
│   │   ├── StudentCard.astro      # Tarjeta reutilizable para estudiantes
│   │   └── SoftwareCard.astro     # Tarjeta reutilizable para sistemas de software
│   ├── content/
│   │   └── students/              # Colección de registros de estudiantes en Markdown (.md)
│   │       ├── ana-lopez.md
│   │       ├── carlos-ruiz.md
│   │       └── fernando-renteria.md
│   ├── layouts/
│   │   └── BaseLayout.astro       # Estructura HTML base compartida (<head>, Header, <slot />, Footer)
│   ├── pages/                     # Rutas del sitio web y generación de páginas
│   │   ├── index.astro            # Página de inicio (/)
│   │   ├── about.astro            # Página Acerca de (/about)
│   │   ├── contact.astro          # Página de Contacto (/contact)
│   │   ├── students.astro         # Directorio de estudiantes con filtros interactivos (/students)
│   │   ├── software.astro         # Catálogo de sistemas de software (/software)
│   │   ├── students/
│   │   │   └── [slug].astro       # Ruta dinámica para el perfil individual de cada alumno
│   │   └── software/
│   │       └── [slug].astro       # Ruta dinámica para la vista detallada de cada sistema
│   └── content.config.ts          # Configuración de Content Collections y validación con Zod
├── astro.config.mjs               # Configuración principal de Astro
├── package.json                   # Dependencias y scripts del proyecto
└── README.md                      # Documentación general del proyecto
```

---

## 4. 👨‍🎓 Procedimiento para Agregar un Estudiante

El directorio de estudiantes se alimenta automáticamente mediante **Astro Content Collections**. No es necesario modificar código HTML ni crear páginas manualmente; basta con añadir un archivo Markdown siguiendo estos pasos:

### Paso 1: Crear el archivo Markdown
1. Abre la carpeta `src/content/students/`.
2. Crea un nuevo archivo con extensión `.md` utilizando el nombre del estudiante en minúsculas y separado por guiones (este nombre definirá su URL o `slug`).
   * *Ejemplo:* `src/content/students/juan-perez.md`

### Paso 2: Definir los metadatos (Frontmatter) y contenido
Copia la siguiente estructura dentro del nuevo archivo `.md` y completa la información del estudiante:

```markdown
---
name: "Juan Pérez"
degree: "Licenciatura"
status: "active"
director: "Dr. Alberto Ramírez"
codirector: "Dra. Carmen Morales"
thesis: "Desarrollo de arquitecturas web estáticas de alto rendimiento"
repository: "[https://github.com/usuario/proyecto-tesis](https://github.com/usuario/proyecto-tesis)"
---

Escribe aquí la biografía, líneas de investigación o resumen académico del estudiante. Este texto se mostrará automáticamente en su página de perfil individual.
```

### Paso 3: Reglas de validación del esquema (`src/content.config.ts`)
Al guardar el archivo o ejecutar `npm run build`, Astro validará automáticamente los datos con **Zod** bajo las siguientes reglas:

* **Campos Obligatorios:**
  * `name` *(string)*: Nombre completo del estudiante.
  * `degree` *(string)*: Grado académico (`Licenciatura`, `Maestría` o `Doctorado`).
  * `status` *(enum)*: Estado actual. Solo acepta exactamente `"active"` (Activo) o `"graduated"` (Egresado).
  * `director` *(string)*: Nombre del director de tesis.
  * `thesis` *(string)*: Título del proyecto de tesis.
* **Campos Opcionales (se pueden omitir si no existen):**
  * `codirector` *(string, opcional)*: Nombre del codirector de tesis.
  * `repository` *(string URL, opcional)*: Enlace al repositorio del proyecto (debe ser una URL válida con `http://` o `https://`).

### Paso 4: Resultado automático
Una vez guardado el archivo:
1. Aparecerá automáticamente su tarjeta en el directorio `/students` lista para filtrarse por grado, estado o búsqueda de texto.
2. Se generará automáticamente su página individual en la ruta `/students/juan-perez`.