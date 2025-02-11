**Descripción**

En esta actualización se ha refactorizado la aplicación para mejorar su organización, rendimiento y facilitar futuras implementaciones. Se realizaron cambios sustanciales en la estructura y configuración del proyecto, incluyendo una transición de un enfoque basado en archivos individuales hacia una arquitectura más modular y escalable. Se modificó el archivo `Dockerfile` y el flujo de despliegue mediante Azure Pipelines, además de implementar nuevas configuraciones en archivos `yaml` para Kubernetes y Docker Compose.

Se introdujeron nuevos componentes y mejoras significativas tales como:

- Se ha cambiado el punto de entrada de la aplicación hacia `app.js` desde `index.js`. Esto incluye la iniciación del servidor de aplicación y la implementación de nuevas rutas.
- El control de las configuraciones se ha centralizado en un archivo de configuración JSON, permitiendo que la aplicación cargue la configuración adecuada dependiendo del entorno, ya sea desde un archivo local o desde un servicio de administración de configuraciones (Consul en entornos de producción).
- Se ha encapsulado la funcionalidad del servidor y las rutas dentro de clases y módulos específicos (`server.js`, `status-controller.js`, entre otros) para facilitar la legibilidad y el mantenimiento.
- Se han realizado mejoras en las prácticas de seguridad y autenticación al paquete npm dentro de Azure DevOps.
- Se integró Swagger UI para documentar la API y facilitar la comprensión y uso de los endpoints disponibles.
- Se han eliminado y reemplazado controladores y rutas redundantes, migrando parte de la lógica del negocio a nuevos servicios y controladores.

**Archivos añadidos (Added Files)**

- `app.js`
- `deploy-docker-compose.yml`
- `deploy-openshift.yaml`
- `deploy-paths.json`
- `jest.config.js`
- `server.js`
- `src/config/config.default.json`
- `src/config/config.js`
- `src/controllers/status-controller.js`
- `src/middleware/index.js`
- `src/middleware/validar-campos.js`
- `src/models/error-model.js`
- `src/models/respuesta-model.js`
- `src/models/schemas-validators/status-schema.js`
- `src/models/token-model.js`
- `src/routes/health-routes.js`
- `src/routes/status-routes.js`
- `src/services/function/functions.js`
- `src/services/obtener-service.js`
- `src/test/obtener-status.test.js`
- `swagger.yaml`

**Archivos modificados (Modified Files)**

- `Dockerfile`
- `azure-pipelines.yml`
- `package.json`

**Archivos eliminados (Deleted Files)**

- `app/controls/status.js`
- `app/mailer.js`
- `app/models/status.js`
- `app/routes/routes.js`
- `config/config.js`
- `index.js`

**Detalles del cambio (Change Details)**

- **Dockerfile**: Se añadió un encabezado de comentarios para mejorar la legibilidad. Se actualizó la configuración para copiar el archivo `.npmrc` y se optimizó el comando `npm install`.

- **app.js**: Nuevo archivo que actúa como el punto de entrada principal, instanciando el servidor y exportando la instancia del servidor.

- **server.js**: Creación de la clase `Server` que encapsula la instanciación y manejo de la aplicación, configuraciones, middlewares, y ruteo.

- **azure-pipelines.yml**: Se ajustó el proceso de construcción para incluir autenticación npm, instalación de paquetes, además de copiar archivos de despliegue necesarios para la fase de construcción.

- **package.json**: Se actualizó la versión y se modificó el script de inicio al nuevo archivo principal `app.js`. Se añadieron nuevas dependencias para desarrollo y producción.

- **deploy-docker-compose.yml y deploy-openshift.yaml**: Nuevas configuraciones para definir servicios y despliegues dentro de un entorno de Docker y OpenShift.

- **src/config/config.js**: Gestión de archivos de configuración y su carga, con soporte para entornos diferentes usando un administrador de configuración como Consul.

- **src/controllers/status-controller.js y src/services/obtener-service.js**: Lógica empresaria movida y mejorada para el manejo de peticiones relacionadas con el estado del pago.

- **swagger.yaml**: Definición y documentación de los endpoints API para la nueva estructura de rutas.

Estos cambios mejoran la modularidad, escalabilidad y mantenibilidad de la aplicación, haciendo más eficiente el proceso de desarrollo y despliegue. Además, se potencializan las capacidades de integración continua facilitadas por Azure DevOps y la orquestación de servicios mediante Docker y Kubernetes.