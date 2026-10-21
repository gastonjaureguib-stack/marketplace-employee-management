# SGE — Sistema de Gestión de Empleados

Sistema de Gestión de Empleados desarrollado como desafío técnico full stack para la administración de usuarios internos de un marketplace.

La aplicación permite registrar, consultar, editar y eliminar empleados mediante una interfaz web desarrollada con React, conectada a una API REST propia construida con Node.js y Express.

La información se almacena de forma persistente en una base de datos SQLite utilizando Sequelize como ORM.

## Tecnologías utilizadas

### Frontend

- React 19
- Vite 8
- JavaScript
- React Router DOM
- CSS
- SweetAlert2

### Backend

- Node.js
- Express 5
- Sequelize 6
- SQLite
- CORS
- dotenv

## Funcionalidades

- Listado de todos los empleados registrados.
- Registro de nuevos empleados.
- Consulta de información de empleados.
- Edición de email y domicilio.
- Eliminación de empleados con confirmación.
- Validación de campos obligatorios.
- Validación del formato de correo electrónico.
- Control de legajos duplicados.
- Mensajes de confirmación y error.
- Actualización de la interfaz sin recargar manualmente la página.
- Persistencia de datos mediante SQLite.
- Diseño adaptable a diferentes tamaños de pantalla.

## Reglas de negocio

Cada empleado debe contar con los siguientes campos:

| Campo | Descripción |
|---|---|
| ID | Identificador generado automáticamente |
| Nombre | Nombre del empleado |
| Apellido | Apellido del empleado |
| Documento | DNI o pasaporte |
| Legajo | Identificador único del empleado |
| Email | Correo electrónico |
| Domicilio | Dirección del empleado |

**Restricción de edición:** una vez registrado un empleado, solamente se permite modificar su email y domicilio.

Los campos nombre, apellido, documento y legajo no pueden modificarse después del registro.

## Estructura del proyecto

```text
marketplace-employee-management/
├── backend/
│   ├── database/
│   │   └── .gitkeep
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── employee.controller.js
│   │   ├── models/
│   │   │   └── Employee.js
│   │   ├── routes/
│   │   │   └── employee.routes.js
│   │   └── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── README.md
```

## Requisitos previos

Para ejecutar el proyecto localmente es necesario contar con:

- Node.js compatible con las dependencias del proyecto (se recomienda Node.js 22.12 o superior).
- npm.
- Git.
- Un navegador web moderno.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/gastonjaureguib-stack/marketplace-employee-management.git
cd marketplace-employee-management
```

### 2. Instalar las dependencias del backend

Desde la raíz del proyecto:

```bash
cd backend
npm install
```

### 3. Instalar las dependencias del frontend

Abrir otra terminal y, desde la raíz del proyecto, ejecutar:

```bash
cd frontend
npm install
```

## Ejecución

El frontend y el backend deben ejecutarse simultáneamente en terminales independientes.

### Terminal 1 — Backend

Ingresar a la carpeta `backend` y ejecutar:

```bash
npm run dev
```

También puede iniciarse sin el modo de observación mediante:

```bash
npm start
```

El servidor estará disponible en:

http://localhost:8080

Para comprobar su funcionamiento:

http://localhost:8080/api/health

### Terminal 2 — Frontend

Ingresar a la carpeta `frontend` y ejecutar:

```bash
npm run dev
```

La aplicación estará disponible en:

http://localhost:5173

**Importante:** el backend debe estar ejecutándose para que el frontend pueda consultar y modificar la información de los empleados.

## Configuración y variables de entorno

El proyecto utiliza SQLite como motor de base de datos local, por lo que no requiere credenciales de una base de datos externa.

La configuración actual permite ejecutar la aplicación sin crear manualmente un archivo `.env`.

El backend incluye `dotenv` como dependencia para facilitar el uso de variables de entorno si se necesitan configuraciones adicionales en el futuro.

La API está configurada para ejecutarse localmente en el puerto `8080` y aceptar solicitudes del frontend en `http://localhost:5173`.

## Base de datos

