export const generateCartErrorInfo = (cart) => {
    return `Existe un error en procesar la compra
    *Carrito vacio: ${cart.cart.total}`
}

export const generateUserErrorInfo = (user) => {
    return `
    *First_name: needs string ${user.first_name}`
}

export const generateProductErrorInfo = (product) => {
    console.log("Error Producto Update")
    console.log(product)
    return `Error al actualizar los productos
    *Title ${product.title}`
}