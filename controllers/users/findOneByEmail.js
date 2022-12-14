const { User } = require("../../models/user");
const { createError } = require('../../helpers');

const findOneByEmail = async (req, res) => {
  const { email } = req.body;
  const result = await User.findOne({ email }, "-createdAt -updatedAt -password -token -verify -verificationToken -age");
  if (!result) {
    throw createError(404, "Contact didn't find")
  };
  res.status(200).json(result);
  }
module.exports = findOneByEmail;