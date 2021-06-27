import Joi = require('joi');

const getUsersSchema = Joi.object().keys({
    quantidade: Joi.number().required(),
    usuarios: Joi.array().items(
      Joi.object({
        nome: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        administrador: Joi.string().required(),
        _id: Joi.string().regex(/^[a-zA-Z0-9]/).required()
      })
    )
})

const getUserByIdSchema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    administrador: Joi.string().required(),
    _id: Joi.string().regex(/^[a-zA-Z0-9]/).required()
})

module.exports = { getUsersSchema, getUserByIdSchema };