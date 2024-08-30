import Router from "express";
import * as userController from "../../controllers/api/users.js";

const ApiUserRouter = Router();

ApiUserRouter.get("/", (req, res) => {
  console.log("user api");
});
ApiUserRouter.put("/:uid", userController.apiUpdateUser);

ApiUserRouter.put("/premium/:uid", userController.apiUpdateUser);

export default ApiUserRouter;
