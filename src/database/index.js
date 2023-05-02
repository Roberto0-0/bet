import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('bet', 'root', 'rbt9810*', {
  host: 'localhost',
  dialect: "mysql",
  timezone: '-03:00',
  dialectOptions: {
    useUTC: false
  }
})

try {
  sequelize.authenticate()
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
