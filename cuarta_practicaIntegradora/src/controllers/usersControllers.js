import * as UserService from "../services/usersService.js";

export async function createUser(newUser) {
  try {
    const result = await UserService.createUser(newUser);
    return result;
  } catch (error) {
   if(process.env.TEST_ENV){
    throw new Error("Error al crear el usuario: "+ error.message)
   }
   return res.redirect("/register");
  }
}

export async function findUser(username, password ) {
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
    return false

  //se envian al service
  const update = await UserService.updateUser(userID,updates)
  //recibo el usuario actualizado y redirijo al login
  if(!update){
    //manejo el error
    return false
  }
  //manejamos la actualizacion correcta
  return true
}


export async function apiUpdateUser(req,res){
   const userID = req.params.uid
   const updates = req.body.updates
  if(!userID || !updates)
    return res.status(400).json({ message: 'Datos incompletos' });

  //se envian al service
  const update = await UserService.updateUser(userID,updates)
  //recibo el usuario actualizado y redirijo al login
  if(!update){
    return res.status(400).json({ message: 'Error al actualizar el registro' });
  }
  if(process.env.TEST_ENV){
    return res.status(200).send({ status: "success",  message: "Actualización correcta" });
  }
  return res.status(200).json({ message: 'Actualización Correcta' });
}