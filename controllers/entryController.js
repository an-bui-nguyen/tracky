import express from 'express'
import userAuth from '../utils/userAuth.js'
import db from '../models/index.js'
import { Op } from 'sequelize'
const entriesRouter = express.Router()

const Entry = db.entries

entriesRouter.post('/', userAuth.authorization, userAuth.userAuthBeforeEntry, async (req, res) => {
  const { optionId } = req.body
  console.log(optionId)
  if (!optionId) {
    res.status(400).json({ error: 'optionId is required' })
  }

  try {
    const option = await db.options.findOne({
      where: {
        id: optionId
      }
    })
    const createdEntry = await Entry.create({ optionId: option.getDataValue('id') })
    res.status(201).json(createdEntry)
  } catch (err) {
    res.status(500).json(err)
  }
})

entriesRouter.post('/bulk', userAuth.authorization, async (req, res) => {
  const { entries } = req.body
  if (!entries) {
    res.status(400).json({ error: 'entries are required' })
  }
  try {
    const options = await db.options.findAll({
      where: {
        id: {
          [Op.in]: entries
        }
      }
    })

    const createdEntries = await Entry.bulkCreate(options.map(option => ({ optionId: option.getDataValue('id') })))
    res.status(201).json(createdEntries)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

entriesRouter.delete('/:id', userAuth.authorization, async (req, res) => {
  const { id } = req.params
  if (!id) {
    res.status(400).json({ error: 'id is required' })
  }

  try {
    await Entry.destroy({
      where: {
        id
      }
    })
    res.status(204).end()
  } catch (err) {
    res.status(500).json(err)
  }
})

export default entriesRouter