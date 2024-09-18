// models.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: console.log,
  storage: './data/orders.sqlite' // SQLite database file
});

export { sequelize };
