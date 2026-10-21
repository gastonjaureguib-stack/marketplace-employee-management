


import { useState } from 'react';

import '../../styles/components/EmployeeForm.css';


// =========================================
// ESTADO INICIAL DEL FORMULARIO
// =========================================

const initialForm = {
  nombre: '',
  apellido: '',
  documento: '',
  legajo: '',
  email: '',
  domicilio: '',
};

// =========================================
// COMPONENTE EMPLOYEE FORM
// =========================================

function EmployeeForm({ onSubmit, onCancel, employee = null }) {
  const isEditing = Boolean(employee);

  const [formData, setFormData] = useState(() =>
    employee
      ? {
          nombre: employee.nombre ?? '',
          apellido: employee.apellido ?? '',
          documento: employee.documento ?? '',
          legajo: employee.legajo ?? '',
          email: employee.email ?? '',
          domicilio: employee.domicilio ?? '',
        }
      : { ...initialForm }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================================
  // ACTUALIZAR CAMPOS
  // =========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // ENVIAR FORMULARIO
  // =========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting || typeof onSubmit !== 'function') {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);

      if (!isEditing) {
        setFormData({ ...initialForm });
      }
    } catch (error) {
      console.error('Error al guardar el empleado:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================
  // RENDERIZADO
  // =========================================

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <div className="employee-form__header">
        <h2>
          {isEditing ? 'Editar empleado' : 'Registrar empleado'}
        </h2>

        <p>
          {isEditing
            ? 'Actualizá la información del empleado.'
            : 'Completá los datos para registrar un empleado.'}
        </p>
      </div>

      <div className="employee-form__grid">
        <div className="employee-form__field">
          <label htmlFor="employee-nombre">Nombre</label>
          <input
            id="employee-nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={isEditing}
          />
        </div>

        <div className="employee-form__field">
          <label htmlFor="employee-apellido">Apellido</label>
          <input
            id="employee-apellido"
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            disabled={isEditing}
          />
        </div>

        <div className="employee-form__field">
          <label htmlFor="employee-documento">Documento</label>
          <input
            id="employee-documento"
            type="text"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            required
            disabled={isEditing}
          />
        </div>

        <div className="employee-form__field">
          <label htmlFor="employee-legajo">Legajo</label>
          <input
            id="employee-legajo"
            type="text"
            name="legajo"
            value={formData.legajo}
            onChange={handleChange}
            required
            disabled={isEditing}
          />
        </div>

        <div className="employee-form__field">
          <label htmlFor="employee-email">Email</label>
          <input
            id="employee-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="employee-form__field">
          <label htmlFor="employee-domicilio">Domicilio</label>
          <input
            id="employee-domicilio"
            type="text"
            name="domicilio"
            value={formData.domicilio}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="employee-form__actions">
        {onCancel && (
          <button
            type="button"
            className="employee-form__cancel"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          className="employee-form__submit"
          disabled={isSubmitting || !onSubmit}
        >
          {isSubmitting
            ? 'Guardando...'
            : isEditing
              ? 'Guardar cambios'
              : 'Registrar empleado'}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
