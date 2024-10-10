import express from 'express'
import {
  addCategory,
  allCategory,
  removeCategory,
  singleCategory
} from '../controllers/categoryController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/', allCategory)
router.get('/:slug', singleCategory)
router.post('/add', protect, addCategory)
router.delete('/remove/:id', removeCategory, protect)

export default router
