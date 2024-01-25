const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Missing JWT token" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      return res.status(403).json({ error: "Forbidden - Invalid JWT token" });
    }

    const user = await User.findById(decodedToken.user_id);
    if (!user) {
      return res.status(403).json({ error: "Forbidden - User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Unauthorized - Token has expired" });
    }

    console.error(error);
    return res
      .status(403)
      .json({ error: `Forbidden - Invalid JWT token` });
  }
};

module.exports = { verifyJWT };
