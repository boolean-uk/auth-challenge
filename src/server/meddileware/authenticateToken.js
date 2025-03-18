import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(401).json({ message: "Access Denied: Invalid token" });
    }
    // If the token is valid, it attaches the decoded user information to the req.user object as we need it in the next middleware function
    req.user = user;
    next();
  });
};
