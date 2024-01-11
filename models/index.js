import dbConfig from '../config/db.config.js'
import { Sequelize } from 'sequelize' 
import userModel from './user.model.js'
import trackerModel from './tracker.model.js'

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

const Users = userModel(sequelize, Sequelize)
const Trackers = trackerModel(sequelize, Sequelize)

Users.hasMany(Trackers)
Trackers.belongsTo(Users)

db.users = Users
db.trackers = Trackers

export default db

