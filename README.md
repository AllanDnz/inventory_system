# Invetory System

[![My Skills](https://skillicons.dev/icons?i=nodejs,react,postgres,git)](https://skillicons.dev)

This is a stock management system with a front-end in React and a back-end in Node.js, using PostgreSQL as the database. This project allows you to manage products, customers and sales.

## Features
1. Registering products, customers and sales
2. Updating and removing records
3. Integration with a PostgreSQL database
4. Front-end interface developed with React

## Requirements
Before you start, make sure you have the following tools installed:

1. Node.js (v14 or higher)
2. PostgreSQL
3. Git
4. npm or Yarn

## Steps to Clone and Run
1. Clone the repository
Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/AllanDnz/estoque-system.git
```

2. Enter the project directory:

``` bash
cd estoque-system
```
3. Back-End configuration:

``` bash
cd backend
```
Install the necessary dependencies:

``` bash
npm install
```
4. Database configuration
Make sure PostgreSQL is running and configure the database as required. In the .env file in the backend directory, set the following environment variables:

```yaml 
DB_HOST=localhost
DB_USER= your_user
DB_PASSWORD=your_password
DB_NAME=your_db_name
DB_PORT=5432 << this is default port for postgres
```
Run the scripts to create the tables in the database:

```
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price NUMERIC,
    quantity INT
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    customer_id INT REFERENCES customers(id),
    quantity INT,
    total_price NUMERIC
);

```
Start the back-end server:
```bash
nodemon server.js
```
The server will be running on http://localhost:5000

5. Front-End Configuration

Now open a new terminal and enter the front-end directory and install dependencies:

```bash
npm install
```
Start the development server:
```bash
npm start
```
5. Testing the system
With both servers running, go to http://localhost:3000 in your browser to test the stock management system.

6. Additional environment variables
If there are more environment variables in the project, include an .env file in the backend directory and another in the frontend directory, with the variables according to your configuration.

If you need help or have any questions, get in touch via my [GitHub](https://github.com/AllanDnz).

## License

[![PyPI license](https://img.shields.io/pypi/l/ansicolortags.svg)](https://pypi.python.org/pypi/ansicolortags/)
