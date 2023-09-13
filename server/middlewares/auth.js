const jwt = require("jsonwebtoken");

const { Users } = require("../models/Users");

const protect = async (req, res, next) => {
  try {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      // Get token from header
      const token = req?.headers?.authorization?.split(" ")[1];

      if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET);

      // Get User from token
      req.user = await Users.findById(decoded.id).select("-password");

      return next();
    }

    return res.status(401).json("No Authorization");
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.status(401).json("Jwt Expired");
    }

    console.log("protect", error);
    return res.status(500).json("Internal Server Error");
  }
};

const pResult = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) return res.status(400).json("Not Authorized");

    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await Users.findById(decoded.id);
    req.user = user

    if (user.role === "admin") return next();
    if (user.role === "form-teacher") return next();
    if (user.role === "student") return next()

    return res.status(400).json("Not Authorized")
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.status(401).json("Jwt Expired");
    }

    console.log("presult", error);
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = { protect, pResult };
