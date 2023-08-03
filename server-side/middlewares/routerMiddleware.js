const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

async function loggedAuth(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "INVALID_TOKEN" };
    }
    const payload = verifyToken(access_token);
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "unauthorized" };
    }

    req.idUser = {
      id: user.id,
      role: user.role,
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      address: user.address,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { loggedAuth };
