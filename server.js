import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import bodyParser from 'body-parser'
import db from './models/index.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: "Welcome to tracky application"})
})

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})