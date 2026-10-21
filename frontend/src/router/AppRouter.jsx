
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import EmployeesPage from '../pages/EmployeesPage';
import NotFoundPage from '../pages/NotFoundPage';

// =========================================
// CONFIGURACIÓN DE RUTAS
// =========================================

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/empleados" replace />,
      },
      {
        path: 'empleados',
        element: <EmployeesPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

// =========================================
// PROVEEDOR DEL ROUTER
// =========================================

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
