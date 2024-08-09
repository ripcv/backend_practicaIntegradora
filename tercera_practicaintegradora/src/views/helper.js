export const roleOwnerCheck = (userId, owner, isAdmin, options) => {
if(userId === owner.toString() || isAdmin === 'admin'){
    return options.fn(this)
}else{
    return options.inverse(this)
}
}

export const roleCheck = (role , options) => {
if(role === 'premiun' || role === 'admin') {
    return options.fn(this)
}else{
    return options.inverse(this)
}

}