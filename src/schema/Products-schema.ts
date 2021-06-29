import Joi = require('joi');

const getProductsSchema = Joi.object().keys({
    quantidade: Joi.number().required(),
    produtos: Joi.array().items(
      Joi.object({
        nome: Joi.string().required(),
        preco: Joi.number().required(),
        descricao: Joi.string().required(),
        quantidade: Joi.number().required(),
        _id: Joi.string().regex(/^[a-zA-Z0-9]/).required()
      })
    )
})

const sucessMessageSchema = Joi.object().keys({
    message: Joi.string().required(),
    _id: Joi.string().regex(/^[a-zA-Z0-9]/).required()
})

const messageSchema = Joi.object().keys({
    message: Joi.string().required()
})

const getProductByIdSchema = Joi.object().keys({
    nome: Joi.string().required(),
    preco: Joi.number().required(),
    descricao: Joi.string().required(),
    quantidade: Joi.number().required(),
    _id: Joi.string().regex(/^[a-zA-Z0-9]/).required()
})

module.exports = { messageSchema, getProductsSchema, sucessMessageSchema, getProductByIdSchema };