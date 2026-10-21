
import Employee from '../models/Employee.js';

// =========================================
// FUNCIONES AUXILIARES
// =========================================

const employeeFields = [
  'nombre',
  'apellido',
  'documento',
  'legajo',
  'email',
  'domicilio',
];

const editableFields = ['email', 'domicilio'];

const isValidId = (id) => /^[1-9]\d*$/.test(id);

const isValidBody = (body) =>
  body !== null &&
  typeof body === 'object' &&
  !Array.isArray(body);

const getInvalidFields = (body, allowedFields) =>
  Object.keys(body).filter(
    (field) => !allowedFields.includes(field)
  );

const getMissingFields = (body, requiredFields) =>
  requiredFields.filter(
    (field) =>
      typeof body[field] !== 'string' ||
      body[field].trim() === ''
  );

const handleError = (error, res, action) => {
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      status: 'error',
      message: 'Ya existe un empleado con ese legajo.',
    });
  }

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Los datos ingresados no son válidos.',
      errors: error.errors.map((item) => ({
        field: item.path,
        message: item.message,
      })),
    });
  }

  console.error(`Error al ${action} empleado:`, error);

  return res.status(500).json({
    status: 'error',
    message: `No fue posible ${action} el empleado.`,
  });
};

// =========================================
// GET - OBTENER TODOS LOS EMPLEADOS
// GET /api/employees
// =========================================

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      order: [['id', 'ASC']],
    });

    return res.status(200).json({
      status: 'success',
      data: employees,
    });
  } catch (error) {
    return handleError(error, res, 'consultar');
  }
};

// =========================================
// GET - OBTENER UN EMPLEADO POR ID
// GET /api/employees/:id
// =========================================

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'El ID del empleado no es válido.',
      });
    }

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        status: 'error',
        message: 'Empleado no encontrado.',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: employee,
    });
  } catch (error) {
    return handleError(error, res, 'consultar');
  }
};

// =========================================
// POST - CREAR EMPLEADO
// POST /api/employees
// =========================================

export const createEmployee = async (req, res) => {
  try {
    const body = req.body;

    if (!isValidBody(body)) {
      return res.status(400).json({
        status: 'error',
        message: 'Debés enviar un objeto JSON válido.',
      });
    }

    const invalidFields = getInvalidFields(
      body,
      employeeFields
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Se enviaron campos no permitidos.',
        fields: invalidFields,
      });
    }

    const missingFields = getMissingFields(
      body,
      employeeFields
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Todos los campos son obligatorios.',
        fields: missingFields,
      });
    }

    const employeeData = Object.fromEntries(
      employeeFields.map((field) => [
        field,
        body[field].trim(),
      ])
    );

    const employee = await Employee.create(employeeData);

    return res.status(201).json({
      status: 'success',
      message: 'Empleado registrado correctamente.',
      data: employee,
    });
  } catch (error) {
    return handleError(error, res, 'registrar');
  }
};

// =========================================
// PUT - ACTUALIZAR EMPLEADO
// PUT /api/employees/:id
// =========================================

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'El ID del empleado no es válido.',
      });
    }

    if (!isValidBody(body)) {
      return res.status(400).json({
        status: 'error',
        message: 'Debés enviar un objeto JSON válido.',
      });
    }

    // Solo permitimos editar email y domicilio
    const invalidFields = getInvalidFields(
      body,
      editableFields
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message:
          'Solo se pueden modificar email y domicilio.',
        fields: invalidFields,
      });
    }

    const missingFields = getMissingFields(
      body,
      editableFields
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Email y domicilio son obligatorios.',
        fields: missingFields,
      });
    }

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        status: 'error',
        message: 'Empleado no encontrado.',
      });
    }

    await employee.update({
      email: body.email.trim(),
      domicilio: body.domicilio.trim(),
    });

    return res.status(200).json({
      status: 'success',
      message: 'Empleado actualizado correctamente.',
      data: employee,
    });
  } catch (error) {
    return handleError(error, res, 'actualizar');
  }
};

// =========================================
// DELETE - ELIMINAR EMPLEADO
// DELETE /api/employees/:id
// =========================================

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'El ID del empleado no es válido.',
      });
    }

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        status: 'error',
        message: 'Empleado no encontrado.',
      });
    }

    await employee.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'Empleado eliminado correctamente.',
    });
  } catch (error) {
    return handleError(error, res, 'eliminar');
  }
};
