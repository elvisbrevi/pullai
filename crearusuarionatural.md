## Descripción

Este pull request introduce una serie de cambios significativos para mejorar la arquitectura del sistema y modernizar el proceso de gestión y creación de usuarios en el portal de pagos. Los principales ajustes realizados incluyen la migración desde un enfoque orientado a SOAP a uno basado en RESTful API, lo cual traerá mejoras en rendimiento, mantenibilidad y seguridad. Además, se integraron mejoras en la configuración del entorno y la infraestructura de despliegue, simplificando y aumentando la eficiencia del desarrollo y operaciones.

### Modificaciones y Mejoras

1. **Migración SOAP a REST**: Se eliminó el antiguo cliente SOAP utilizado para el proceso de creación de usuarios y se introdujo un cliente REST que interactúa con el API `usuarioApi`.

2. **Modularización del Servidor**: Se refactorizó la clase `Server` moviéndola a un archivo independiente `server.js`, y ahora combina mejor las rutas y middlewares, permitiendo un manejo más claro de la lógica del servidor.

3. **Mejoras en la Configuración**: 
   - Se introduce una nueva configuración JSON `config.default.json` para manejar parámetros de conexión y aplicaciones específicas.
   - Los archivos de configuración ahora soportan carga tanto desde Consul para entornos como `dev`, `qa`, `test` y `prod`, como desde archivos locales para entornos de desarrollo local.

4. **Despliegue de Arquitectura**: Se añadieron nuevos archivos YAML `deploy-openshift.yaml` y `deploy-docker-compose.yml` para OpenShift y Docker Compose respectivamente, facilitando el proceso de despliegue y orquestación en ambientes de contenedor.

5. **Autenticación y Registro de Servicios**: Integración con SAGConsulConnector para la carga y registro de servicios, lo cual centraliza la configuración y mejora significativamente la gestión del entorno.

6. **Validación de Datos**: Se incrementó la robustez de validaciones de API para asegurar una entrada de datos más confiable y reducir los errores en las operaciones del servicio.

## Archivos Agregados

- `README.md`
- `deploy-docker-compose.yml`
- `deploy-openshift.yaml`
- `deploy-paths.json`
- `server.js`
- `swagger.yaml`
- `src/config/config.default.json`

## Archivos Modificados

- `azure-pipelines.yml`
- `index.js`
- `package.json`
- `src/conexionBD/conn.js`
- `src/config/config.js`
- `src/controllers/crearUsuarioPagadorNatural.js`
- `src/routes/crearUsuarioPagadorNatural.js`

## Archivos Eliminados

- `src/Funciones/enviamail.js`
- `src/Funciones/token.js`
- `src/server.js`

## Detalles de Cambios

### azure-pipelines.yml
Se realizaron ajustes menores para mantener la consistencia en la definición de variables, mejorando así la legibilidad y mantenibilidad del archivo. Se añadieron nuevas etapas para manejar más eficazmente los artifacts de las configuraciones.

### index.js
El archivo `index.js` se ha simplificado para usar el nuevo `server.js` en la raíz del proyecto, mejorando la estructura y modularidad del código.

### package.json
Se actualizaron varias dependencias para incluir las más recientes versiones de bibliotecas de registro y conexión de SAG, además de agregar soporte para `swagger-ui-express` y `yamljs` para la documentación del API.

### src/conexionBD/conn.js
Se refactorizó la conexión a bases de datos para utilizar configuraciones centralizadas desde `getConfig()`, mejorando así la seguridad y centralización de configuraciones críticas del sistema.

### src/controllers/crearUsuarioPagadorNatural.js
En este archivo se efectuó una migración importante desde el manejo SOAP hacia REST, incluyendo nuevos métodos para la validación de usuario y manejo de errores. Esto aumenta notablemente la eficiencia del código y la rapidez de respuesta en las operaciones verificadas.

### src/routes/crearUsuarioPagadorNatural.js
Se añadió validación exhaustiva para cada campo necesario en las rutas de creación de usuario, evitando con ello posibles errores derivados de datos incorrectos o incompletos.

Con estos cambios, la aplicación está mejor preparada para soportar cargas más altas con una arquitectura más escalable, mantenible y alineada a estándares modernos.