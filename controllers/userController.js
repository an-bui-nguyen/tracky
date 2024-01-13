import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userAuth from '../utils/userAuth.js'
import db from '../models/index.js'
import 'dotenv/config'
import express from 'express'

const userRouter = express.Router()

const User = db.users

const signup = async (req, res) => {
  try {
    const { name, username, password } = req.body
    console.log(username)
    console.log(password)
    const data = {
      name,
      username,
      hashedPassword: await bcrypt.hash(password, 10)
    }

    const user = await User.create(data)

    const userInfoToken = { id: user.id, username: user.username, name: user.name }

    if (user) {
      let token = jwt.sign(userInfoToken, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000
      })

      res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true })
      console.log('user', JSON.stringify(user, null, 2))
      console.log(token)

      return res.status(201).send(user)
    } else {
      return res.status(409).send('Details are not correct')
    }
  }
  catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  const { username, password } = req.body
  console.log(username)
  console.log(password)

  const user = await User.findOne({
    where: {
      username: username
    }
  })

  const correctPassword = user === null
    ? false
    : await bcrypt.compare(password, user.hashedPassword)

  if (!(user && correctPassword)) {
    return res.status(401).json({ error: 'Incorrect username or password' })
  }

  const userInfoToken = { id: user.id, username: user.username, name: user.name }

  let token = jwt.sign(
    userInfoToken,
    process.env.secretKey,
    { expiresIn: 1 * 24 * 60 * 60 * 1000 }
  )
  res.cookie('jwt',
    token,
    {
      maxAge: 1 * 24 * 60 * 60,
      httpOnly: true
    }
  )
  console.log('user', JSON.stringify(user, null, 2))
  console.log(token)

  return res.status(201).send(user)

}

const logout = (req, res) => {
  if (!req.cookies['jwt']) {
    res.status(401).json({
      error: 'Invalid jwt'
    })
  } else {
    res.clearCookie('jwt').status(200).json({
      message: 'You have logged out'
    })
  }
}

const protectedRoute = (req, res) => {
  console.log(req.userId)
  console.log(req.name)
  console.log(req.username)
  res.json({
    message: 'welcome to the protected route'
  })
}

const getAllUsers = async (req, res) => {
  const users = await User.findAll()
  console.log(users.every(user => user instanceof User))
  res.json(users)
}

userRouter.get('/all-users', getAllUsers)
userRouter.post('/signup', userAuth.saveUser, signup)
userRouter.post('/login', login)
userRouter.get('/logout', logout)
userRouter.get('/protected', userAuth.authorization, protectedRoute)

export default userRouter