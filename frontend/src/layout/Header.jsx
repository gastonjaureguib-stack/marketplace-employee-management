
import Navbar from './Navbar';
import '../styles/layout/Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__container">

        <div className="site-header__brand">
          <img
            src="/sgelogo.jpg"
            alt="SGE - Sistema de Gestión de Empleados"
            className="site-header__logo"
          />
        </div>

        <Navbar />

      </div>
    </header>
  );
}

export default Header;
