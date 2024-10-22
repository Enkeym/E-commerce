import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma-client.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await prisma.user.findUnique({ where: { id: decoded.id } })

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' })
    }

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401)
      throw new Error('Token expired, please login again')
    } else {
      res.status(401)
      throw new Error('Not authorized, invalid token')
    }
  }
})

export { protect }
