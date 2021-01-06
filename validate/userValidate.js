const Joi = require('joi')
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).max(20).required(),
    mobile: Joi.number().required(),
    DOB: Joi.date().required()
})

const validateUser = (data) => schema.validate(data)
module.exports = validateUser