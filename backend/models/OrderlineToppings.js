import { DataTypes } from 'sequelize';
import {getSequelizeInstance} from '../config/database/SequelizeInstance.js';

const sequelize = getSequelizeInstance({database: 'foodpanda'});
const OrderlineToppings = sequelize.define('OrderlineToppings', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderline_id: DataTypes.INTEGER,
  parent_toppings_id: DataTypes.INTEGER,
  topping_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  price: DataTypes.FLOAT,
  quantity: DataTypes.INTEGER,
  remote_code: DataTypes.STRING,
}, {
  tableName: 'orderline_toppings',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

export default OrderlineToppings;
