import { Router } from "express";
import messageModel from "../dao/models/message.model.js";


const router = Router();


router.get('/', async(req, res) => {
   try {
    const messages = await messageModel.find({})
    res.render('index', {messages})
   } catch (error) {
    console.error("Error al cargar los mensajes", error)
    res.status(500).send("Error al cargar los mensajes")
   }
})

router.post('/', async(req, res)=> {
    try {
        const newMessage = new messageModel(req.body)
        if(!user || !mesasge){
            res.send({ status: "error", error: "Faltan parametros"})
        }
        await newMessage.save()
    } catch (error) {
        
    }
})


export default router