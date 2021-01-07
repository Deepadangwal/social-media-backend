const Joi = require('joi');

//validation for registrationSchema
const registerSchema = Joi.object({
	name: Joi.string().min(6).required(),
	email: Joi.string().email().min(6).required(),
	password: Joi.string().min(6).max(20).required(),
	mobile: Joi.number().required(),
	DOB: Joi.date().required()
});
const validateUserRegistration = (data) => registerSchema.validate(data);

//validation for loginSchema
const loginSchema = Joi.object({
	email: Joi.string().email().min(6).required(),
	password: Joi.string().min(6).max(20).required()
});
const validateUserLogin = (data) => loginSchema.validate(data);

module.exports.validateUserRegistration = validateUserRegistration;
module.exports.validateUserLogin = validateUserLogin;
