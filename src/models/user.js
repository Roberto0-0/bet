import { DataTypes } from "sequelize"
import { sequelize } from "../database/index"

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
  
  serialize: {
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
