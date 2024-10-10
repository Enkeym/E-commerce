import express from 'express'
import {
  addProducts,
  allProducts,
  editProducts,
  myProducts,
  productId,
  removeProducts
} from '../controllers/productController.js'
import { protect } from '../middleware/auth.js'
import upload from '../middleware/multerConfig.js'

const router = express.Router()

router.get('/', allProducts)
router.get('/:id', productId)
router.get('/my/:userId', protect, myProducts)
router.post('/add', protect, upload.single('image'), addProducts)
router.delete('/remove/:id', protect, removeProducts)
router.put('/edit/:id', protect, upload.single('image'), editProducts)

export default router
