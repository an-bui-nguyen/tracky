import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userAuth from '../utils/userAuth.js'
import db from '../models/index.js'
import 'dotenv/config'
import express from 'express'

const userRouter = express.Router()

// userRouter.use(session({
//   secret: process.env.secretKey,
//   resave: false,
//   saveUninitialized: true,
// }))

// userRouter.use(passport.initialize())
// userRouter.use(passport.session())


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
    res.status(500).send(error.message)
  }
}

const login = async (req, res) => {
  const { username, password } = req.body

  try {
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

    return res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
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

const changeUserInfo = async (req, res) => {
  const id = req.userId

  let updateValues = {}
  if (req.body.name) {updateValues.name = req.body.name}
  if (req.body.username) {updateValues.username = req.body.username}
  if (req.body.password) {
    updateValues.hashedPassword = await bcrypt.hash(req.body.password, 10)
  }

  try {
    const response = await User.update(
      updateValues,
      { where: { id: id },
        returning: true,
        plain: true },
    )
    console.log(response)
    if (!response[0]) {
      res.send(response[1].dataValues)
    } else {
      res.status(404).send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
      })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error updating User with id=' + id })
  }
}

const deleteUser = (req, res) => {
  const id = req.userId
  User.destroy({
    where: {
      id: id
    }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'User was deleted successfully!'
        })
      } else {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id
      })
    })
}

const protectedRoute = (req, res) => {
  console.log(req.userId)
  console.log(req.name)
  res.status(200).json({
    message: 'welcome to the protected route'
  })
}

const getAllUsers = async (req, res) => {
  const users = await User.findAll()
  console.log(users.every(user => user instanceof User))
  res.json(users)
}

userRouter.get('/all', getAllUsers)
userRouter.post('/signup', userAuth.saveUser, signup)
userRouter.post('/login', login)
userRouter.get('/logout', logout)
userRouter.get('/protected', userAuth.authorization, protectedRoute)
userRouter.put('/update', userAuth.authorization, changeUserInfo)
userRouter.delete('/delete', userAuth.authorization, deleteUser)

export default userRouter

// passport.use(new Strategy({
//   usernameField: 'username',
//   passwordField: 'password'
// }, async (username, password, cb) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         username: username
//       }
//     })

//     const correctPassword = user === null
//       ? false
//       : await bcrypt.compare(password, user.hashedPassword)

//     if (!(user && correctPassword)) {
//       return cb(null, false, { message: 'Incorrect username or password.' })
//     }

//     return cb(null, user, { message: 'Logged In Successfully' })
//   } catch (error) {
//     return cb(error)
//   }
// }))

// passport.serializeUser((user, cb) => {
//   cb(null, user)
// })

// passport.deserializeUser((user, cb) => {
//   cb(null, user)
// })
