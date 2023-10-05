import { DataTypes } from "sequelize"
import { sequelize } from "../database/index.js"

export const Bank = sequelize.define("bank", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    coin: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: false,
        defaultValue: 100000000
    },
    diamondPercent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    diamondCoin: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: false,
        defaultValue: 1000000
    }
})
