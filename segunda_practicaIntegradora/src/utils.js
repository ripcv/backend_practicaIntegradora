import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcryptjs'
import cartModel from './dao/models/cart.model.js'
const __filename = fileURLToPath(import.meta.url)


export const __dirname = dirname(__filename)

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

//Funcion para verfificar si existe un cartId asignado al usuario

export const addCartToUser = async (user) => {
    if(!user.cartId){
        const newCart = new cartModel();
        await newCart.save();
        user.cartId = newCart._id;
        await user.save();
    }
}