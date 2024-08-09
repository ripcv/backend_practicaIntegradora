import { Router } from "express";
import passport from "passport";
import { logger } from '../../logger/logger.js'
import { resetPassword , changePassword} from "../../controllers/resetController.js";
const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "failregister" }),
  async (req, res) => {
    res.redirect("/");
  },
);

router.post("/reset_password", resetPassword)

router.post("/change_password", changePassword)

router.get("/failregister", (req, res) => {
  logger.warning("Fallo al registrar");
  res.redirect('/register')
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "faillogin" }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Datos incompletos" });
    try {
      req.session.user = {
        id: req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role || "",
        cartId: req.user.cartId,
      };

      res.redirect("/products");
    } catch (err) {
      res.status(500).send("Error al iniciar sesión");
    }
  },
);

router.get("/faillogin", (req, res) => {
  logger.warning(`Error al logear, usuario o clave incorrecta`)
  req.flash('error', 'Error al logear, usuario o clave incorrecta');
  res.redirect('/');
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error al cerrar sesión");
    res.redirect("/");
  });
});



router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {},
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/products");
  },
);

export default router;
