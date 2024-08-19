import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma/prisma-client.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import logger from '../utils/logger.js'

// POST /api/users
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Required fields' })
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password))

    if (user && isPasswordCorrect) {
      generateToken(res, user.id)
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email
      })
    } else {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    logger.error(`Error in authUser: ${error.message}`)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

//POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Required fields' })
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { name }]
      }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'Email or name already exist' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    generateToken(res, user.id)
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    })
  } catch (error) {
    logger.error(`Error in registerUser: ${error.message}`)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

//POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0)
    })
    return res.status(200).json({ message: 'User logged out' })
  } catch (error) {
    logger.error(`Error in logoutUser: ${error.message}`)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})
// GET /api/users/profile
const userProfile = asyncHandler(async (req, res) => {
  try {
    // Отправляем профиль текущего пользователя
    return res.status(200).json(req.user)
  } catch (error) {
    logger.error(`Error in userProfile: ${error.message}`)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

//PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const id = req.user.id
  const { password } = req.body

  if (!password) {
    return res.status(400).json({ message: 'Fill in the password' })
  }

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const updatedUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        password: hashedPassword
      }
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    logger.error(`Error in updateUserProfile: ${error.message}`)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

export { authUser, registerUser, logoutUser, userProfile, updateUserProfile }