La persistencia se implementa mediante Sequelize y SQLite.

El archivo de base de datos se encuentra en:

```text
backend/database/sge.sqlite
```

Al iniciar el servidor, Sequelize establece la conexión y sincroniza los modelos mediante `sequelize.sync()`.

El archivo SQLite se genera localmente y está excluido del repositorio mediante `.gitignore`.

La carpeta `backend/database` se conserva en Git gracias al archivo `.gitkeep`.

De esta forma, cada persona que clone el proyecto puede trabajar con su propia base de datos local.

## API REST

La API utiliza la siguiente ruta base:

```text
http://localhost:8080/api/employees
```

### Endpoints disponibles

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/employees` | Obtener todos los empleados |
| GET | `/api/employees/:id` | Obtener un empleado por ID |
| POST | `/api/employees` | Registrar un nuevo empleado |
| PUT | `/api/employees/:id` | Actualizar email y domicilio |
| DELETE | `/api/employees/:id` | Eliminar un empleado |

### Ejemplo de creación de empleado

**POST** `/api/employees`

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "documento": "12345678",
  "legajo": "EMP001",
  "email": "juan@example.com",
  "domicilio": "Av. Principal 123"
}
```

El ID se genera automáticamente al guardar el empleado en la base de datos.

### Ejemplo de actualización

**PUT** `/api/employees/1`

```json
{
  "email": "juan.nuevo@example.com",
  "domicilio": "Calle Nueva 456"
}
```

La API permite actualizar exclusivamente los campos `email` y `domicilio`.

### Ejemplo de eliminación

**DELETE** `/api/employees/1`

El endpoint elimina el empleado correspondiente al identificador proporcionado.

Desde el frontend, la eliminación requiere una confirmación previa mediante SweetAlert2.

## Validaciones y manejo de errores

El sistema contempla las siguientes validaciones:

- Todos los campos son obligatorios al registrar un empleado.
- El email debe tener un formato válido.
- El legajo debe ser único.
- El ID del empleado debe ser válido.
- Se manejan solicitudes sobre empleados inexistentes.
- Solo se permite editar email y domicilio.
- Se manejan errores de comunicación entre frontend y backend.
- Se solicita confirmación antes de eliminar un empleado.

## Actualización de la interfaz

El frontend utiliza hooks de React para gestionar el estado de los empleados y las operaciones del sistema.

Al registrar, editar o eliminar un empleado, la interfaz refleja los cambios sin necesidad de recargar manualmente la página.

La comunicación con el backend se centraliza en el servicio `employeeService.js`.

## Verificación del frontend

Desde la carpeta `frontend`, ejecutar:

```bash
npm run lint
```

Este comando analiza el código mediante ESLint.

Para generar y verificar la compilación de producción:

```bash
npm run build
```

La compilación se genera en la carpeta `frontend/dist`, excluida del repositorio mediante `.gitignore`.

## Pruebas funcionales realizadas

Durante el desarrollo se verificaron las siguientes operaciones:

- Registro de empleados.
- Validación de campos obligatorios.
- Validación de correos electrónicos.
- Prevención de legajos duplicados.
- Edición de email y domicilio.
- Restricción de edición de los demás campos.
- Cancelación de la eliminación.
- Confirmación y eliminación de empleados.
- Actualización automática del listado.
- Persistencia de información después de recargar la página.
- Respuesta de los endpoints de la API REST.

También se ejecutaron satisfactoriamente los comandos `npm run lint` y `npm run build` del frontend.

## Alcance del proyecto

SGE fue desarrollado para cumplir los requisitos de un desafío técnico full stack orientado a la gestión de empleados internos.

El alcance comprende:

- SPA en React.
- API REST en Express.
- Operaciones CRUD.
- Persistencia mediante Sequelize y SQLite.
- Validaciones básicas.
- Organización del código por responsabilidades.

No incluye autenticación, autorización por roles ni funcionalidades administrativas adicionales, ya que no forman parte de los requisitos solicitados.

## Autor

**Gastón Jaureguiberry**

Proyecto desarrollado como desafío técnico full stack.