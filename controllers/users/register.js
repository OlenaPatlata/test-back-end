const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const { createError, sendMail } = require('../../helpers');
const { v4  } = require('uuid');

const register = async (req, res) => {
  const { email, password, age } = req.body;
  if (age <= 18) {
    throw createError(403, "Age must be more then 18")
  };
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email use")
  };
  const verificationToken = v4();

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword, verificationToken });
  const mail = {
    to: email,
    subject: 'Подтверждение email',
    html: `<p>Thanks for signing up with App! You must follow this link of registration to activate your account:</p></br><a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verify email</a>`
  };
  await sendMail(mail);
  res.status(201).json({"message":"Ready"});
};

module.exports = register;