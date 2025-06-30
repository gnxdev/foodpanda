import { DataTypes } from 'sequelize';
import {getSequelizeInstance} from '../config/database/SequelizeInstance.js';

const sequelize = getSequelizeInstance({database: 'foodpanda'});
const OrderDiscounts = sequelize.define('OrderDiscounts', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'order_discounts',
  timestamps: true,
  underscored: true,
  paranoid: true,  
});

export default OrderDiscounts;
