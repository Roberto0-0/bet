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
  
  coin: {
    type: DataTypes.DECIMAL(12, 0),
    allowNull: false,
    defaultValue: 100
  },

  diamond: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  
  won: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },

  limit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})
