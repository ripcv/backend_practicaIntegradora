import express from 'express'
import mongoose, { mongo } from 'mongoose'
import userRouters from './routers/user.router.js'
import productRouters from './routers/product.router.js'
import cartRouters from './routers/cart.router.js'
import messageRouters from './routers/message.router.js'
import dotenv from 'dotenv'
dotenv.config()
console.log(process.env.MONGO_URL)

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URL)
.then(()=> {console.log("Conectado a la base de datos")})
.catch(error => console.error("Error en la conexion", error))

app.use('/api/users', userRouters)
app.use('/api/products', productRouters)
app.use('/api/carts', cartRouters)
app.use('/api/message', messageRouters)

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})