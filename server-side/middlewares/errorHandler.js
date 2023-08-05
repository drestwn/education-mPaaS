function dataErrors(err, req, res, next) {
  // console.log(err)
  let code = 500;
  let msg = `Internal server Error`;
  //400 data tidak lengkap atau salah format
  //401 format dan data benar, tapi salah salah satu

  if (err.name === "USER_NOT_FOUND") {
    //error login email
    code = 400;
    msg = "Email not found";
  } else if (err.name === "LOGIN_INVALID") {
    //error login password
    code = 400;
    msg = "Password not valid";
    // } else if (err.message === "USER_CREATE_FAILED") { //error create user ??? masih nanti
    //     code = 400;
    //     msg = "Bad Request";
  } else if (err.message === "INVALID_TOKEN") {
    //error invalid token user
    code = 401;
    msg = "Unauthorized, Invalid Token";
  } else if (err.name === "NOT_ENOUGH_ACCESS") {
    //error AuthZ tidak ada acces token / bukan role admin
    code = 403;
    msg = "Forbiden Access";
  } else if (err.name === "NOT_FOUND") {
    //error detail Products gak ada ID
    code = 404;
    msg = "Post not found";
  } else if (err.name === "SequelizeValidationError") {
    // error post product &  register (email/password)
    code = 400;
    // msg = "password not valid";
    msg = err.errors.map((el) => el.message);
  } else if (err.name === "SequelizeUniqueConstraintError") {
    //error detail Products gak ada ID
    code = 400;
  } else if (err.name === "DATANOTREADY") {
    code = 404;
    msg = "Please fill All Data";
  }
  res.status(code).json({
    error: msg,
  });
}
module.exports = dataErrors;
