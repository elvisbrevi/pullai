# Descripción

Este Pull Request introduce múltiples cambios significativos y refactora la implementación de un servicio de validación de RUT utilizando Node.js y Express. Se mejoró la configuración de infraestructura, el manejo de entornos y la estructura del proyecto.

### Principales mejoras y cambios introducidos:
- **Dockerización**: El `Dockerfile` se ha actualizado para optimizar la configuración del entorno de ejecución. Ahora incluye la instalación de dependencias necesarias y configuración para paquetes privados.
- **Configuración centralizada**: Se añadió soporte para cargar la configuración desde Consul o desde un archivo local, dependiendo del entorno de ejecución.
- **Modularización del código**:
  - Se han creado controladores dedicados para manejar la lógica de validación de RUT.
  - Las rutas y lógica de servidor se han refactorizado hacia una arquitectura más modular.
- **Integración de API moderna**: Se integró el uso de Axios para reemplazar y eliminar el cliente de SOAP por un enfoque basado en REST.
- **Documentación de API**: Se añadió documentación swagger para las rutas de la API, mejorando el acceso a la descripción de los endpoints.
- **Automatización y Deploy**: Se introducen scripts de despliegue para Docker y OpenShift, permitiendo configuraciones de infraestructura como recurso, servicios y rutas.
- **Gestión de Logs**: Se implementó el uso de una librería de logs estándar para uniformar el registro y gestión de eventos dentro de la aplicación.

# Archivos Agregados
- `app.js`
- `config/config.default.json`
- `controllers/validar-rut-controller.js`
- `deploy-docker-compose.yml`
- `deploy-openshift.yaml`
- `deploy-paths.json`
- `routes/health-routes.js`
- `routes/validar-rut-routes.js`
- `server.js`
- `swagger.yaml`

# Archivos Modificados
- `Dockerfile`
- `README.md`
- `azure-pipelines.yml`
- `conexionDB/conn.js`
- `config/config.js`
- `package.json`

# Archivos Eliminados
- `index.js`

# Detalles de Cambios

### Dockerfile
El `Dockerfile` fue modificado para asegurar la instalación silenciosa de paquetes, optimizando la creación de imágenes y su compatibilidad.

### README.md
Se añadió un ejemplo de archivo `.env` para guiar en la configuración de entornos de desarrollo y despliegue.

### Azure Pipelines
Se realizaron ajustes en la definición de pipelines para incluir:
- Autenticación NPM de repositorios privados.
- Configuración para extraer versión del `package.json`.
- Publicación de artefactos adicionales necesarios para despliegue.

### `conexionDB/conn.js`
Se realiza una mejora en la gestión de las conexiones a la base de datos, incorporando el uso de objetos de configuración más seguros y una mejor estructura para el manejo de errores con promesas. Además, se introduce Axios para manejar solicitudes de aprobación de usuarios vía REST.

### `config/config.js`
Reemplazo de múltiples configuraciones de entorno por una única función `loadConfig` que determina si carga desde Consul o un archivo local.

### `package.json`
Corregidos y ampliados scripts y dependencias para adaptarse a la nueva estructura modular, incluyendo `nodemon` para facilitar el desarrollo.

### Nuevo Enfoque de Rutas y Controladores
- **`server.js`**: Este archivo redefine la estructura del servidor incluyendo la configuración, middleware y rutas.
- **`validar-rut-controller.js`** y **`validar-rut-routes.js`**: Implementan la lógica y el manejo de rutas RESTful para validar y aprobar RUTs.

### Swagger Documentation
El archivo `swagger.yaml` documenta los servicios expuestos, permitiendo mejor comprensión e integración por terceras partes.