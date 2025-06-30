import { DataTypes } from 'sequelize';
import {getSequelizeInstance} from '../config/database/SequelizeInstance.js';

const sequelize = getSequelizeInstance({database: 'foodpanda'});
const OrderlineDiscounts = sequelize.define('OrderlineDiscounts', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderline_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  amount: DataTypes.FLOAT,
}, {
  tableName: 'orderline_discount',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

export default OrderlineDiscounts;
