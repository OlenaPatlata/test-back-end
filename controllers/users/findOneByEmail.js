const { User } = require("../../models/user");
const { createError } = require('../../helpers');

const findOneByEmail = async (req, res) => {
  const { email } = req.body;
  const result = await User.find({email}, "-createdAt -updatedAt -password -token -verify -verificationToken -age");
  if (!result[0]?.name) {
    throw createError(404, `Contact with email: ${email} didn't find`)
  };
  res.status(200).json(result);
  }
module.exports = findOneByEmail;