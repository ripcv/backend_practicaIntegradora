import Router from "express";
import ApiUserController from "../../controllers/api/users.js";

const ApiUserRouter = Router();
const ApiUser = new ApiUserController()

ApiUserRouter.get("/", (req, res) => {
  console.log("user api");
});

ApiUserRouter.put("/:uid", ApiUser.updateUser);

ApiUserRouter.put("/premium/:uid", ApiUser.updatePremiun);

ApiUserRouter.post("/:uid/documents", ApiUser.uploadDocuments)

export default ApiUserRouter;
