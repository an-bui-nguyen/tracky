import express from 'express'
import db from '../models/index.js'

const Tracker = db.trackers

const trackerRouter = express.Router()

trackerRouter.post('/', async (req, res) => {
  const { name, note } = req.body
  const userId = req.userId

  const newTracker = { name, note, userId }

  const tracker = await Tracker.create(newTracker)

  console.log(tracker.name)
  console.log(tracker.userId)
  res.status(201).send({ trackerId: tracker.id, trackerName: tracker.name })
})

export default trackerRouter