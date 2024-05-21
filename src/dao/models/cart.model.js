import mongoose from "mongoose";

const cartCollection = "Carritos"

const cartSchema = new mongoose.Schema({
    user: {type: String, default:null},
    products: [ 
        {
            product: {type: String, default:[]},
            quantity: { type: Number , default:1}
        }
    ]

})

const cartModel = mongoose.model(cartCollection,cartSchema)

export default cartModel