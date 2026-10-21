
import { NavLink } from 'react-router-dom';

import '../styles/layout/Navbar.css';

// =========================================
// NAVEGACIÓN PRINCIPAL - SGE
// =========================================

function Navbar() {
  return (
    <nav className="navbar" aria-label="Navegación principal">
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink
            to="/empleados"
            className={({ isActive }) =>
              isActive
                ? 'navbar__link navbar__link--active'
                : 'navbar__link'
            }
          >
            Empleados
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
