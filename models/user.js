const { Schema, model } = require('mongoose');
const Joi = require('joi');
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const checkAgeUser = Joi.object({
  name: Joi.string().min(1).required(),
  surname: Joi.string().min(1).required(),
  age: Joi.number().min(1).max(110).required()
});
const registerUser = Joi.object({
  name: Joi.string().min(1).required(),
  surname: Joi.string().min(1).required(),
  age: Joi.number().min(1).max(110).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  token: Joi.string().default('')
});
const checkEmailSchema= Joi.object({
    email: Joi.string().required().pattern(emailRegexp)
});
const loginUser = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required()
});
const schemas = {
  checkAgeUser,
  registerUser,
  checkEmailSchema,
  loginUser
};
const userSchema = Schema({
  name: { type: String, required: [true, 'Name is required'] },
  surname: { type: String, required: [true, 'Surname is required'] },
  age: { type: Number, min: 1, max: 110, required: [true, 'Age is required'] },
  email: { type: String, uniqu: true, match: emailRegexp, required: [true, 'Email is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  token: { type: String, default: "" },
  verify: {type:Boolean, default:false},
  verificationToken: {type: String, required:[true, "Verify token is required"]}
}, { versionKey: false, timestamps: true });
const User = model('user', userSchema);

module.exports = { User, schemas };

