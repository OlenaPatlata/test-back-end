const { createError } = require('../../helpers');

const checkAge = async (req, res) => {
  const { name, surname, age } = req.body;
  if (age <= 18) {
    throw createError(403,  "Age must be more then 18")
  }
  const message = `Hello ${name} ${surname}`
  res.status(200).json({ message });
};
module.exports = checkAge;