
const API_URL = 'http://localhost:8080/api/employees';

// =========================================
// FUNCIÓN AUXILIAR PARA SOLICITUDES HTTP
// =========================================

const apiRequest = async (endpoint = '', options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      const error = new Error(
        result.message || 'Ocurrió un error en la solicitud.'
      );

      error.status = response.status;
      error.details = result.errors || result.fields;

      throw error;
    }

    return result;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        'No fue posible conectar con el servidor. Verificá que el backend esté funcionando.',
        { cause: error }
      );
    }

    throw error;
  }
};

// =========================================
// GET - OBTENER TODOS LOS EMPLEADOS
// =========================================

export const getEmployees = async () => {
  const result = await apiRequest();

  return result.data;
};

// =========================================
// GET - OBTENER EMPLEADO POR ID
// =========================================

export const getEmployeeById = async (id) => {
  const result = await apiRequest(`/${id}`);

  return result.data;
};

// =========================================
// POST - CREAR EMPLEADO
// =========================================

export const createEmployee = async (employeeData) => {
  const result = await apiRequest('', {
    method: 'POST',
    body: JSON.stringify(employeeData),
  });

  return result.data;
};

// =========================================
// PUT - ACTUALIZAR EMPLEADO
// =========================================

export const updateEmployee = async (id, employeeData) => {
  const result = await apiRequest(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      email: employeeData.email,
      domicilio: employeeData.domicilio,
    }),
  });

  return result.data;
};

// =========================================
// DELETE - ELIMINAR EMPLEADO
// =========================================

export const deleteEmployee = async (id) => {
  const result = await apiRequest(`/${id}`, {
    method: 'DELETE',
  });

  return result;
};
