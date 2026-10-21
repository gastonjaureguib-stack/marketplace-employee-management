# SGE — Sistema de Gestión de Empleados

Aplicación web full stack para la gestión de empleados de un marketplace, desarrollada como desafío técnico.

El sistema permite registrar, consultar, actualizar y eliminar empleados mediante una interfaz desarrollada con React y una API REST construida con Node.js y Express.

## Tecnologías utilizadas

### Frontend
- React 19
- Vite 8
- React Router DOM
- JavaScript
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

- Listado de empleados registrados.
- Registro de nuevos empleados.
- Consulta de información de empleados.
- Edición de correo electrónico y domicilio.
- Eliminación de empleados con confirmación.
- Validación de campos obligatorios.
- Validación del formato de correo electrónico.
- Control de legajos duplicados.
- Mensajes de confirmación y error.
- Persistencia de información mediante SQLite.
- Interfaz adaptable a diferentes tamaños de pantalla.

### Reglas de negocio

Cada empleado contiene los siguientes datos:

| Campo | Descripción |
|---|---|
| ID | Identificador generado automáticamente |
| Nombre | Nombre del empleado |
| Apellido | Apellido del empleado |
| Documento | Documento de identidad |
| Legajo | Identificador único del empleado |
| Email | Correo electrónico |
| Domicilio | Dirección del empleado |

**Restricción de edición:** una vez registrado el empleado, solamente se permite modificar su email y domicilio. El nombre, apellido, documento y legajo permanecen inalterables.

## Estructura del proyecto

```text
marketplace-employee-management/
├── backend/
│   ├── database/
│   │   └── .gitkeep
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
├── .gitignore
└── README.md
```

## Requisitos previos

Para ejecutar el proyecto es necesario contar con:

- Node.js y npm instalados.
- Git para clonar el repositorio.
- Un navegador web moderno.

## Instalación

### 1. Clonar el repos