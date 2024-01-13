import db from '../models/index.js'
import express from 'express'

const optionRouter = express.Router()

const Options = db.options

optionRouter.post('/', async (req, res) => {
  let options = req.body.options
  const trackerId = req.body.trackerId

  options = options.map(option => {return { ...option, trackerId }})
  try {
    const savedOptions = await Options.bulkCreate(options)
    res.status(201).send(savedOptions)
  } catch (error) {
    res.status(500).json({ error: 'Server failed unexpectedly.' })
  }
})

export default optionRouter