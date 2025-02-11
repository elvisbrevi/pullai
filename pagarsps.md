# Descripción

Este pull request implementa una serie de cambios significativos y mejoras en la estructura y funcionamiento del proyecto. Los cambios principales incluyen una refactorización del archivo `Dockerfile`, mejoras en la configuración y despliegue continua mediante Azure Pipelines, la migración de lógica de negocio hacia un modelo más modular y escalable, además de la integración de un API mediante formato REST. Se gestionó la configuración mediante la integración con Consul para mejorar la gestión de configuraciones y facilitar su extracción según el entorno de ejecución.

Los cambios en la aplicación incluyen la eliminación de `index.js` y la creación de nuevas estructuras de archivos, como `app.js` y `server.js`, para seguir una arquitectura más modular mediante la separación de responsabilidades, utilizando controladores y rutas más distribuidas. También se presentan nuevas configuraciones para desplegar en Docker y OpenShift utilizando archivos de configuración YAML. Adicionalmente, se han integrado los módulos para manejo de logs (`@sag/registrologs`) y configuración (`@sag/consulconn`) junto con la adición de especificaciones OpenAPI para facilitar la documentación y uso del API generando una descripción más clara y legible de los endpoints de servicios disponibles.

# Archivos Agregados

- `app.js`
- `config/config.default.json`
- `controllers/pagar-sps-controller.js`
- `deploy-docker-compose.yml`
- `deploy-openshift.yaml`
- `deploy-paths.json`
- `routes/health-routes.js`
- `routes/pagar-sps-routes.js`
- `server.js`
- `swagger.yaml`

# Archivos Modificados

- `Dockerfile`
- `azure-pipelines.yml`
- `config/config.js`
- `package.json`

# Archivos Eliminados

- `index.js`

# Detalles de los Cambios

### Dockerfile

- Se actualizó la base para mejorar la modularidad y visibilidad del Dockerfile, asegurando que las dependencias se gestionen correctamente usando un archivo `.npmrc` que facilita autenticaciones en repositorios privados. Además, se modificó el comando de inicio para adaptarse a la nueva estructura modular con `app.js`.

### azure-pipelines.yml

- Añadido manejo y autenticación para repositorios privados de NPM. Se refactorizó la estructura del pipeline para gestionar de manera más eficiente las etapas de construcción y despliegue, haciendo especial énfasis en definir variables de ambiente importantes para los entornos de prueba y producción.

### app.js

- Nuevo archivo que inicializa el servidor express y establece la base para instanciar y operar el servidor modularmente, conceptualizando el `Server` como un objeto exportable y configurable.

### config.js y config.default.json

- Se realizó un refactor significativo al método de configuración, mediante la inclusión de un método de carga desde Consul para ambientes como desarrollo, QA, test y producción, mientras que proporciona una configuración local por defecto para entornos no críticos. Esta modularidad y flexibilidad mejoran la seguridad, ya que las configuraciones sensibles no quedan expuestas.

### controllers/pagar-sps-controller.js

- Controlador implementado que gestiona la lógica de interacción SOAP a REST para la generación de URLs de pago, centralizando la lógica de negocio y facilitando futuras expansiones o cambios en la lógica sin afectar la arquitectura subyacente. El uso de promesas garantiza un flujo asincrónico seguro y eficiente.

### server.js

- Clase `Server` que reestructura y encapsula toda la lógica server-side, propiciando inyecciones de configuraciones y simplificando el arranque y gestión del servidor.

### swagger.yaml

- Documento que define las especificaciones OpenAPI para los nuevos servicios REST, facilitando la comprensión, documentación y prueba pública del API mediante herramientas como Swagger UI.

Con estos cambios se busca principalmente estandarizar, modularizar, y documentar detalladamente el proyecto, lo cual mejora no solo la escalabilidad y mantenimiento del proyecto, sino también su accesibilidad para desarrolladores e integradores externos.