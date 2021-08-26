import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { NotFound, Unauthorized } from '../lib/errors.js'
import { secret } from '../config/environment.js'

async function registerUser(req, res, next) {
  try {
    const createdUser = await User.create(req.body)
    return res.status(201).json({
      message: `Welcome ${createdUser.username}`,
    })
  } catch (err) {
    next(err)
  }
}

async function loginUser(req, res, next) {
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      throw new Unauthorized()
    }

    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '7 days' })

    return res.status(202).json({
      message: `Welcome Back ${userToLogin.username}`,
      token,
    })
  } catch (err) {
    next(err)
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find()
    if (!users) {
      throw new NotFound()
    }
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

async function getSingleUser(req, res, next) {
  const { userId } = req.params
  try {
    const userToFind = await User.findById(userId)
      .populate('favorites')
    if (!userToFind) throw new NotFound()
    return res.status(200).json(userToFind)
  } catch (err) {
    next(err)
  }
}


// async function userUpdate(req, res, next) {
//   const { userId } = req.params
//   try {
//     const userToUpdate = await User.findByIdAndUpdate(userId)
//     if (!userToUpdate) {
//       throw new NotFound()
//     }
//     Object.assign(userToUpdate, req.body)
//     await userToUpdate.save()
//     return res.status(202).json(userToUpdate)
//   } catch (err) {
//     next(err)
//   }
// }

export default {
  register: registerUser,
  login: loginUser,
  usersIndex: getAllUsers,
  userShow: getSingleUser,
  // userUpdate: userUpdate,
}