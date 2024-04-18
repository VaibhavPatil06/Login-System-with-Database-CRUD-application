# Simple Login System with CRUD Operations

This is a simple web application for user authentication and CRUD (Create, Read, Update, Delete) operations using Node.js, Express.js, and MySQL.

## Features

- **Login Page:** Allows users to login with their username and password. Users can also navigate to the registration page or the forget password page.
- **Registration Page:** Allows new users to register with their name, mobile number, email, and password.
- **Forget Password Page:** Allows users to reset their password by providing their mobile number and new password.
- **Home Page:** Provides options for users to change their password after logging in.
- **CRUD Operations:** Performs CRUD operations with MySQL database for managing user data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/Login-System.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Login-System
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up MySQL database:
   - Create a MySQL database.
   - Update the MySQL connection details in the `index.js` file to match your database configuration.

5. Start the server:
   ```bash
   npm start
   ```

6. Open your web browser and go to `http://localhost:3000` to access the application.

## Usage

- Navigate to the login page (`http://localhost:3000/login`) to login with your username and password.
- If you don't have an account, you can register by clicking the "Register" link on the login page.
- If you forget your password, you can reset it by clicking the "Forget Password" link on the login page and providing your mobile number and new password.
- After logging in, you can change your password by clicking the "Change Password" link on the home page.

## Technologies Used

- Node.js
- Express.js
- MySQL
- EJS
- CSS
- JavaScript
