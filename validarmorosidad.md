## Descripción
Este pull request introduce varios cambios y mejoras significativas en la aplicación. Se ha realizado una refactorización del código para mejorar la estructura y funcionalidad del sistema. Ahora se utiliza un enfoque modular que incluye la creación de nuevas rutas y controladores. Se ha modificado el sistema para que cargue configuraciones de Consul en entornos específicos y maneje configuraciones locales para otros entornos. Además, se ha agregado soporte para Swagger para mejorar la documentación de la API. Esto proporciona una manera más robusta de trabajar con configuraciones y mejora la accesibilidad del servicio a través de su API bien documentada.

## Archivos Agregados
- `app.js`
- `config/config.default.json`
- `controllers/validar-morosidad-controller.js`
- `deploy-docker-compose.yml`
- `deploy-openshift.yaml`
- `deploy-paths.json`
- `routes/health-routes.js`
- `routes/solicitud-servicio-routes.js`
- `server.js`
- `swagger.yaml`

## Archivos Modificados
- `Dockerfile`
- `README.md`
- `azure-pipelines.yml`
- `config/config.js`
- `package.json`

## Archivos Eliminados
- `index.js`

## Detalles de Cambios

### Dockerfile
- Se introdujeron comentarios para mejorar la legibilidad del archivo.
- La instalación de dependencias ahora se realiza de manera silenciosa (`--quiet`) para mejorar la salida de logs.
- Se ha cambiado el comando de inicio del contenedor de `index.js` a `app.js`.

### README.md
- Se han eliminado secciones de introducción y contribución, y se han agregado variables de entorno como `APP_PORT`, `HOST` y `URL_WS`.

### azure-pipelines.yml
- Se han reestructurado las etapas de construcción, incluyendo la autenticación con el registro npm privado y la instalación de dependencias.
- Se ha agregado la copia del package.json junto con otros archivos de despliegue como parte del proceso de build y se ha mejorado la gestión de versiones.

### config/config.js
- Se ha modificado el enfoque de carga de configuraciones para permitir el uso de Consul en entornos específicos (dev, qa, test, prod), mientras que los entornos locales utilizan configuraciones desde el archivo.
- Se ha mejorado la gestión de errores y logs para proporcionar retroalimentación clara en caso de fallos.

### app.js y server.js
- Se ha introducido `server.js` para manejar la inicialización del servidor, implementando un patrón de clase para facilitar la gestión y el mantenimiento del código.
- `app.js` ahora inicializa y exporta una instancia de `Server` para arrancar la aplicación.

### swagger.yaml
- Se ha agregado para definir la documentación de la API utilizando el estándar OpenAPI 3.0.3, permitiendo realizar pruebas y consultar la API de manera amigable.

### Controladores y Rutas
- Se creó `validar-morosidad-controller.js` para manejar las solicitudes SOAP y procesar los resultados utilizando Promesas encapsuladas con Hystrix.
- Se establecieron rutas para validar la morosidad y para la verificación del estado del servicio, utilizando los nuevos archivos `solicitud-servicio-routes.js` y `health-routes.js`.

Esta implementación mejora significativamente la estructura del código, facilita el despliegue y pruebas en múltiples entornos, y proporciona una base sólida para futuras mejoras y expansiones del sistema.