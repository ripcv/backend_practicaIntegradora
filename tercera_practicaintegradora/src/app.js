import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import {roleOwnerCheck , roleCheck} from './views/helper.js'
import mongoose from "./config/database.js";
import MongoStore from "connect-mongo";
import sessionsRouter from "./routers/api/sessions.js";
import apiUser from "./routers/api/users.js"
import viewsRouter from "./routers/views.js";
import productRouters from "./routers/product.router.js";
import cartRouters from "./routers/cart.router.js";
import chatRouters from "./routers/chat.router.js";
import mockingRouter from "./routers/mocks.router.js"
import loggerRouter from "./routers/loggerTest.router.js"
import handleErrors from "./middleware/errors/index.js"
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import { __dirname } from "./utils.js";
import socketController from "./controllers/socketControllers.js";
import { Server } from "socket.io";
import path from "path";
import dotenv from "dotenv";
import { addLogger } from "./logger/logger.js";
import flash from 'connect-flash'
dotenv.config();
console.log("Tercera Practica Integradora");
const app = express();
const PORT = process.env.PORT;

const httpServer = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`),
);

const socketServer = new Server(httpServer);

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
    helpers:{
      roleOwnerCheck: roleOwnerCheck,
      roleCheck: roleCheck
    }
  }),
);

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 14 * 24 * 60 * 60, // le damos un tiempo de vida a la session de 14 días
    }),
    cookie: {
      maxAge: 1000 * 60 * 60, // se permite la session por 1 hora
      httpOnly: true,
    },
  }),
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(addLogger)
app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});
app.use(express.static(__dirname + "/public"));
//api
app.use("/api/sessions", sessionsRouter);
app.use("/api/users",apiUser);
//views
app.use("/", viewsRouter);
app.use("/products", productRouters);
app.use("/carts", cartRouters);
app.use("/chat", chatRouters);
app.use("/mockingproducts", mockingRouter);
app.use("/loggerview", loggerRouter)
app.use(handleErrors)
socketServer.on("connection", socketController);
/* 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); */
