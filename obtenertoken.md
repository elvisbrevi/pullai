# Descripción

Este pull request introduce una serie de importantes cambios y mejoras en el proyecto. Los cambios clave incluyen la reorganización de la estructura del servidor, la migración de SOAP a una arquitectura más moderna e integraciones adaptadas a REST, y la optimización de los pipelines de CI/CD con Azure. Además, se han incorporado configuraciones avanzadas para la gestión de logs y trazabilidad con SAG, y se ha mejorado la documentación con Swagger.

1. **Reestructuración del Servidor**: Se ha reemplazado el archivo `index.js` con una implementación más modular y escalable en `server.js` y `app.js`, mejorando la organización del código y la separación de responsabilidades.

2. **Configuración de CI/CD**: Se modificó `azure-pipelines.yml` para incluir nuevas condiciones y parámetros relacionados con SonarQube y otras herramientas de seguridad. Se añadieron configuraciones específicas para distintas plataformas de despliegue, como Docker Compose y OpenShift.

3. **Documentación con Swagger**: Se ha añadido un nuevo archivo `swagger.yaml` que proporciona especificaciones OpenAPI para la API de obtención de token, mejorando significativamente la documentación para desarrolladores e integradores.

4. **Integración con Consul y Gestión de Configuraciones**: Las configuraciones ahora se gestionan dinámicamente mediante Consul, simplificando la operación y mejorando la flexibilidad para manejar múltiples entornos (dev, qa, test, prod).

5. **Gestión de logs y trazabilidad**: Se ha integrado SAGLog y herramientas de trazabilidad para un seguimiento detallado y análisis del rendimiento del sistema.

# Archivos Añadidos

- **app.js**
- **deploy-docker-compose.yml**
- **deploy-openshift.yaml**
- **deploy-paths.json**
- **server.js**
- **src/config/bkp_config.js**
- **src/config/config.default.json**
- **src/config/config.js**
- **src/config/db.js**
- **src/controllers/tokenController.js**
- **src/models/userModel.js**
- **src/routes/health.js**
- **src/routes/info.js**
- **src/routes/token.js**
- **src/services/tokenService.js**
- **swagger.yaml**

# Archivos Modificados

- **Dockerfile**
- **README.md**
- **azure-pipelines.yml**
- **package.json**

# Archivos Eliminados

- **config/config.js**
- **index.js**

# Detalles del Cambio

## Dockerfile

- Se cambió el archivo de inicio de `index.js` a `app.js`.
- Cambio en el comando de instalación de npm para utilizar `npm install --quiet`, mejorando el tiempo de construcción al evitar mensajes de consola innecesarios.

## README.md

- Reemplazado contenido placeholder con ejemplo de configuración .ENV. Esto facilita a los usuarios inicializar el entorno de desarrollo con variables de entorno correctas.

## azure-pipelines.yml

- Se añadieron parámetros para activar SonarQube y SecurityRev, mejorando la integración continua con capacidades avanzadas de análisis y seguridad.
- Cambio en la configuración de la `pool` para utilizar un agente específico SAG.
- Añadidos pasos para la preparación y ejecución manual de SonarQube.
- Implementación de autenticación npm para trabajar con registros privados.
- Añadida tarea para ejecutar Microsoft Security DevOps.

## package.json

- Actualización del nombre del proyecto y la guía de versionado a "sag.portalpagos.micsrv.obtenertoken.v1".
- Se eliminaron dependencias no utilizadas y añadieron nuevas relacionadas con la arquitectura revisada, como `@sag/consulconn` y `@sag/registrologs`.

## app.js / server.js

- Reorganización completa de la lógica de servidor, introduciendo clases y métodos que encapsulan configuraciones, middlewares, rutas y la inicialización de la aplicación.
- Se añadió capacidad para carga dinámica de configuración mediante Consul y otros servicios de SAG para mejor escalabilidad y mantenimiento.

## swagger.yaml

- Nuevo archivo de especificación API usando OpenAPI v3 para documentar claramente los endpoints disponibles en la aplicación, incluyendo parámetros esperados y códigos de respuesta.

## src/config

- Incorporación de un sistema de gestión de configuraciones que soporta fuentes tanto locales como remotas (Consul), permitiendo flexibilidad y dinámicas de configuración.

Estos cambios son cruciales para modernizar la arquitectura de la aplicación, promover mejores prácticas y optimizar las operaciones DevOps.