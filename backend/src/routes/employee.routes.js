
import { Router } from 'express';

import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employee.controller.js';

// =========================================
// ROUTER DE EMPLEADOS
// =========================================

const router = Router();

// =========================================
// CRUD DE EMPLEADOS
// =========================================

// Obtener todos los empleados
router.get('/', getEmployees);

// Obtener un empleado por ID
router.get('/:id', getEmployeeById);

// Registrar un empleado
router.post('/', createEmployee);

// Actualizar email y domicilio
router.put('/:id', updateEmployee);

// Eliminar un empleado
router.delete('/:id', deleteEmployee);

// =========================================
// EXPORTACIÓN
// =========================================

export default router;
