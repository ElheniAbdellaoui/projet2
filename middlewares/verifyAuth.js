const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const secret = config.get("secret");
exports.verifyAuthMiddleware = async (req, res, next) => {
  var token = req.headers.authorization;
  try {
    var decoded = jwt.verify(token, secret);
    if (!decoded) return res.status(400).json({ msg: "bad request" });
    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).json({ msg: "Unauthorized" });
    else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.send(500).json({ msg: "Internal server error" });
  }
};
