import db from '../models/index.js'
import express from 'express'
import userAuth from '../utils/userAuth.js'

const optionRouter = express.Router()

const Options = db.options

optionRouter.get('/all', async (req, res) => {
  try {
    const options = await Options.findAll()
    res.status(200).send(options)
  } catch (error) {
    res.status(500).send({ error: 'Server failed unexpectedly.' })
  }
})

/**
 * A POST method for creating new options for associated tracker Id.
 */
optionRouter.post('/:id', userAuth.checkOptionsBeforeUpdateOrDelete, async (req, res) => {
  let options = req.body.options
  const trackerId = req.params.id

  options = options.map(option => {return { ...option, trackerId }})
  try {
    const savedOptions = await Options.bulkCreate(options)
    res.status(201).send(savedOptions)
  } catch (error) {
    res.status(500).json({ error: 'Server failed unexpectedly.' })
  }
})

optionRouter.put('/:id', userAuth.checkOptionsBeforeUpdateOrDelete, async (req, res) => {
  const id = req.params.id
  let detailsToUpdate = {}

  if (req.body.color) {detailsToUpdate.color = req.body.color}
  if (req.body.name) {detailsToUpdate.name = req.body.name}

  try {
    const option = await Options
      .update(detailsToUpdate,
        { where: { id },
          returning: true,
          plain: true
        })
    if (!option[0]) {
      res.status(404).send({
        message: `Cannot update Option with id=${id}. Maybe Option was not found or req.body is empty!`
      })
    } else {
      res.send(option[1].dataValues)
    }
  } catch {
    res.status(500).json({ error: 'Server failed unexpectedly.' })
  }
})

optionRouter.delete('/:id', userAuth.checkOptionsBeforeUpdateOrDelete, async (req, res) => {
  const id = req.params.id

  try {
    const option = await Options.destroy({
      where: {
        id: id
      }
    })
    if (!option) {
      res.status(404).send({
        message: `Cannot delete Option with id=${id}. Maybe Option was not found!`
      })
    } else {
      res.send({
        message: 'Option was deleted successfully!'
      })
    }
  } catch {
    res.status(500).json({ error: 'Server failed unexpectedly.' })
  }
})

export default optionRouter