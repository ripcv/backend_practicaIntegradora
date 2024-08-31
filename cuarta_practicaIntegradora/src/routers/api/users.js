import Router from "express";
import ApiUserController from "../../controllers/api/users.js";

const ApiUserRouter = Router();
const ApiUser = new ApiUserController()

ApiUserRouter.get("/", (req, res) => {
  console.log("user api");
});

ApiUserRouter.put("/:uid", ApiUser.updateUser);

ApiUserRouter.put("/premium/:uid", ApiUser.updateUser);

ApiUserRouter.post("/:uid/documents", ApiUser.updatePremiun)

export default ApiUserRouter;
