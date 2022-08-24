const { User } = require("../../models/user");
const { createError } = require('../../helpers');

const findOneByEmail = async (req, res) => {
  const { email } = req.params;
  const result = await User.findOne({email}, "-createdAt -updatedAt").populate("email name surname");
  if (!result) {
    throw createError(404, `Contact with email: ${email} didn't find`)
  };
  res.status(200).json(result);
  }
module.exports = findOneByEmail;