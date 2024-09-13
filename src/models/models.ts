// models.js
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/orders.sqlite' // SQLite database file
});

// Define the Order state machine persistence
const Order = sequelize.define('Order', {
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  snapshot: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {}
  }
}, { timestamps: true });

// Sync models with the database
async function initializeDatabase() {
  await sequelize.sync({ force: true }); // This will recreate the database on each run
}

export { Order, initializeDatabase };
