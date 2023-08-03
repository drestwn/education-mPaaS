if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRETKEY;

const signToken = (payload) => {
  //payload adalah data usernya
  return jwt.sign(payload, SECRETKEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRETKEY);
};

module.exports = { signToken, verifyToken };
