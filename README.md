# Shwapno Inventory Management System

This is a full-stack application built with Node.js, Express.js, MongoDB, and React.js. It is an inventory management system for a store.

## Features

- User authentication and authorization
- Barcode scanning using the camera
- Add products to inventory
- View all products in inventory
- Update product category

## Installation

- Clone the repository

- Run npm install in the root directory

- Run npm install in the frontend directory

- Create a MongoDB database

- In the root directory, create a .env file with:

      PORT=5000 (or match the port in frontend's proxy)

      JWT=your_jwt_secret

      MONGODB_URI=your_mongodb_connection_string

- In frontend/package.json, make sure:

      "proxy": "http://localhost:5000" (5000 - should be same as .env files PORT value)

- Connect to MongoDB in the backend using process.env.MONGODB_URI

- Run npm start in the root directory to start the backend

- Run npm start in the frontend directory to start the frontend

## Usage

- Create an account
- Log in
- Scan a barcode using the camera
- Add the product to your inventory
- View all products in your inventory
- Update the category of a product

## Technology Stack

- Frontend: React.js, React Hooks, React Router, React Bootstrap
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Database: MongoDB
- Authentication: JSON Web Tokens
