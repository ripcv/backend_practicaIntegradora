import * as UserService from "../../services/usersService.js";

class ApiUserController {
  async createUser(newUser) {
    try {
      const result = await UserService.createUser(newUser);
      return result;
    } catch (error) {
      if (process.env.TEST_ENV) {
        throw new Error("Error al crear el usuario: " + error.message);
      }
      return res.redirect("/register");
    }
  }

  async loginFindUser(username, password) {
    try {
      const result = await UserService.loginFindUser(username, password);
      return result;
    } catch (error) {
      // return res.redirect("/login");
    }
  }

  async updateUser(userID, updates) {
    //recibo el campo userID y los archivos a actualizar
    if (!userID || !updates) return false;
    //se envian al service
    const update = await UserService.updateUser(userID, updates);
    //recibo el usuario actualizado y redirijo al login
    if (!update) {
      //manejo el error
      return false;
    }
    //manejamos la actualizacion correcta
    return true;
  }

}


export default ApiUserController