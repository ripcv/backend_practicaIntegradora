import mongoose from "mongoose";

const cartCollection = "Carritos"

const cartSchema = new mongoose.Schema({
    user: {type: String,  max:100},
    products: [ 
        {
            product: {type: String},
            quantity: { type: Number , default:1}
        }
    ]

})

const cartModel = mongoose.model(cartCollection,cartSchema)

export default cartModel