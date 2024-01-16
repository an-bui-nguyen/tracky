import db from '../models/index.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import passport from 'passport'
import passportJWT from 'passport-jwt'
const JWTStrategy = passportJWT.Strategy

const User = db.users
const Tracker = db.trackers
const Option = db.options

/**
 * A middleware for checking if the username is already taken.
 */
const saveUser = async (req, res, next) => {
  try {
    const username = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    if (username) {
      return res.json(409).send('Username already taken')
    }
    next()
  } catch (error) {
    console.log(error)
  }
}

/**
 * A middlewawre for checking if the user is authorized by verifying cookie in HTTP header.
 */
const authorization = async (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    res.status(403).json({ message: 'No token found' })
    return
  }

  try {
    const data = jwt.verify(token, process.env.secretKey)
    req.userId = data.id
  } catch {
    res.status(401).json({ message: 'Invalid token' })
    return
  }

  next()
}

/**
 * A middleware to check if the user is authorized to update or delete the tracker.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const checkBeforeUpdateOrDelete = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send({ message: 'Please provide a tracker id' })
  }

  const userId = req.userId
  const trackerId = parseInt(req.params.id)

  const tracker = await Tracker.findOne({
    where: {
      id: trackerId
    }
  })

  if (!tracker) {
    return res.status(404).send({ message: `Tracker ${trackerId} not found` })
  }

  if (userId !== tracker.userId) {
    return res.status(403).send({ message: `Unauthorized: Tracker ${trackerId} not yours` })
  }

  next()
}

/**
 * A middleware to check if the user is authorized to update or delete the option.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const checkOptionsBeforeUpdateOrDelete = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send({ message: 'Please provide an option id' })
  }


  const userId = parseInt(req.userId)
  const optionId = parseInt(req.params.id)

  const option = await Option.findOne({
    where: {
      id: optionId
    }, include: [Tracker]
  })

  if (!option) {
    return res.status(404).send({ message: `Option ${optionId} not found` })
  }

  if (userId !== option.tracker.dataValues.userId) {
    return res.status(403).send({ message: `Unauthorized: Option ${optionId} not yours` })
  }

  next()

}

export default { saveUser, authorization, checkBeforeUpdateOrDelete, checkOptionsBeforeUpdateOrDelete }