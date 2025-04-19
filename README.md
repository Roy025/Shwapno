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
- Run `npm install` in the root directory
- Run `npm install` in the frontend directory
- Create a MongoDB database and add the connection string to the `.env` file
- Create a `.env` file with the following information:
  - `PORT=your_port_number`
  - `JWT=your_jwt_secret`
  - `MONGODB_URI=your_mongodb_connection_string`
- Connect to the MongoDB database by `npm start` in root file
- Run `npm start` in the frontend directory

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
