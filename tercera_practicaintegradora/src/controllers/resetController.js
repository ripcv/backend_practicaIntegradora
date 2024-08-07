import { randomeToken, createHash} from "../utils.js";
import userModel from "../dao/models/users.model.js";
import UserRepository from "../repositories/user.repositories.js";
import { saveToken } from "../services/resetService.js";
import * as userController from '../controllers/usersControllers.js'

const userRepository = new UserRepository(userModel);

export async function resetPassword (req,res){
 const email = req.body.email
 const user =  await userRepository.findUser(email)
 if(!user){
    return
 }
 const token = randomeToken()
 saveToken(user._id,token)
}

export async function changePassword (req,res){
   const userID = req.body.userID
   const password = req.body.password
   
   const userUpdate = await userController.updateUser(userID,{password:createHash(password)})
   if(!userUpdate)
      //manejamos el error
   return res.redirect("/")
}