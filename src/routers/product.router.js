import { Router } from "express";
import productModel from "../dao/models/product.model.js";

const router = Router();

router.get('/', async(req, res) => {
    try {
        let products = await productModel.find()
        res.send({ result: "success" , payload: products})
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async(req, res)=> {
    let {title, description, code, price,stock,category,thumbnail,status=true} = req.body
    if(!title || !description || !code || !price || !stock || !category ){
        res.send({status: "error", error: "Ingrese todo los campos requeridos"})
    }
    let result = await productModel.create({title,description,code,price,stock,category,thumbnail,status})
    res.send({ result: "success", payload: result })
})

router.put('/', async(req,res)=> {
    res.send('Put request to the homepage')
})

router.delete('/', async(req, res) => {
    res.send('Delete request to the hombepage')
})

export default router