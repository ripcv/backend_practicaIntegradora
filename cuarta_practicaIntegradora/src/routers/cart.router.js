import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import * as CartsController from "../controllers/cartControllers.js";

const router = Router();

router.get("/",   isAuthenticated, CartsController.getAllCarts);

router.get("/:cid",  isAuthenticated,  CartsController.getCartByIdToRender);

router.post("/",   isAuthenticated,  CartsController.addProducts);

router.post("/:cid/purchase", isAuthenticated, CartsController.purchaseCart);

//El Put esta con problemas, se debe corregir su funcionamiento.
router.put("/:cid/products/:pid",  isAuthenticated,  CartsController.updateCartContent);

//Elimina el contenido del carrito seleccionado
router.delete("/:cid/",  isAuthenticated,  CartsController.deleteCartContent);

//Elimina producto del carrito seleccionado
router.delete("/:cid/products/:pid",   isAuthenticated, CartsController.deleteCartProduct);

export default router;
