# ProShop MERN eCommerce application

> FullStack application created while taking the course MERN eCommerce From Scratch by Brad Traversy.

![screenshot](frontend/public/images/ScreenShot.png)

## Features

- Shopping cart with PayPal integration
- Search capability
- Product pagination
- User authentication and authorization
- User profile with orders
- Admin functionality for managing user, order and products
- Database seeder

## Usage

### ES Modules in Node

Uses ECMAScript Modules in the backend in this project. Node v14.6+ or higher.

### Env Variables

Create a /config/config.env file and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'areallysecretkeyhere'
PAYPAL_CLIENT_ID = your paypal client id
```

### Setup

- Requires Mongo DB running locally or on Atlas
- PayPal Client Id from developer sandbox

## Technologies

_FrontEnd_

- axios
- dotenv
- create-react-app
- react
- react-bootstrap
- react-dom
- react-router-dom
- redux
- others...

_BackEnd_

- bcryptjs
- colors
- dotenv
- express
- jsonwebtoken
- mongoose
- morgan
- multer
- Node.js
- Mongo DB Atlas
- others...

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
password

john@example.com (Customer)
password

jane@example.com (Customer)
password
```

## Links

- Project homepage: https://github.com/rhoofr/proshop
- [heroku-deployment](https://proshop-hoofsoft.herokuapp.com/)

## License

> You can check out the full license [here](https://github.com/rhoofr/proshop/blob/main/LICENSE)

This project is licensed under the terms of the **MIT** license.
