import { DataTypes } from 'sequelize';
import {getSequelizeInstance} from '../config/database/SequelizeInstance.js';

const sequelize = getSequelizeInstance({database: 'foodpanda'});
const DeliveryFee = sequelize.define('DeliveryFee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  value: DataTypes.FLOAT,
}, {
  tableName: 'delivery_fee',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

export default DeliveryFee;
