Esta aplicación backend está diseñada como parte del hito-4 de DesafíoLatam.

Consiste en el desarrollo de un sistema para manejar usuarios, tareas y autenticación. Usa el patrón MVC y Sequelize como ORM para la interacción con la base de datos.

# Características principales

## Autenticación:

Registro de usuarios con encriptación de contraseñas.

Inicio de sesión mediante JWT.

## Gestión de usuarios:

CRUD completo

## Gestión de tareas:

CRUD completo.

Asociación de tareas a usuarios.

## Validación de datos:

Manejo de errores centralizado con middlewares personalizados.

## Base de datos:

Configuración con Sequelize para PostgreSQL.

# Endpoints disponibles

## Autenticación

POST /auth/register: Registro de usuarios.

POST /auth/login: Inicio de sesión y generación de JWT.

## Usuarios

GET /users: Obtener todos los usuarios.

GET /users/:id: Obtener un usuario por ID.

POST /users: Crear un nuevo usuario.

PUT /users/:id: Actualizar un usuario existente.

DELETE /users/:id: Eliminar un usuario.

## Tareas

GET /tasks: Obtener todas las tareas.

GET /tasks/:userId: Obtener tareas de un usuario específico.

POST /tasks: Crear una nueva tarea.

PUT /tasks/:id: Actualizar una tarea.

DELETE /tasks/:id: Eliminar una tarea.

# Scripts

npm start: Inicia la aplicación en modo producción.
npm run test: Ejecuta las pruebas

# Documentación

http://localhost:3000/api/v1/api-docs/#/
