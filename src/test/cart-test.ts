import { expect } from "chai";
import Joi = require("joi");
import CartFactory from "../factory/cart-factory";
import ProductFactory from "../factory/product-factory";
import UserFactory from "../factory/user-factory";
import { canceledPurchase, completedPurchase, getCarts, getCartsByUserId, postCart } from "../services/cart-service";
import { returnToken } from "../services/login-service";
import { postProduct } from "../services/product-service";
import { postUser } from "../services/users-service";

const schema = require('../schema/cart-schema');

let response: any;
let user: any;
let token: string;
let idUser: String;

describe('Cart test request', async ()=>{

    beforeEach(async () => {
        user = UserFactory.createUser();
        response = await postUser(user);
        idUser = response.body._id
        token = await returnToken(user);
    })

    it('get carts', async () => {
      response = await getCarts();
      expect(response.statusCode).to.eq(200);
      expect(response.body).haveOwnProperty('carrinhos');
      Joi.assert(response.body, schema.getCartsSchema)
    })

    it('post new cart - success', async () => {
        let product:any = ProductFactory.createNewProduct();
        let responseProd:any = await postProduct(product, token);
        let _id:string = responseProd.body._id;
        let cart: any = CartFactory.createNewCart(_id,3);
        response = await postCart(cart, token); 
        expect(response.statusCode).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        Joi.assert(response.body, schema.sucessMessageSchema)
      })

      it('post new cart - Failed - more than 1 cart ', async () => {
        let product:any = ProductFactory.createNewProduct();
        let responseProd:any = await postProduct(product, token);
        let _id:string = responseProd.body._id;
        let cart:any = CartFactory.createNewCart(_id, 3);
        await postCart(cart, token);
        response = await postCart(cart, token);
        expect(response.statusCode).to.eq(400);
        expect(response.body.message).to.eq('Não é permitido ter mais de 1 carrinho');
        Joi.assert(response.body, schema.messageSchema)
      })

      it('delete cart - completed purchase ', async () => {
        let product:any = ProductFactory.createNewProduct();
        let responseProd:any = await postProduct(product, token);
        let _id:string = responseProd.body._id;
        let cart:any = CartFactory.createNewCart(_id, 3);
        await postCart(cart, token);
        response = await completedPurchase(token);
        expect(response.statusCode).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
        Joi.assert(response.body, schema.messageSchema);
      })

      it('delete cart - canceled purchase ', async () => {
        let product:any = ProductFactory.createNewProduct();
        let responseProd:any = await postProduct(product, token);
        let _id:string = responseProd.body._id;
        let cart:any = CartFactory.createNewCart(_id, 3);
        await postCart(cart, token);
        response = await canceledPurchase(token);
        expect(response.statusCode).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso. Estoque dos produtos reabastecido');
        Joi.assert(response.body, schema.messageSchema);
      })

      it('post new cart - Failed - product not found ', async () => {
        let product:any = ProductFactory.createNewProduct();
        let responseProd:any = await postProduct(product, token);
        let _id:string = responseProd.body._id;
        let cart: any = CartFactory.createNewCart("FALSE_ID",3);
        response = await postCart(cart, token); 
        expect(response.body.message).to.eq('Produto não encontrado')
        expect(response.statusCode).to.eq(400);
        Joi.assert(response.body, schema.productNotFoundSchema);
      })

})