# Descripción

Este pull request implementa cambios significativos en el sistema de notificación del estado de pago de importaciones a través de la API. Se ha realizado una migración de código de JavaScript a TypeScript, lo que mejora la mantenibilidad y robustez del código. Se ha optimizado el Dockerfile al cambiar a una imagen base más liviana (alpine). También se han agregado configuraciones para la construcción, prueba y despliegue del proyecto usando Azure Pipelines, Docker Compose y OpenShift. Entre las mejoras clave, los archivos "confirmador", "correo", y "notificador" se han reestructurado para separar la lógica del negocio, incluyendo la validación de estados permitidos y manejo de errores para mejorar la fiabilidad del sistema. Ahora, la API se integra con servicios externos para la gestión de correos electrónicos y el almacenamiento de configuraciones usando consul, aumentando la escalabilidad y flexibilidad del sistema. Además, se han eliminado archivos y módulos obsoletos para limpiar y actualizar la base de código.

# Archivos Nuevos

- `babel.config.js`
- `deploy-docker-compose.yml`
- `deploy-openshift.yaml`
- `deploy-paths.json`
- `index.ts`
- `jest.config.js`
- `src/config/config.default.json`
- `src/config/config.ts`
- `src/controllers/notificaStatusPago.ts`
- `src/helpers/validarResultadoQuerys.ts`
- `src/middlewares/validar-campos.ts`
- `src/models/confirmador.ts`
- `src/models/correo.ts`
- `src/models/notificador.ts`
- `src/routes/health.ts`
- `src/routes/notificaStatusPago.ts`
- `src/server.ts`
- `src/services/database.ts`
- `src/services/enviarCorreo.ts`
- `src/types/defaultTypes.ts`
- `swagger.yaml`
- `tsconfig.json`

# Archivos Modificados

- `Dockerfile`
- `azure-pipelines.yml`
- `package.json`

# Archivos Eliminados

- `app/controls/confirmador.js`
- `app/controls/correo.js`
- `app/controls/notificador.js`
- `app/models/confirmador.js`
- `app/models/correo.js`
- `app/models/notificador.js`
- `app/routes/routes.js`
- `config/config.js`
- `database/conn.js`
- `index.js`

# Detalles de Cambio

## Dockerfile

- **Imagen base cambiada a Alpine**: Esto reduce el tamaño de la imagen significativamente y mejora el tiempo de carga.
- **Paquetes adicionales instalados**: Incluir `git`, `vim`, `bind-tools`, y `curl` mejora la gestión del entorno y herramientas de diagnóstico.
- **Integración npmrc**: Ahora el archivo `.npmrc` permite la instalación de paquetes privados.

## Azure Pipelines

- **Variables definidas para facilitar tests y compilaciones**: Se incluye una variable de ejemplo y se consolidan pasos para un flujo de CI/CD más claro.
- **Nuevos pasos de compilación y autenticación**: Incluyen limpieza de cache NPM, autenticación de npm privado y ejecución de pruebas unitarias.

## Cambios Importantes en Código

- **Migración a TypeScript**: Mejora la claridad y seguridad mediante tipado estático.
- **Actualización en lógica de controladores**: Los controladores ahora manejan mejor las transacciones de base de datos y el envío de correos electrónicos, modularizando la ejecución de consultas SQL y mejoras en el manejo de excepciones.
- **Integración de servicios externos**: Uso de Consul para gestión de configuraciones y un servicio para envío de correos, optimizando la resiliencia.

## Configuración OpenShift y Docker Compose

- **Archivos para despliegue en contenedores**: `deploy-docker-compose.yml` y `deploy-openshift.yaml` permiten la integración continua con OpenShift y Docker, con configuraciones de replicación y escalabilidad automática.

## Swagger

- **Documentación del API añadida**: El archivo `swagger.yaml` proporciona detalles sobre las rutas disponibles, ayudando en la integración con servicios externos y en la documentación del API para desarrolladores.

Con estos cambios, se busca optimizar el rendimiento, la escalabilidad, y la mantenibilidad del sistema, permitiendo a los desarrolladores integrar y extender el sistema de manera eficiente. Estos ajustes también preparan el sistema para futuros requerimientos de negocio e integraciones tecnológicas.