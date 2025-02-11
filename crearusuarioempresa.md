## Descripción

Esta actualización introduce varias mejoras y nuevas funcionalidades en el servicio de creación de usuarios tipo empresa en un entorno Node.js utilizando Express. La infraestructura del proyecto ha sido modificada para mejorar la eficiencia y adaptabilidad del sistema, incluyendo la transición de llamados SOAP a integraciones REST ful API, mejorando tanto la arquitectura como la lógica de negocio. Unos de los cambios más relevantes son:

1. **Reemplazo de SOAP con REST**: [removed] Los servicios críticos para la creación de empresas migraron de una lógica basada en SOAP a una estructura RESTful, mejorando la manejabilidad y desempeño del sistema.

2. **Configuración del contenedor Docker**: [modified] Se revisó el `Dockerfile` para mejorar su eficiencia y capacidad de manejo, proporcionando una estructura más clara para la implementación de la aplicación.

3. **Estructura modular**: [added] Se han añadido varios controladores y rutas nuevas que permiten una mejor modularización y mantenimiento del código.

4. **Integración continua y despliegue**: [modified] Se actualizó el `azure-pipelines.yml` para incluir pasos mejorados de CI/CD, asegurando la autenticación y gestión de las dependencias desde repositorios privados.

5. **Documentación API**: [added] Implementación de Swagger para la documentación del API, facilitando el entendimiento y uso de los endpoints del servicio.

6. **Configuración dinámica**: [added] El nuevo sistema de configuración implementa el uso de Consul cuando sea necesario dependiendo del entorno de ejecución (`dev`, `qa`, `test`, `prod`), permitiendo una gestión unificada y segura de las configuraciones.

7. **Rutas de salud y validación**: [added] Nueva ruta para verificar el estado del servicio (`/health`), estandarizando la manera de monitorizar el sistema.

## Archivos Agregados

- `README.md`
- `app.js`
- `app/controllers/usuario-controller.js`
- `app/controls/archivo.js`
- `app/controls/mail.js`
- `app/routes/health-routes.js`
- `deploy-docker-compose.yml`
- `deploy-openshift.yaml`
- `deploy-paths.json`
- `server.js`
- `swagger.yaml`

## Archivos Modificados

- `Dockerfile`
- `app/controls/empresa.js`
- `app/controls/error.js`
- `app/models/comuna.js`
- `app/models/error.js`
- `app/routes/routes.js`
- `azure-pipelines.yml`
- `conexionBD/conn.js`
- `config/config.js`
- `database/conn.js`
- `package.json`

## Archivos Eliminados

- `app/controls/correo.js`
- `app/models/correo.js`
- `index.js`

## Detalles de Cambios

### Archivos Añadidos

- **`app/controllers/usuario-controller.js`**: Añade lógica de creación de empresa, gestionando errores y respuestas del sistema.

- **`app/controls/archivo.js`**: Implementa la lógica de envío de archivos vía API REST, asegurando el registro detallado de logs para monitorización de operaciones.

- **`app/controls/mail.js`**: Despliega funcionalidades para el envío de correos, utilizando un servicio externo mediante peticiones HTTP y respuesta asíncrona efectiva.

- **`swagger.yaml`**: Implementa documentación detallada para los endpoints del API, permitiendo a los desarrolladores y usuarios interactuar con los servicios de manera clara y concisa.

### Archivos Modificados

- **`Dockerfile`**: Optimizado para crear imágenes livianas y eficientes, con pasos claros para la instalación de dependencias y el despliegue de la aplicación.

- **`app/controls/empresa.js`**: Refactorización mayor mediante la sustitución de SOAP por REST, eliminando el código legado y desactualizado y ofreciendo una integración más moderna y adaptable con aumentos de rendimiento verificados.

- **`azure-pipelines.yml`**: Mejora en las tareas CI/CD para incluir autenticación npm privada, ejecución de pruebas unitarias, y publicación de artifacts, asegurando integraciones sin fisuras y entregas rápidas.

### Archivos Eliminados

- **`app/controls/correo.js` y `app/models/correo.js`**: Retirados y sustituidos por nuevas implementaciones REST más eficientes y adecuadas al esquema de microservicios actual.

Estos cambios no solo abordan mejoras en rendimiento sino que también fortalecen la estructura del código para mejor mantenimiento y escalabilidad futura, asegurando que el sistema se mantenga robusto y eficiente en su operación diaria.