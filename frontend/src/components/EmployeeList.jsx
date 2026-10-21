
import '../styles/EmployeeList.css';

// =========================================
// LISTADO DE EMPLEADOS
// =========================================

function EmployeeList({
  employees = [],
  onEdit,
  onDelete,
}) {
  return (
    <section className="employee-list">
      <div className="employee-list__header">
        <h2>Empleados registrados</h2>
        <p>Listado del personal interno del marketplace.</p>
      </div>

      <div className="employee-list__table-container">
        <table className="employee-list__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Documento</th>
              <th>Legajo</th>
              <th>Email</th>
              <th>Domicilio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="employee-list__empty"
                >
                  No hay empleados registrados.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.nombre}</td>
                  <td>{employee.apellido}</td>
                  <td>{employee.documento}</td>
                  <td>{employee.legajo}</td>
                  <td>{employee.email}</td>
                  <td>{employee.domicilio}</td>

                  <td>
                    <div className="employee-list__actions">
                      <button
                        type="button"
                        className="employee-list__edit"
                        onClick={() => onEdit?.(employee)}
                        disabled={!onEdit}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="employee-list__delete"
                        onClick={() => onDelete?.(employee)}
                        disabled={!onDelete}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default EmployeeList;
