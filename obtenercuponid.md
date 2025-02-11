# Descripción

Este pull request representa una refactorización significativa del servicio `cyp-obtener-cuponid`, con la intención de mejorar la escalabilidad, mantenibilidad y seguridad. Los cambios incluyen:

1. **Refactorización del servidor**: Se ha introducido una nueva estructura de servidor que utiliza un archivo `server.js` y un archivo `app.js`. Estas modificaciones permiten una separación más clara de las responsabilidades de inicialización del servidor, middleware y rutas.

2. **Migración de SOAP a un sistema de microservicios**: El antiguo sistema basado en SOAP ha sido reemplazado por un modelo de microservicios utilizando express.js y rutas definidas. Ahora se hace uso del cliente `soap` para manejar solicitudes SOAP dentro de las funciones de servicio.

3. **Uso de Middleware**: Se ha añadido un sistema de middleware para validación de rutas que mejora la capacidad de mantenimiento y seguridad del código. Esto incluye nuevas validaciones y un middleware para gestión de campos.

4. **Implementación de Swagger para Documentación API**: Integración con Swagger UI para mejorar la comunicación y entendimiento del servicio hacia otros desarrolladores y servicios mediante un archivo `swagger.yaml`.

5. **Automatización CI/CD en Azure Pipelines**: Se han revisado los scripts de `azure-pipelines.yml` para incorporar buenas prácticas, autenticación NPM y comandos para cobertura de código.

6. **Archivos de configuración más robustos**: Se ha añadido un nuevo sistema de configuración que extrae configuraciones desde consul o archivos locales según el entorno de ejecución.

7. **Pruebas automatizadas**: Introducción de pruebas unitarias usando Jest y Supertest, asegurando que las rutas principales respondan correctamente y que la cobertura de código sea adecuada.

# Archivos Añadidos

- `app.js`
- `deploy-docker-compose.yml`
- `deploy-openshift.yaml`
- `deploy-paths.json`
- `jest.config.js`
- `server.js`
- `src/config/config.default.json`
- `src/config/config.js`
- `src/controllers/obtener-controller.js`
- `src/middleware/index.js`
- `src/middleware/validar-campos.js`
- `src/models/schemas-validators/obtener-schema.js`
- `src/models/token-model.js`
- `src/routes/health-routes.js`
- `src/routes/obtener-routes.js`
- `src/services/function/functions.js`
- `src/services/obtener-service.js`
- `src/test/obtener-cupon.test.js`
- `swagger.yaml`

# Archivos Modificados

- `Dockerfile`
- `azure-pipelines.yml`
- `package.json`

# Archivos Eliminados

- `config/config.js`
- `index.js`

# Detalles del Cambio

**Dockerfile**
- Se mejora la instalación de dependencias, integrando una mejor práctica para instalaciones silenciosas (`npm install --quiet`) y añadiendo `.npmrc` para autenticación de paquetes privados.
- Implementación de comentarios para claridad del flujo de construcción.

**app.js y server.js**
- El `app.js` ahora actúa como el punto principal de arranque instanciando el servidor desde `server.js` para un esquema más modular.
- El `server.js` gestiona la inicialización de configuraciones, middlewares y rutas del servidor.

**azure-pipelines.yml**
- Reestructuración del archivo para definir variables explícitas y asegurar la autenticación con repositorios privados de NPM.
- Mejora en la gestión y publicación de la versión de `package.json`.

**swagger.yaml**
- Proporciona una documentación clara y específica para las API nuevas y modificadas, mejorando la integración y uso de estas desde sistemas externos.

**package.json**
- Actualización de dependencias del proyecto, se añaden librerías como `jest` para pruebas automáticas, `dotenv` para gestión de variables de entorno, y actualizaciones en paquetes existentes.
- Inclusión de nuevos scripts para desarrollo y ejecución de tests.

Estos cambios constituyen una importante mejora hacia un servicio más robusto y mantenible, alineado con las últimas prácticas de la industria en gestión y arquitectura de aplicaciones web.