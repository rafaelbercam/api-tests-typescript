import Joi = require('joi');

const getCartsSchema = Joi.object().keys({
    quantidade: Joi.number().required(),
    carrinhos: Joi.array().items(
      Joi.object({
          produtos: Joi.array().items(
              Joi.object({
                idProduto: Joi.string().regex(/^[a-zA-Z0-9]/).required(),
                quantidade: Joi.number().required(),
                precoUnitario: Joi.number().required()
              })
          ),
          precoTotal: Joi.number().required(),
          quantidadeTotal: Joi.number().required(),
          idUsuario: Joi.string().regex(/^[a-zA-Z0-9]/).required(),
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

const productNotFoundSchema = Joi.object().keys({
    message: Joi.string().required(),
    item: Joi.object().keys({
        index: Joi.number().required(),
        idProduto: Joi.string().required(),
        quantidade: Joi.number().required()
    }).required()
})

module.exports = { getCartsSchema , sucessMessageSchema, messageSchema, productNotFoundSchema};