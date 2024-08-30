import userModel from "../dao/models/users.model.js";
import { isValidPassword } from "../utils.js";
import UserDto from "../dto/user.dto.js";
import UserRepository from "../repositories/user.repositories.js";
import { addCartToUser } from "../utils.js";
import { logger } from '../logger/logger.js'

const userRepository = new UserRepository(userModel);

export async function createUser(newUser) {
  try {
    let user = await userRepository.findUser(newUser.email);
    if (user) {
      logger.warning("El usuario ya existe");
      return { success: false, message: "El usuario ya existe" };;
    }
    const result = await userRepository.createUser(newUser);
    return { success: true, data: result };
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
  }
}

export async function findUser(username, password) {
  try {
    const user = await userRepository.findUser(username);

    if (!user) {
      return;
    }
    if (!isValidPassword(user, password)) return false;
    const userDTO = new UserDto(
      user._id,
      user.first_name,
      user.last_name,
      user.email,
      user.age,
      user.role,
      user.cartId ? user.cartId._id : null,
    );
    const newCartId = await addCartToUser(user._id);
    if (newCartId) userDTO.cartId = newCartId;
    return userDTO;
  } catch (error) {
    return "Error al validar usuario" + error;
  }
}


export async function updateUser(userID, updates){
   try {
    const userUpdate = await userRepository.updateUser(userID, updates)
    if(!userUpdate){
      //error al actualizar
    }
    return true
   } catch (error) {
    
   }
}