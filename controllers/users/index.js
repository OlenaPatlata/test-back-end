const register = require('./register');
const checkAge = require('./checkAge');
const verifyEmail = require('./verifyEmail');
const reVerifyEmail = require('./reVerifyEmail');
const login = require('./login');
const findOneByEmail = require('./findOneByEmail');


module.exports = {
  checkAge,
  register,
  verifyEmail,
  reVerifyEmail,
  login,
  findOneByEmail
};
