import mongoose from "mongoose";

const cartCollection = "Carritos"

const cartSchema = new mongoose.Schema({
    nombre: {type: String, required:true, max:100},
    apellido: {type: String, required:true, max:100},
    email: {type: String, required:true, max:50},

})

const cartModel = mongoose.model(cartCollection,cartSchema)

export default cartModel