import { DataTypes } from "sequelize"
import { sequelize } from "../database/index.js"

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  serialized: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  
  money: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100
  },
  
  bets: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})
