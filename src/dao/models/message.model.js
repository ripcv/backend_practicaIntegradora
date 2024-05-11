import mongoose from "mongoose";

const messageCollection = "Mensajes"

const messageSchema = new mongoose.Schema({
    userID: {type: String, required:true, max:30},
    message: {type: String, required:true, max:200},

})

const messageModel = mongoose.model(messageCollection,messageSchema)

export default messageModel