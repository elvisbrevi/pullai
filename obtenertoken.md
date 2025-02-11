# Descripción de la Pull Request

## Descripción
Este pull request implementa múltiples cambios y mejoras estructurales en el proyecto. Se han introducido nuevos archivos, modificado varios existentes y eliminado algunos archivos que ya no son necesarios. Además, se han actualizado configuraciones y dependencias para mejorar la funcionalidad y eficiencia del sistema.

## Archivos Agregados
- `app.js`
- `deploy-docker-compose.yml`
- `deploy-openshift.yaml`
- `deploy-paths.json`
- `server.js`
- `src/config/bkp_config.js`
- `src/config/config.default.json`
- `src/config/config.js`
- `src/config/db.js`
- `src/controllers/tokenController.js`
- `src/models/userModel.js`
- `src/routes/health.js`
- `src/routes/info.js`
- `src/routes/token.js`
- `src/services/tokenService.js`
- `swagger.yaml`

## Archivos Modificados
- `Dockerfile`
- `README.md`
- `azure-pipelines.yml`
- `package.json`

## Archivos Eliminados
- `config/config.js`
- `index.js`

## Detalles del Cambio
### Modificaciones en archivos existentes
- **Dockerfile**
  - Se ha cambiado la instalación `npm i` a `npm install --quiet`.
  - Se copió el archivo `.npmrc` y se cambió el comando de inicio del contenedor de `index.js` a `app.js`.

- **README.md**
  - Se ha reemplazado el contenido inicial por un ejemplo de archivo `.ENV` para facilitar la configuración.

- **azure-pipelines.yml**
  - Se añadieron nuevos parámetros para controlar la ejecución de SonarQube y SecurityRev.
  - Se actualizaron tareas de construcción y autenticación NPM. 
  - Se modificó para incluir configuraciones de despliegue adicionales y pasos de comprobación de entorno para SonarQube.

- **package.json**
  - Se cambió el nombre del proyecto y la versión.
  - Se actualizó la propiedad `main` para apuntar a `app.js`.
  - Se añadieron nuevas dependencias y se creó un script de inicio para desarrollo.

### Archivos nuevos y detalles del contenido
- **app.js**
  - Script principal que instancia y ejecuta el servidor configurado.

- **server.js**
  - Define una clase `Server` que gestiona la configuración del servidor, middlewares, rutas, y la inicialización del sistema.

- **src/** (configuraciones, controladores, modelos, rutas, servicios)
  - Varios archivos nuevos que estructuran y organizan la lógica del proyecto, como `config.js`, `db.js`, `tokenController.js`, y `tokenService.js`.

- **Archivos de despliegue**
  - `deploy-docker-compose.yml`, `deploy-openshift.yaml`: scripts de configuración para orquestadores de contenedores.

- **swagger.yaml**
  - Definiciones de API usando OpenAPI 3.0 para la documentación y pruebas del servicio.

### Archivos Eliminados
- **config/config.js**
  - Código de configuración anterior eliminado para dar paso a la nueva estructura modular.
  
- **index.js**
  - Eliminado al ser remplazado por el nuevo sistema de servidor en `server.js`.

Estas modificaciones en general mejoran la estructura y organización del código, además de facilitar futuras implementaciones de funciones, integración de servicios de terceros como SonarQube y mejoran la mantenibilidad del proyecto en su conjunto.