const express = require("express");
const router = express.Router();
const { users: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/user');
const {  validation, authentication } = require('../../middlewares');

router.get('/', validation(schemas.checkAgeUser), ctrlWrapper(ctrl.checkAge));

router.post('/register', validation(schemas.registerUser), ctrlWrapper(ctrl.register));

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.get('/verify', validation(schemas.checkEmailSchema), ctrl.reVerifyEmail);

router.get('/login', validation(schemas.loginUser), ctrl.login);

router.get('/email', authentication, validation(schemas.checkEmailSchema), ctrl.findOneByEmail);

router.get('/logout', authentication, ctrlWrapper(ctrl.logout));


module.exports = router;