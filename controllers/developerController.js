import db from '../models/index.js'
import express from 'express'

const developerRouter = express.Router()

const User = db.users
const Tracker = db.trackers
const Option = db.options

developerRouter.get('/all-users', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Tracker,
          include: [Option]
        }
      ]
    })
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

developerRouter.get('/all-trackers', async (req, res) => {
  try {
    const trackers = await Tracker.findAll({
      include: [
        {
          model: Option,
        }
      ]
    })
    res.status(200).send(trackers)
  } catch (error) {
    res.status(500).send({ error: 'Server failed unexpectedly.' })
  }
})

developerRouter.get('/all-options', async (req, res) => {
  try {
    const options = await Option.findAll()
    res.status(200).send(options)
  } catch (error) {
    res.status(500).send({ error: 'Server failed unexpectedly.' })
  }
})

export default developerRouter