const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const registerUser = async (req, res) => {

    const { username, password } = req.body // recieving user input from the post request

    // queries the DB with the inputted information and stores the response in the const
    const userSearch = await prisma.user.findUnique({
        where: {
             username 
            },
      });

      if (!userSearch) {
        return res.status(401).json({ e: "User Not Found" });
      }   


      const passwordVerification = await bcrypt.compare(password, userSearch.password);
      if (!passwordVerification) {
        return res.status(401).json({ e: "Password is incorrect." });
      }

}