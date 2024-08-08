import mongoose from "mongoose";
import userModel from "../dao/models/users.model.js";

class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async createUser(newUser) {
    const user = await this.userModel.create(newUser);
    return user;
  }

  async findUser(identifier) {
    let query = {}

    if(mongoose.Types.ObjectId.isValid(identifier)){
      query = {_id : identifier}
    }else{
      query = {email:identifier}
    }
    const user = await this.userModel.findOne(query);
    return user;
  }

  async updateUser(userID, updates){
    const result = await userModel.updateOne(
      { _id: userID },
      { $set: updates }
    );
                                        
  return   result

  }
}

export default UserRepository;
