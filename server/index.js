import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path, { dirname } from 'path'
import cart from './routes/cart.js'
import category from './routes/category.js'
import order from './routes/order.js'
import product from './routes/product.js'
import user from './routes/user.js'

import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import { errorHandler, notFound } from './middleware/error.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(
  cors({ origin: 'http://localhost:3000', 'http://77.222.53.239:3000': true })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use('/api/users', user)
app.use('/api/category', category)
app.use('/api/products', product)
app.use('/api/orders', order)
app.use('/api/cart', cart)

//build root
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, 'client/dist')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  )
} else {
  app.get('/', (req, res) => res.send(`Server is ready`))
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
