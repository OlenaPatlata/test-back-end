const express = require("express");
const router = express.Router();
const { users: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/user');
const { isValidId, validation } = require('../../middlewares');

router.get('/', validation(schemas.checkAgeUser), ctrlWrapper(ctrl.checkAge));

router.post('/register', validation(schemas.registerUser), ctrlWrapper(ctrl.register));

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.get('/verify', validation(schemas.verifyEmailSchema), ctrl.reVerifyEmail);

router.get('/login', validation(schemas.loginUser), ctrl.login);

router.get('/:email', ctrl.findOneByEmail);

router.get('/:id', isValidId );


module.exports = router;