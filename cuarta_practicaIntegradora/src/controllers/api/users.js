import { upload, uploadPromise } from "../../middleware/upload.js";
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

  async updatePremiun(req, res) {
    const user = await UserService.getUserByID(req.user.id);
    if (user.role === "premiun") {
      return res
        .status(400)
        .json({ status: "error", message: "Usuario ya es premiun" });
    }
    await uploadPromise(req, res, upload.any());

    const documents = req.files.map((file) => ({
      name: file.fieldname,
      reference: file.filename,
    }));

    const result = await UserService.updateUser(req.user.id, {
      documents: documents,
      role: "premiun",
    }); 
  
    if(1<0){
      req.flash("error", "No se pudo actualizar los permisos");
    }else{
      req.flash("success", "Actualización Correcta, debe volver a iniciar sesion para ver los cambios");
    }
    res.redirect("/profile")
  }
}

export default ApiUserController;
