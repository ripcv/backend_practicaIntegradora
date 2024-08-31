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

  async updateUser(reqOrUserID, updateOrRes, res = null) {
    let userID, updates;
    if (typeof reqOrUserID === "object" && reqOrUserID.hasOwnProperty("body")) {
      const req = reqOrUserID;
      res = updateOrRes;
      userID = req.params.uid;
      updates = req.body;
    } else {
      userID = reqOrUserID;
      updates = updateOrRes;
    }

    if (!userID || !updates || Object.keys(updates).length === 0)
      return res
        .status(400)
        .json({ status: "error", message: "Faltan parámetros necesarios." });
    //se envian al service
    const update = await UserService.updateUser(userID, updates);
    //recibo el usuario actualizado y redirijo al login
    if (!update) {
      return res
        .status(400)
        .json({ status: "error", message: "Error al actualizar el usuario." });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Usuario actualizado." });
  }

  async uploadDocuments(req, res) {
    const user = await UserService.getUserByID(req.user.id);
    if (user.role === "premiun") {
      return res
        .status(400)
        .json({ status: "error", message: "Usuario ya es premiun" });
    }
    await uploadPromise(req, res, upload.any());

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Error al subir los archivos" });
    }

    const documents = req.files.map((file) => ({
      name: file.fieldname,
      reference: file.filename,
    }));

    const result = await UserService.updateUser(req.user.id, {
      documents,
    });

    if (!result) {
      req.flash("error", "No se pudo actualizar los permisos");
    } else {
      req.flash(
        "success",
        "Archivos subidos correctamente, los archivos seran verificados y una vez aprobados se actualizara su cuenta"
      );
    }
    res.redirect("/profile");
  }

  async updatePremiun(req, res) {
    const userID = req.params.uid;
    const user = await UserService.getUserByID(userID);

    if (user.documents.length != 0) {
      const update = await UserService.updateUser(userID, { role: "premiun" });
      if (!update)
        res
          .status(400)
          .json({
            status: "error",
            message: "Error al actualizar el usuario.",
          });

      res.status(200).json({ status: "success", message: "Upgrade exitoso." });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Faltan archivos necesarios." });
    }
  }
}

export default ApiUserController;
