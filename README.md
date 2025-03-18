# CineNote

CineNote is a simple full-stack web application that allows users to create an account, record their favorite movies, and manage their movie list. With a simple and intuitive interface, users can easily add movie titles, descriptions, and run times, as well as delete movies they no longer want to keep track of. You can visit the live version of CineNote [here](https://cinenote.netlify.app/).

![My Project Home Page](./assets/home-page.png)

## Note

For deployment purposes, this repository has been divided into two separate repositories:

- [CineNote Client Repo](https://github.com/Hamada-AB/cinenote-client)
- [CineNote Server Repo](https://github.com/Hamada-AB/cinenote-server)

## Overview

CineNote is designed to be a personal movie address book where users can log and manage their favorite movies. This application is perfect for movie enthusiasts who want to keep a record of movies they've watched or plan to watch in the future.

## Features

- **User Authentication**: Users can create an account (signup) and log in securely using JWT and bcrypt for authentication.
- **Movie Management**: Users can add movies to their list by entering the title, description, and run time. Movies can also be deleted if they are no longer needed.
- **Design**: The app is built with plain CSS.

## Technologies Used

### Frontend

- **HTML**
- **CSS**
- **JavaScript**
- **React**

### Backend

- **Express.js**: For building the RESTful API
- **Prisma**: As the ORM for database management
- **PostgreSQL**: For the relational database
- **JWT (JSON Web Tokens)**: For secure user authentication
- **bcrypt**: For hashing passwords

## Installation

### ⚠️ Important: Fork Before You Clone

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. **Fork the repository**:

   - Click the "Fork" button at the top right corner of the repository page to create your own copy of the repository.

2. **Clone the repository**:

   - Clone the forked repository to your local machine:

   ```bash
   git clone <your-forked-repository-url>

   ```

3. **Navigate to the project directory.**

4. **Install dependencies:**

   ```bash
   npm install

   ```

5. **Set Up Environment Variables:**

   ```bash
   # In .env file
   DATABASE_URL=your_postgresql_database_url
   JWT_SECRET=your_jwt_secret_key

   ```

6. **Run the database migrations:**

   ```bash
   npx prisma migrate deploy

   ```

7. **Run the Application:**

   - Server

   ```bash
   npm start

   ```

   - Client

   ```bash
   npm run dev
   ```

## Contact

For any questions or feedback, please contact [Hamada](https://hmad.netlify.app/).
