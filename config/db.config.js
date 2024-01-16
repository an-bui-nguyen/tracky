import 'dotenv/config'

const config = {
  USER: 'postgres',
  HOST: 'localhost',
  DB: 'tracky',
  PASSWORD: process.env.DB_PASSWORD,
  dialect: 'postgres',
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

export default config