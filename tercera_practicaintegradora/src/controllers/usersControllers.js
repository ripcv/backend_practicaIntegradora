import * as UserService from "../services/usersService.js";

export async function createUser(newUser) {
  try {
    const result = await UserService.createUser(newUser);
    return result;
  } catch (error) {
    return res.redirect("/register");
  }
}

export async function findUser(username, password) {
  try {
    const result = await UserService.findUser(username, password);
    return result;
  } catch (error) {
   // return res.redirect("/login");
  }
}

export async function updateUser(userID, updates){
  //recibo el campo userID y los archivos a actualizar
  if(!userID || !updates)
    return res.redirect("/")

  //se envian al service
  const update = await UserService.updateUser(userID,updates)
  //recibo el usuario actualizado y redirijo al login
  if(!update){
    //manejo el error
    return false
  }
  //manejamos la actualizacion correcta
  return res.redirect("/")
}
