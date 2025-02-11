# Descripción

Se han realizado múltiples modificaciones para refactorizar y mejorar la aplicación Node.js en general. Uno de los cambios mayores es la restructuración del archivo `index.js`, transfiriendo la lógica del servidor a una clase `Server` mejor modularizada situada en un nuevo archivo `server.js`. Este cambio ayuda a mejorar la mantenibilidad y escalabilidad del proyecto. 

Se añadió el uso de Docker y OpenShift para la gestión de contenedores y orquestación, lo que simplifica el despliegue de la aplicación. Nuevos archivos de configuración como `deploy-openshift.yaml` y `deploy-docker-compose.yml` fueron creados para definir la infraestructura de los contenedores, permitiendo configuraciones dinámicas basadas en variables de entorno.

La integración de un nuevo controlador para manejar las rutas de búsqueda y salud (`buscar-cupon.js` y `health-routes.js`) mejora la separación de responsabilidades dentro del código de la aplicación. Además, el proyecto ahora utiliza las librerías `@sag/consulconn` y `@sag/registrologs` para la gestión de la configuración y los logs, respectivamente, centralizando y simplificando estas tareas comunes.

Por último, se añadieron mejoras en la autenticación de NPM para paquetes privados y se hizo una migración a un sistema de configuración centralizado, lo que permite cambiar la configuración fácilmente según el entorno de ejecución usando archivos de configuración JSON.

# Archivos Añadidos

- `config/config.default.json`
- `controllers/buscar-cupon.js`
- `deploy-docker-compose.yml`
- `deploy-openshift.yaml`
- `deploy-paths.json`
- `routes/buscar-cupon.js`
- `routes/health-routes.js`
- `server.js`
- `swagger.yaml`

# Archivos Modificados

- `Dockerfile`
- `azure-pipelines.yml`
- `conexionBD/conn.js`
- `config/config.js`
- `index.js`
- `package.json`

# Detalle de Cambios

## Dockerfile

Se actualizaron los comentarios para mayor claridad y se añadieron pasos para instalar paquetes privados de NPM mediante un archivo `.npmrc`, mejorando la estructura y documentación del archivo para los procesos de construcción de la imagen Docker.

## azure-pipelines.yml

El archivo YAML de pipelines de Azure fue extensamente modificado para incluir variables de entorno críticas, y se realizaron ajustes en las tareas para que incluyan la instalación automática de dependencias mediante NPM, así como la creación y autenticación para la gestión de imágenes Docker.

## conexionBD/conn.js

La conexión a la base de datos fue refactorizada para obtener las configuraciones desde un archivo JSON centralizado mediante la función `getConfig()`, lo que mejora la modularidad y facilidad de modificación del código.

## config/config.js

Se eliminó la estructura estática de configuración basada en archivos JSON distintivos para cada entorno (`dev`, `qa`, `test`, `prod`) y se introdujo un sistema centralizado que usa Consul para la gestión de la configuración, simplificando significativamente la administración de configuraciones a medida que la aplicación crece.

## index.js

Se eliminó la lógica del servidor y se movió a un nuevo archivo `server.js`, donde la clase `Server` encapsula toda la funcionalidad del servidor, mejorando la organización del código. El `index.js` ahora actúa principalmente como el punto de entrada que inicializa la instancia del servidor.

## package.json

Se añadieron nuevas dependencias, incluidas `dotenv`, `swagger-ui-express`, y `yamljs`, para gestionar la configuración desde archivos `.env` y la documentación de API con Swagger. Se añadió también un script de desarrollo (`dev`) para ejecutar la aplicación con `nodemon`, facilitando el proceso de desarrollo al proporcionar recarga automática.

Estos cambios, en conjunto, optimizan la estructura del código, aportan mejoras en la seguridad y mantenibilidad, y adoptan mejores prácticas en el despliegue y gestión de la aplicación.