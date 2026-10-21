
import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// =========================================
// UBICACIÓN DE LA BASE DE DATOS
// =========================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasePath = path.resolve(
  __dirname,
  '../../database/sge.sqlite'
);

// =========================================
// CONFIGURACIÓN DE SEQUELIZE
// =========================================

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath,
  logging: false,
});

// =========================================
// EXPORTACIÓN
// =========================================

export default sequelize;
