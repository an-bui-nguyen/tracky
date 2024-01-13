import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import bodyParser from 'body-parser'
import db from './models/index.js'
import middleware from './utils/middleware.js'
import cookieParser from 'cookie-parser'
import userRouter from './controllers/userController.js'
import userAuth from './utils/userAuth.js'
import trackerRouter from './controllers/trackerController.js'
import optionRouter from './controllers/optionController.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(middleware.requestLogger)

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to tracky application' })
})

db.sequelize.sync({ alter: true }).then(() => {
  console.log('Drop and re-sync db.')
})

app.use('/api/users', userRouter)
app.use('/api/trackers', userAuth.authorization, trackerRouter)
app.use('/api/options', optionRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})