
import { Link } from 'react-router-dom';

// =========================================
// PÁGINA 404 - RUTA NO ENCONTRADA
// =========================================

function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="not-found__content">
        <span className="not-found__code">404</span>

        <h1 className="not-found__title">
          Página no encontrada
        </h1>

        <p className="not-found__description">
          La página que estás buscando no existe
          o fue movida a otra ubicación.
        </p>

        <Link
          to="/empleados"
          className="not-found__button"
        >
          Volver a empleados
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
