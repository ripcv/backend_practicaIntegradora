import { randomeToken, createHash , isValidPassword, sendMailToken} from "../utils.js";
import userModel from "../dao/models/users.model.js";
import UserRepository from "../repositories/user.repositories.js";
import { saveToken , deleteToken } from "../services/resetService.js";
import * as userController from '../controllers/usersControllers.js'
const userRepository = new UserRepository(userModel);

export async function resetPassword (req,res){
 const email = req.body.email
 const user =  await userRepository.findUser(email)
 if(!user){
   req.flash('error', 'Correo ingresado no valido' )
   return res.redirect("/reset_password")
 }
 const token = randomeToken()
 if(saveToken(user._id,token)){
   const url = `localhost:8080/change_password?token=${token}&id=${user._id}`
   sendMailToken(email,url)
   //se deja url por consola en caso de usar un correo que no exista
   console.log(url)
   req.flash('success', 'Link de recuperacion enviado' )
   res.redirect("/")
 }

}

export async function changePassword (req,res){
  console.log("ChangePassword")
   const userID = req.body.userID
   const password = req.body.password
   console.log(userID,password)
   const user =  await userRepository.findUser(userID)
  if(isValidPassword(user,password)){
    console.log("Clave igual")
   return "No Puede usar la misma clave"
  }else{
   const userUpdate = await userController.updateUser( userID, {password:createHash(password)}) 
   if(userUpdate)
   await deleteToken(userID)
    return res.redirect('/')
  }
  
}