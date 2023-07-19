const express = require('express');

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.post("/register", async (req, res) => {
    // Get the username and password from request body
    const { username, password } = req.body;
    
    // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Store hash in your password DB.
    try {
      const createUser =  await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });
      res.status(201).json({
        user: { id: createUser.id, username: createUser.username, password: createUser.password },
      });
    } catch (error) {
      res.status(404).json({
        message: "passwords do not match",
      });
    }

    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        // Get the username and password from the request body
    
        // Check that a user with that username exists in the database
    const foundUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    if(!foundUser){
        res.status(404).json({
            message: "invalid username or password"
    })
    } 
        // Use bcrypt to check that the provided password matches the hashed password on the user
    const passwordsMatch = await bcrypt.compare(password, foundUser.password)
    
        // If either of these checks fail, respond with a 401 "Invalid username or password" error
    
        if(!passwordsMatch){
            res.status(401).json({
                message: "username or password do not match"
        }) 
        }
    
        // If the user exists and the passwords match, create a JWT containing the username in the payload
     // Use the JWT_SECRET environment variable for the secret key
        const token = jwt.sign(foundUser.username, process.env.JWT_SECRET)
       
    
        // Send a JSON object with a "token" key back to the client, the value is the JWT created
    res.status(200).json({
        token
    })
    });

  });

module.exports = router;