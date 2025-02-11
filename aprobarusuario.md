# Descripción del Pull Request

**Descripción**: Este pull request introduce varios cambios significativos en la configuración y el manejo del servidor, incluyendo refactorizaciones en el código fuente, adiciones de archivos de despliegue, y ajustes importantes en la configuración de conectividad y servicios.

**Archivos Agregados**:
- `deploy-docker-compose.yml` : Archivo para la definición de servicios con Docker Compose.
- `deploy-openshift.yaml` : Archivo para configuraciones en OpenShift.
- `deploy-paths.json` : Configuración para definir los caminos o rutas de despliegue.
- `src/config/config.default.json` : Archivo de configuración por defecto de la aplicación.

**Archivos Modificados**:
- `azure-pipelines.yml`
- `package.json`
- `server.js`
- `src/config/config.js`
- `src/services/database.js`
- `swagger.yaml`

**Archivos Eliminados**:
- Ninguno

**Detalles de Cambios**:

- **azure-pipelines.yml**: Se eliminaron las variables de entorno innecesarias y se expandió la lista de archivos a compilar, añadiendo los nuevos archivos de despliegue.

- **deploy-docker-compose.yml**: Creación de un nuevo archivo de configuración para servicios que utiliza Docker Compose para orquestación. Define imagen, variables de entorno, y recursos de despliegue.

- **deploy-openshift.yaml**: Este archivo define configuraciones para OpenShift incluyendo `ConfigMap`, `DeploymentConfig`, `Service`, `Route`, y `HorizontalPodAutoscaler`, lo que permite una gestión más robusta y flexible de los recursos en un entorno OpenShift.

- **deploy-paths.json**: Añadido para establecer diferentes rutas de la aplicación junto con sus métodos HTTP y protocolos.

- **package.json**: Se actualizaron las dependencias del proyecto incluyendo incorporación de nuevas librerías como `@sag/consulconn` y `nodemon`.

- **server.js**: Refactorización significativa del código del servidor. Se introdujo la integración con Consul para el manejo de configuraciones. El servidor ahora se inicializa de manera asíncrona para soportar mejor la configuración dinámica.

- **src/config/config.default.json**: Nuevo archivo de configuración por defecto para manejar distintas configuraciones de la base de datos y del servidor de manera local sin afectar configuraciones específicas por entorno.

- **src/config/config.js**: Importante refactorización para soportar la carga de configuraciones desde Consul y archivos locales. Las configuraciones ahora se pueden inicializar de forma dinámica y más segura.

- **src/services/database.js**: Ajustes para usar las nuevas configuraciones centralizadas y mejorar la gestión de conexión a la base de datos.

- **swagger.yaml**: Se añadieron descripciones más detalladas de los endpoints incluyendo la especificación de nuevos paths para la API. Mejora en la claridad de los mensajes de respuesta de los endpoints.

Este pull request optimiza el manejo de configuraciones, mejora la estructura del servidor y extiende el soporte de despliegue a plataformas como Docker y OpenShift, ayudando a modernizar la infraestructura de despliegue y operación de la aplicación.