import { Sequelize } from 'sequelize'
import "dotenv/config"

const HOST = process.env.HOST
const DATABASE = process.env.DATABASE
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const DIALECT = process.env.DIALECT

export const sequelize = new Sequelize(DATABASE, 'root', PASSWORD, {
  host: HOST,
  dialect: String(DIALECT),
  timezone: '-03:00',
  logging: false
})

try {
  sequelize.authenticate()
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
