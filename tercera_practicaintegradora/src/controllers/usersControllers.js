import * as UserService from "../services/usersService.js";

export async function createUser(newUser) {
  try {
    const result = await UserService.createUser(newUser);
    return result;
  } catch (error) {
    console.log(error)
    return res.redirect("/register");
  }
}

export async function findUser(username, password) {
  try {
    const result = await UserService.findUser(username, password);
    return result;
  } catch (error) {
    return res.redirect("/login");
  }
}
