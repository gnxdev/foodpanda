import { DataTypes } from 'sequelize';
import {getSequelizeInstance} from '../config/database/SequelizeInstance.js';

const sequelize = getSequelizeInstance({database: 'foodpanda'});
const Orderline = sequelize.define('Orderline', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: DataTypes.INTEGER,
  product_id: DataTypes.INTEGER,
  category_name: DataTypes.STRING,
  name: DataTypes.STRING,
  paid_price: DataTypes.FLOAT,
  quantity: DataTypes.INTEGER,
  remote_code: DataTypes.STRING,
  unit_price: DataTypes.FLOAT,
  vat_total: DataTypes.FLOAT,
  comment: DataTypes.TEXT,
  variation_name: DataTypes.STRING,
  item_unavailability_handling: DataTypes.STRING,
}, {
  tableName: 'orderline',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

export default Orderline;
