import express from 'express'
import {
  addOrder,
  myOrders,
  orderId,
  removeOrder
} from '../controllers/orderController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/my', protect, myOrders)
router.get('/:id', protect, orderId)
router.post('/', protect, addOrder)
router.delete('/:id', protect, removeOrder)

export default router
