import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import * as ProductController from "../controllers/productsControllers.js";
import { authorize, ROLES } from "../middleware/authRoles.js";

const router = Router();

router.post("/",  isAuthenticated, authorize([ROLES.admin]), ProductController.createProduct);

router.put("/:pid",   isAuthenticated, ProductController.updateProduct);

router.get("/:pid",  isAuthenticated, ProductController.getProductById);

router.delete("/:pid", authorize([ROLES.admin]), ProductController.deleteProduct);

router.get("/", isAuthenticated, ProductController.getAllProducts);

export default router;