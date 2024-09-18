// models.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: './data/orders.sqlite' // SQLite database file
});

export { sequelize };
