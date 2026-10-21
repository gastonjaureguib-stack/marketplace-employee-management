
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/employees/EmployeeForm';

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../services/employeeService';

import '../styles/pages/EmployeesPage.css';

// =========================================
// PÁGINA DE EMPLEADOS
// =========================================

function EmployeesPage() {
  // =========================================
  // ESTADOS
  // =========================================

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // =========================================
  // CARGAR EMPLEADOS DESDE SQLITE
  // =========================================

  useEffect(() => {
    let active = true;

    const loadEmployees = async () => {
      try {
        const data = await getEmployees();

        if (active) {
          setEmployees(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err.message);

          Swal.fire({
            icon: 'error',
            title: 'Error al cargar empleados',
            text: err.message,
            confirmButtonText: 'Entendido',
          });
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadEmployees();

    return () => {
      active = false;
    };
  }, []);

  // =========================================
  // ABRIR FORMULARIO DE REGISTRO
  // =========================================

  const handleOpenCreateForm = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  // =========================================
  // ABRIR FORMULARIO DE EDICIÓN
  // =========================================

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  // =========================================
  // CERRAR FORMULARIO
  // =========================================

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedEmployee(null);
  };

  // =========================================
  // CREAR O ACTUALIZAR EMPLEADO
  // =========================================

  const handleSaveEmployee = async (formData) => {
    try {
      if (selectedEmployee) {
        // =====================================
        // ACTUALIZAR EMPLEADO
        // =====================================

        const updatedEmployee = await updateEmployee(
          selectedEmployee.id,
          formData
        );

        setEmployees((prev) =>
          prev.map((employee) =>
            employee.id === updatedEmployee.id
              ? updatedEmployee
              : employee
          )
        );

        handleCloseForm();

        await Swal.fire({
          icon: 'success',
          title: 'Empleado actualizado',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonText: 'Aceptar',
        });
      } else {
        // =====================================
        // REGISTRAR EMPLEADO
        // =====================================

        const newEmployee = await createEmployee(formData);

        setEmployees((prev) => [...prev, newEmployee]);

        setError(null);
        handleCloseForm();

        await Swal.fire({
          icon: 'success',
          title: 'Empleado registrado',
          text: 'El empleado fue registrado correctamente.',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'No se pudieron guardar los datos',
        text: err.message,
        confirmButtonText: 'Entendido',
      });

      // Propagamos el error para que EmployeeForm
      // no limpie los campos si el guardado falla.
      throw err;
    }
  };

  // =========================================
  // ELIMINAR EMPLEADO
  // =========================================

  const handleDeleteEmployee = async (employee) => {
    if (deletingId !== null) {
      return;
    }

    const confirmation = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar empleado?',
      text: `Se eliminará a ${employee.nombre} ${employee.apellido}. Esta acción no se puede deshacer.`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) {
      return;
    }

    setDeletingId(employee.id);

    try {
      await deleteEmployee(employee.id);

      // Actualizar tabla sin recargar
      setEmployees((prev) =>
        prev.filter((item) => item.id !== employee.id)
      );

      // Cerrar formulario si se estaba editando
      // el empleado que acaba de eliminarse.
      if (selectedEmployee?.id === employee.id) {
        handleCloseForm();
      }

      await Swal.fire({
        icon: 'success',
        title: 'Empleado eliminado',
        text: 'El empleado fue eliminado correctamente.',
        confirmButtonText: 'Aceptar',
      });
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'No se pudo eliminar',
        text: err.message,
        confirmButtonText: 'Entendido',
      });
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================
  // RENDERIZADO
  // =========================================

  return (
    <section className="employees-page">
      <h1>Gestión de empleados</h1>

      <p>
        Administrá los empleados registrados en el sistema.
      </p>

      {!showForm && (
        <button
          type="button"
          onClick={handleOpenCreateForm}
        >
          Registrar empleado
        </button>
      )}

      {showForm && (
        <EmployeeForm
          key={selectedEmployee?.id ?? 'new'}
          employee={selectedEmployee}
          onSubmit={handleSaveEmployee}
          onCancel={handleCloseForm}
        />
      )}

      {loading && (
        <p>Cargando empleados...</p>
      )}

      {!loading && error && (
        <p role="alert">
          No fue posible cargar los empleados.
        </p>
      )}

      {!loading && !error && (
        <EmployeeList
          employees={employees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
        />
      )}
    </section>
  );
}

export default EmployeesPage;
