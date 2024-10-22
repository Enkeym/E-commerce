import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma/prisma-client.js'
import logger from '../utils/logger.js'

// GET /api/orders
const myOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        productsInOrder: {
          include: {
            product: true
          }
        }
      }
    })

    res.status(200).json(orders || [])
  } catch (error) {
    logger.error(`Error in myOrders: ${error.message}`)
    res.status(500).json({ message: 'Failed to fetch orders' })
  }
})

// POST /api/orders
const addOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { products: true }
    })

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    const order = await prisma.order.create({
      data: {
        productsInOrder: {
          create: cart.products.map((item) => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            total: item.total
          }))
        },
        userId,
        status: 'Pending'
      },
      include: {
        productsInOrder: {
          include: {
            product: true
          }
        }
      }
    })

    await prisma.cartProduct.deleteMany({
      where: { cartId: cart.id }
    })

    res.status(201).json(order)
  } catch (error) {
    logger.error(`Error in addOrder: ${error.message}`)
    res.status(400).json({ message: 'Failed to create order' })
  }
})

// GET /api/orders/:id
const orderId = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        productsInOrder: {
          include: {
            product: true
          }
        }
      }
    })

    if (!order) {
      logger.error(`Order not found: ${id}`)
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json(order)
  } catch (error) {
    logger.error(`Error in orderId: ${error.message}`)
    res.status(500).json({ message: 'Failed to fetch order' })
  }
})

// DELETE /api/orders/:id
const removeOrder = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const existingOrder = await prisma.order.findUnique({
      where: { id }
    })

    if (!existingOrder) {
      logger.error(`Order not found: ${id}`)
      return res.status(404).json({ message: 'Order not found' })
    }

    await prisma.productInOrder.deleteMany({
      where: { orderId: id }
    })

    await prisma.order.delete({
      where: { id }
    })

    res.status(204).end()
  } catch (error) {
    logger.error(`Error in removeOrder: ${error.message}`)
    res.status(500).json({ message: 'Failed to remove order' })
  }
})

export { addOrder, myOrders, orderId, removeOrder }
