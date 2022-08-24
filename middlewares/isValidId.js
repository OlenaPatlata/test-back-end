const { isValidObjectId } = require('mongoose');
const { createError } = require('../helpers');
const isValidId = (req, res, next) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    next(createError(400, "Not id"));
    return;
  }
  next();
};
module.exports = isValidId;
