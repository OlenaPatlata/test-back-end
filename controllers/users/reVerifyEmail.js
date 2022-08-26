const { createError, sendMail } = require('../../helpers');
const { User } = require('../../models/user');
const reVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw createError(400, "Missing required field email")
  };
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Wrong email!");
  };
  const { verificationToken, verify } = user;
  if (verify) {
    throw createError(400, "Verification has already been passed of user");
  };

  const mail = {
    to: email,
    subject: 'Подтверждение email',
    html: `<p>Thanks for signing up with App! You must follow this link of registration to activate your account:</p></br><a target="_blank" href="https://test-back-end-1.herokuapp.com/api/users/verify/${verificationToken}">Verify email</a>`
  };
  await sendMail(mail);
  res.status(200).json("Verification email sent");
}
module.exports = reVerifyEmail;
