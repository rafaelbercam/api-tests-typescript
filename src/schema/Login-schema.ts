import Joi = require('joi');

const loginSchema = Joi.object({
    message: Joi.string().required(),
    authorization: [Joi.string(),Joi.number()]
})

const loginFailSchema = Joi.object({
    message: Joi.string().required()
})

const loginEmailRequiredSchema = Joi.object({
    email: Joi.string().required()
})
module.exports = { loginFailSchema, loginSchema, loginEmailRequiredSchema};