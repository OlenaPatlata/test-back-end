const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../../models/user');
require('dotenv').config();
const { SECRET_KEY } = process.env;
const { createError } = require('../../helpers');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user =await User.findOne({ email });
  if (!user.verify) {
    throw createError(401, "Verification of email did not pass")
  };
  if (!user) {
    throw createError(401, "Wrong email")
  };
  const compareResult = await bcrypt.compare(password, user.password);
  if (!compareResult) {
    throw createError(401, "Wrong password")
  };
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token, user: { email: user.email } });
}
module.exports = login;