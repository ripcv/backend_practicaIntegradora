# Practica Integradora
Se integra todo lo visto en el curso en una sola aplicación que toma todo los recursos entregados

## Technologies
- Node.js vv20.12.2
- Express v4.19.2
- Mongoose v1.0.0
- Socket.IO v4.7.5
- Express-Handlebars v7.1.2
- Dotenv v16.4.5

## API Reference
All the app can be used with postman, except for the chat, wich is viewed through the browser.

#### Get all products

```http
  GET /api/products
```
Return all products in DB

#### Get single product

```http
  GET /api/products/${pid}
```
Return specific products in DB

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of item to fetch |


#### Create a product

```http
  POST /api/products/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of Event |
| `description`      | `string` | **Required**. Description of Event |
| `code`      | `string` | **Required**. Code of Event |
| `price`      | `number` | **Required**. Price of Event |
| `stock`      | `number` | **Required**. Stock tickets |
| `category`      | `string` | **Required**. Category of Event |
| `thumbnails`      | `string` | Picture or Flayer |


#### Update a product

```http
  PUT /api/products/${pid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` |  Title of Event |
| `description`      | `string` |  Description of Event |
| `code`      | `string` |  Code of Event |
| `price`      | `number` |  Price of Event |
| `stock`      | `number` |  Stock tickets |
| `category`      | `string` |  Category of Event |
| `thumbnails`      | `string` | Picture or Flayer |


#### Delete a product

```http
  DELETE /api/products/${pid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of event to delete |



#### Get a Cart
```http
  GET /api/carts/
```
Return all carts in DB

```http
  GET /api/carts/${cid}
```
Return specific carts in DB

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of item to fetch |



#### Create a Cart

```http
  POST /api/carts/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`      | `string` | **Required**. User (correo o nombre) |
|`products` | `array`| Object that includes the N data below|
| `product`      | `number` | **Required**.ID of Product to add |
| `quantity`      | `number` | 1 by default |
```json
{
  "user": "user@user.user",
     "products": [
      {
        "product": "Producto 1",
        "quantity": 1
      },
      {
        "product": "Producto 2"
      }
    ]
}
```
### Chat
To use the chat, simply navigate to the following URL and login with your mail o username

```http
  localhost:8080/api/chat/
```


## Author

- [@Rodolfo Cavieres](https://github.com/ripcv/)

