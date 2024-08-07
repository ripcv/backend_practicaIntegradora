import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcryptjs";
import cartModel from "./dao/models/cart.model.js";
import userModel from "./dao/models/users.model.js";
import nodemailer from "nodemailer";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import { loggers } from "winston";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

//Funcion para verfificar si existe un cartId asignado al usuario

export const addCartToUser = async (userId) => {
  try {
    const updateUser = await userModel.findById(userId);
    if (!updateUser.cartId) {
      const newCart = new cartModel();
      await newCart.save();
      updateUser.cartId = newCart._id;
      await updateUser.save();
    }
    return updateUser.cartId;
  } catch (error) {
    loggers.error(`No se pudo agregar el carrito al usuario ${error.message}`)
    throw err;
  }
};

export const codeTicketGenerator = async (cartId) => {
  const lastFourDigits = cartId.toString().slice(-2);
  const currentDate = new Date();
  const formattedTime = currentDate
    .toTimeString()
    .slice(0, 8)
    .replace(/:/g, "");
  return `CP${lastFourDigits}${formattedTime}`;
};

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASSWORD_MAIL,
  },
});

export async function sendMail(email, ticket) {
  let result = await transport.sendMail({
    from: "Compra Exitosa <gefallene.engel@gmail.com>",
    to: email,
    subject: `Orden ${ticket.code}`,
    html: `
    <div>
     <h1>Orden completada</h1>
     <p> Se realizo una compra por: ${ticket.amount} </p>
    </div>
    `,
  });
}


export async function mockingProducts(){
  let products = {
    payload : [],
    categories : []
  }
  for (let i=0; i<100; i++){
    const product = {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: faker.string.octal({ length: 6, prefix: 'CE' }),
      price: faker.commerce.price(),
      stock: faker.number.int({ min: 15000, max: 35000 }),
      category: faker.commerce.productAdjective(),
      thumbnail: faker.image.url()
    }
    products.payload.push(product)
  }
  const categorySet = new Set();
  products.payload.forEach(p => {
    categorySet.add(p.category);
  });
  
  products.categories = Array.from(categorySet);
  
  return products
}

export const randomeToken = () =>{
 return createHash(faker.lorem.word(5))
}

