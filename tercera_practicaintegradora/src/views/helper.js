export const roleOwnerCheck = (userId, owner, isAdmin, options) => {
if(userId === owner.toString() || isAdmin){
    return options.fn(this)
}else{
    return options.inverse(this)
}
}

export const roleCheck = (role , isAdmin, options) => {
if(role === 'premiun' || isAdmin) {
    return options.fn(this)
}else{
    return options.inverse(this)
}

}