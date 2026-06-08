# Prueba Técnica (Frontend & Backend)

Aplicación elaborada con el stack: **Frontend (Angular)** y **Backend (Spring Boot / Java)**, usando una base de datos **MySQL**.

---

## Opciones de Ejecución

1. **Docker** (Recomendada)
2. **Manual** (Desarrollo Local)

---

## Opción 1: Ejecución Automática con Docker

### Requisitos

- **Docker o Docker Engine según OS**: [Guía de instalación](https://docs.docker.com/get-started/get-docker/)

### Pasos de ejecución

1. **Descargar el archivo con el orquestador y dependencias** [deployment.rar](https://github.com/juanzb/prueba_tecnica_backend/releases/download/1.0/deployment.rar)
2. **Descomprimir y acceder a la ruta de destino**
   Al descomprimir se obtienen 2 archivos principales: `docker-compose.yml` y `migration.sql`.
3. **Abrir la terminal** en la ruta de destino donde se descomprimió:
   ```bash
   docker-compose up -d --build
   ```
4. **Acceder a la aplicación**:
   Ya se puede usar la app ingresando desde el navegador a la URL: [http://localhost:3001](http://localhost:3001)

---

## Opción 2: Instalación Manual (Desarrollo Local)

> **IMPORTANTE**
> Para que el sistema funcione correctamente con este método, **el Backend y la Base de Datos DEBEN estar montados y en ejecución ANTES** de levantar el Frontend. De otro modo, el frontend no sabrá con quién comunicarse.

### 2.1 Requisitos Previos Globales

Asegúrate de contar con las siguientes herramientas instaladas en tu equipo:

- **Node.js v24+**: [Guía de instalación](https://nodejs.org/es/download)
- **pnpm v10+**: [Guía de instalación](https://pnpm.io/es/installation)
- **Angular CLI v22+**: [Guía de instalación](https://angular.dev)
- **OpenJDK v25+**: [Guía de instalación](https://openjdk.org/install/)
- **MySQL v8+**: [Guía de instalación](https://dev.mysql.com/downloads/installer/)

---

### 2.2 Paso A: Levantar Base de Datos y Backend (Repositorio Backend)

_Debes realizar estos pasos primero para garantizar que las APIs estén disponibles._

1. **Clonar el repositorio del Backend:**
   ```bash
   git clone https://github.com/juanzb/prueba_tecnica_backend
   cd prueba_tecnica_backend
   ```
2. **Base de Datos:**
   Asegúrate de tener el servicio de MySQL activo en tu máquina y de haber creado la base de datos necesaria con las credenciales que utilice el backend en su configuración: [application.properties](https://github.com/juanzb/prueba_tecnica_backend/blob/docker-dev/src/main/resources/application.properties).

3. **Configurar las variables de entorno:**
   _(Ejemplo de configuración)_

   ```json
   {
     "MSQL_URL_STRING": "string de conexion a la DB",
     "MSQL_ROOT_PASS": "rootPassword",
     "MSQL_DB_USER": "username",
     "MSQL_DB_PASS": "password"
   }
   ```

4. **Instalar dependencias y levantar el servidor:**
   Desde la terminal en la carpeta del backend, ejecuta el Wrapper de Gradle:
   ```bash
   ./gradlew build
   ./gradlew bootRun
   ```

---

### 2.3 Paso B: Levantar Frontend (Repositorio Actual)

_Una vez que el backend esté funcionando sin problemas, puedes levantar la interfaz de usuario._

1. **Clonar el repositorio del Frontend:**
   ```bash
   git clone https://github.com/juanzb/prueba_tecnica_frontend
   cd prueba_tecnica_frontend
   ```
2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```
3. **Ejecutar en modo desarrollo:**
   ```bash
   pnpm run start:dev
   ```
4. **Acceder a la aplicación:**
   Cuando termine de compilar, abre tu navegador web y visita: [http://localhost:4200](http://localhost:4200)

---
