
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import sequelize from './config/database.js';
import './models/Employee.js';
import employeeRoutes from './routes/employee.routes.js';

// =========================================
// CONFIGURACIÓN INICIAL
// =========================================

const app = express();

const PORT = process.env.PORT || 8080;

// =========================================
// MIDDLEWARES
// =========================================

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

// =========================================
// RUTAS
// =========================================

// Comprobar que la API está funcionando
app.get('/api/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    message: 'API de SGE funcionando correctamente',
  });
});

// Rutas de empleados
app.use('/api/employees', employeeRoutes);

// =========================================
// CONEXIÓN A SQLITE
// =========================================

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log(
      'Conexión con SQLite establecida correctamente.'
    );

    await sequelize.sync();

    console.log('Modelos sincronizados correctamente.');

    // =========================================
    // INICIAR SERVIDOR
    // =========================================

    app.listen(PORT, () => {
      console.log(
        `Servidor SGE ejecutándose en http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      'Error al iniciar el servidor:',
      error.message
    );

    process.exit(1);
  }
};

// =========================================
// INICIAR APLICACIÓN
// =========================================

startServer();
