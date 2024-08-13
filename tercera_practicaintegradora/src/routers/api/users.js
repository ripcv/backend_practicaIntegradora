import Router from 'express'
import * as userController from '../../controllers/usersControllers.js'

const router = Router()

router.get('/', (req,res)=>{
    console.log("user api")
})

router.put("/premium/:uid",userController.apiUpdateUser)

export default router