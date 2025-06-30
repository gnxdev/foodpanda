import { DataTypes } from "sequelize";
import {getSequelizeInstance} from '../config/database/SequelizeInstance.js';

const sequelize = getSequelizeInstance({database: 'foodpanda'});
const Sponsorships = sequelize.define(
  "Sponsorships",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_discount_id: DataTypes.INTEGER,
    orderline_discount_id: DataTypes.INTEGER,
    toppings_discount_id: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    name: DataTypes.STRING,
  },
  {
    tableName: "sponsorships",
  timestamps: true,
  underscored: true,
  paranoid: true,
  }
);

export default Sponsorships;
