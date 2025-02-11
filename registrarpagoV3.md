# Descripción

Se ha implementado una nueva funcionalidad en la aplicación que permite registrar pagos utilizando una estructura de microservicios basada en Node.js y Express. Se introduce un contenedor Docker para facilitar la implementación y una configuración avanzada de integración y despliegue continuo a través de Azure Pipelines. La arquitectura del sistema ahora se asienta sobre Consul para la gestión de configuraciones en diferentes entornos como desarrollo, pruebas y producción. Se han definido rutas para manejar diferentes métodos de registro de pagos, integrando tanto nuevas rutas como compatibilidad hacia las rutas existentes. Se incluyen pruebas funcionales utilizando Jest para garantizar el correcto funcionamiento de las rutas.

# Archivos Añadidos

- Dockerfile
- azure-pipelines.yml
- babel.config.js
- deploy-docker-compose.yml
- deploy-openshift.yaml
- deploy-paths.json
- index.ts
- jest.config.js
- package.json
- server.ts
- sql/INS_PAGO.sql
- src/config/config.default.json
- src/config/config.ts
- src/controllers/registrarPago.ts
- src/database/database.ts
- src/helpers/helpers.ts
- src/middlewares/validar-campos.ts
- src/models/notificaPago.ts
- src/routes/health.ts
- src/routes/registrarPago.ts
- src/routes/registrarPagoCerofilas.ts
- src/types/defaultTypes.ts
- swagger.yaml
- test/funcional.test.ts
- tsconfig.json

# Archivos Modificados

_No se ha modificado ningún archivo existente._

# Archivos Eliminados

_No se ha eliminado ningún archivo._

# Detalles del Cambio

## Dockerfile
Se introdujo un `Dockerfile` para crear una imagen de Docker que utiliza Alpine como base, instala Node.js, npm y otras dependencias necesarias, y posteriormente construye la aplicación. Este contenedor está diseñado para mejorar la portabilidad y el despliegue.

## azure-pipelines.yml
Se ha definido un pipeline en Azure Pipelines para automatizar el proceso de construcción de la imagen Docker, prueba, y despliegue. Se incluyen tareas para la autenticación en npm, limpieza de caché, instalación de dependencias y publicación de artefactos. Además, se establece un flujo para recuperar y aplicar la versión desde package.json.

## babel.config.js
Configuración de Babel para transpilación de TypeScript a JavaScript, usando presets adecuados para el entorno Node.js actual.

## deploy-docker-compose.yml y deploy-openshift.yaml
Se introducen configuraciones necesarias para el despliegue del servicio en entornos Docker y OpenShift. Estas configuraciones facilitan la escalabilidad y la integración con otras tecnologías de orquestación de contenedores.

## index.ts y server.ts
Se crea un punto de entrada para iniciar el servidor Express, definiendo las rutas esenciales y la conexión con los servicios de Consul para las configuraciones. La modularización permite una estructura clara para gestionar las dependencias y eventos del servidor.

## swagger.yaml
Se documenta la API utilizando OpenAPI 3.0, lo cual facilita la comprensión y el testeo de las diferentes rutas disponibles en el servicio, incluyendo la ruta de salud y las rutas para registrar pagos.

## src/controllers/registrarPago.ts
Controlador para manejar la lógica de negocio en el registro de pagos, cubriendo diferentes flujos de operación y validaciones de entrada.

## src/database/database.ts
Implementación de conexiones a la base de datos usando Microsoft SQL, con soporte para realizar procedimientos almacenados y consultas directas.

## test/funcional.test.ts
Se añaden pruebas funcionales para asegurarse de la correcta gestión de rutas, el manejo esperado de errores y la validación de las respuestas del servidor utilizando `supertest`.

En conjunto, estos cambios refuerzan la robustez del sistema, permitiendo registrar pagos de manera eficiente y estable, con un despliegue sencillo y mantenimiento escalable.