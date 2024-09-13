// orders.ts
import { sequelize } from './models';
import { DataTypes } from 'sequelize';

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

export { Order };
