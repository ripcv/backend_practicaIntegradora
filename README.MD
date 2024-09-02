# Practica Integradora
Se integra todo lo visto en el curso en una sola aplicación que toma todo los recursos entregados

## Technologies
- @faker-js/faker: ^8.4.1
-  bcryptjs: ^2.4.3
-  body-parser: ^1.20.2
-  connect-flash: ^0.1.1
-  connect-mongo: ^5.1.0
-  dotenv: ^16.4.5 
-  express: ^4.19.2 
-  express-handlebars: ^7.1.2 
-  express-session: ^1.18.0 
-  mongoose: ^8.4.4 
-  mongoose-paginate-v2: ^1.8.2 
-  multer: ^1.4.5-lts.1 
-  nodemailer: ^6.9.14 
-  passport: ^0.7.0 
-  passport-github2: ^0.1.12 
-  passport-local: ^1.0.0 
-  socket.io: ^4.7.5 
-  swagger-jsdoc: ^6.2.8 
-  swagger-ui-express: ^5.0.1 
-  winston: ^3.13.1

#### All the App can be use in the browser
```http
localhost:8080
````

## Api Reference 

#### Get all product

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
| `user`      | `string` | **Required**. User (email or name) |
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


## Author

- [@Rodolfo Cavieres](https://github.com/ripcv/)

