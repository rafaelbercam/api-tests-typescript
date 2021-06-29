import { expect } from "chai";
import Joi = require("joi");
import CartFactory from "../factory/Cart-factory";
import ProductFactory from "../factory/Product-factory";
import UserFactory from "../factory/User-factory";
import { canceledPurchase, completedPurchase, getCarts, postCart } from "../services/Cart.service";
import { returnToken } from "../services/Login-service";
import { postProduct } from "../services/Product-service";
import { postUser } from "../services/Users-service";

const schema = require('../schema/Cart-schema');

let response: any;
let user: any;
let token: string;

describe('Cart test request', async ()=>{

    before(async () => {
        user = UserFactory.createUser();
        await postUser(user);
        token = await returnToken(user);
    })

    it('get carts', async () => {
      response = await getCarts();
      expect(response.statusCode).to.eq(200);
      expect(response.body).haveOwnProperty('carrinhos');
      Joi.assert(response.body, schema.getCartsSchema)
    })

    it('post new cart - success', async () => {
        let product:any = await ProductFactory.createNewProduct();
        let responseProd:any = await postProduct(product, token);
        let _id:string = responseProd.body._id;
        let cart: any = CartFactory.createNewCart(_id,3);
        response = await postCart(cart, token); 
        expect(response.statusCode).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        Joi.assert(response.body, schema.sucessMessageSchema)
      })

      it('post new cart - Failed - more than 1 cart ', async () => {
        let product:any = await ProductFactory.createNewProduct();
        let responseProd:any = await postProduct(product, token);
        let _id:string = responseProd.body._id;
        let cart:any = await CartFactory.createNewCart(_id,3);
        response = await postCart(cart, token);
        expect(response.statusCode).to.eq(400);
        expect(response.body.message).to.eq('Não é permitido ter mais de 1 carrinho');
        Joi.assert(response.body, schema.messageSchema)
      })

      it('delete cart - completed purchase ', async () => {
        response = await completedPurchase(token);
        expect(response.statusCode).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
        Joi.assert(response.body, schema.messageSchema)
      })

      it('post new cart - Failed - product not found ', async () => {
        let product:any = ProductFactory.createNewProduct();
        let responseProd:any = await postProduct(product, token);
        let _id:string = responseProd.body._id;
        let cart:any = CartFactory.createNewCart('_id',3);
        response = await postCart(cart, token);
        expect(response.statusCode).to.eq(400);
        expect(response.body.message).to.eq('Produto não encontrado');
        console.log(response.body);
        
        Joi.assert(response.body, schema.productNotFoundSchema)
      })

      it('delete cart - canceled purchase ', async () => {
        let product:any = ProductFactory.createNewProduct();
        let responseProd:any = await postProduct(product, token);
        let _id:string = responseProd.body._id;
        let cart:any = CartFactory.createNewCart(_id,3);
        response = await postCart(cart, token);
        expect(response.statusCode).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        
        response = await canceledPurchase(token);
        expect(response.statusCode).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso. Estoque dos produtos reabastecido');
        Joi.assert(response.body, schema.messageSchema)
      })
})