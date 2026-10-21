
import { Outlet } from 'react-router-dom';

import Header from './Header';

import '../styles/App.css';

// =========================================
// LAYOUT PRINCIPAL
// =========================================

function MainLayout() {
  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <div className="app__container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
