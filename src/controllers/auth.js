const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    // get the payload
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    // include the payload in the request
    req.user = decoded;
    // pass control to next middleware
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
