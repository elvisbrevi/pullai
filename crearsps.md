# Descripción de Pull Request

Este Pull Request introduce una serie de cambios importantes en la configuración y estructura de un microservicio en Node.js. Se han actualizado archivos de configuración, se ha mejorado la infraestructura de despliegue y se han actualizado las dependencias a versiones más recientes. Además, se han realizado ajustes en el código para mejorar la funcionalidad y la organización del mismo.

## Descripción

- Se ha actualizado la configuración de `azure-pipelines.yml` eliminando líneas comentadas y añadiendo nuevos archivos para ser empaquetados como parte del proceso de build.
- Se han añadido tres nuevos archivos de configuración para despliegue: `deploy-docker-compose.yml`, `deploy-openshift.yaml` y `deploy-paths.json`.
- El archivo `package.json` ha sido actualizado para reflejar cambios en la versión y la lista de dependencias.
- Se ha refactorizado el código de varios archivos de configuración y servicios para mejorar la modularidad y uso del configurador de Consul.
- Se ha enriquecido el API implementado en `swagger.yaml` para reflejar nuevas rutas y parámetros.

## Archivos Agregados

- `deploy-docker-compose.yml`
- `deploy-openshift.yaml`
- `deploy-paths.json`
- `src/config/config.default.json`

## Archivos Modificados

- `azure-pipelines.yml`
- `package.json`
- `server.js`
- `src/config/config.js`
- `src/models/solicitud-servicio-model.js`
- `src/routes/solicitud-servicio-routes.js`
- `src/services/solicitud-servicio-services.js`
- `swagger.yaml`

## Archivos Eliminados

No se eliminaron archivos en este PR.

## Detalles de Cambios

**azure-pipelines.yml**

- Se eliminaron comentarios innecesarios.
- Se añadieron nuevos archivos para empaquetar: `deploy-openshift.yaml`, `deploy-docker-compose.yml`, y `deploy-paths.json`.

**package.json**
- Actualización de la versión de 1.1.2 a 1.1.7.
- Actualización de las dependencias para incluir `@sag/consulconn` y `nodemon` a las versiones más recientes.

**server.js**
- Refactorización para utilizar el configurador SAGConsulConnector.
- Se añadieron métodos asíncronos para inicializar la configuración y las rutas para una mejor estructura de la aplicación.

**src/config/config.js**
- Se mejoró la modularidad del archivo permitiendo cargar configuraciones desde Consul o desde un archivo local cuando sea necesario.

**src/models/solicitud-servicio-model.js**
- Reformateo y limpieza del código y mejora de comentarios.

**src/routes/solicitud-servicio-routes.js**
- Reemplazo de comillas simples por dobles.
- Simplificación de la ruta para la creación de solicitudes de servicios.

**src/services/solicitud-servicio-services.js**
- Ajuste en la forma de obtener la configuración de la URL de servicio a través del nuevo método `getConfig`.
- Mejor manejo de errores para SOAP creando mensajes más específicos.

**swagger.yaml**
- Se añadió una nueva descripción y ruta `/solicitudes/api/v1/crear` al Swagger.
- Documentación mejorada con ejemplos y respuestas esperadas, incluyendo el manejo de errores.

Se espera que estos cambios mejoren la robustez, la mantenibilidad y la coherencia del proyecto.