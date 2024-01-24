import express from 'express'
import db from '../models/index.js'
import userAuth from '../utils/userAuth.js'

const Tracker = db.trackers
const Option = db.options
const Entry = db.entries

const trackerRouter = express.Router()

/**
 * A POST method for creating a new tracker.
 * @param {string} name The name of the tracker.
 * @param {string} note The note of the tracker.
 * @param {object} options The options of the tracker.
 * @returns {object} The tracker object.
 */
trackerRouter.post('/', async (req, res) => {
  const { name, note, options } = req.body

  if (!options) {
    return res.status(400).send({ message: 'Please provide options' })
  }

  const userId = req.userId

  const newTracker = { name, note, userId }

  const tracker =
    await Tracker.create(
      { ...newTracker,
        options: options
      },
      { include: [Option] }
    )
  res.status(201).send({ tracker })
})

trackerRouter.get('/', async (req, res) => {
  const userId = parseInt(req.userId)
  const trackers = await Tracker.findAll({
    where: {
      userId: userId
    }, include: {
      model: Option,
      include: {
        model: Entry
      }
    }
  })
  res.status(200).send(trackers)
})

trackerRouter.put('/:id', userAuth.checkBeforeUpdateOrDelete, async (req, res) => {
  const trackerId = parseInt(req.params.id)
  const { name, note } = req.body

  try {
    const tracker = await Tracker.update(
      { name, note },
      { where: { id: trackerId },
        returning: true,
        plain: true
      }
    )

    if (!tracker[0]) {
      res.status(404).send({
        message: `Cannot update Tracker with id=${trackerId}. Maybe Tracker was not found or req.body is empty!`
      })
    } else {
      res.send(tracker[1].dataValues)
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

trackerRouter.delete('/:id', userAuth.checkBeforeUpdateOrDelete, async (req, res) => {
  const trackerId = parseInt(req.params.id)

  await Tracker.destroy({
    where: { id: trackerId }
  })

  res.status(200).send({ message: `Tracker ${JSON.stringify(trackerId)} deleted` })
})

export default trackerRouter