// models.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: './data/orders.sqlite' // SQLite database file
});

// Sync models with the database
async function initializeDatabase() {
  await sequelize.sync({ force: true }); // This will recreate the database on each run
}

export { sequelize, initializeDatabase };
