import db from '../models/index.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import passport from 'passport'
import passportJWT from 'passport-jwt'
const JWTStrategy = passportJWT.Strategy

const User = db.users

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

const authorization = async (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    console.log('no token found')
    res.sendStatus(403)
  }

  try {
    const data = jwt.verify(token, process.env.secretKey)
    req.userId = data.id
    req.username = data.username
    req.name = data.name
  } catch {
    res.sendStatus(401).json({ message: 'Invalid token' })
  }

  next()
}

export default { saveUser, authorization }