import tokenModel from "../dao/models/token.model.js";

export async function saveToken(userId,token){
    const tokenData = {
        userID : userId,
        token: token,
    }

    const result = await tokenModel.create(tokenData)
}

export async function validToken(userID,token){
   try {
    const result = await tokenModel.findOne({userID})
    if(!result){
    
       return false   
    }
    if(token===result.token){
        return true
    }
    return false
   } catch (error) {
    
   }

}