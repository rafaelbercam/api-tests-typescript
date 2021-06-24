import { expect } from "chai";
import ProductFactory from "../factory/Product-factory";
import UserFactory from "../factory/User-factory";
import { returnToken } from "../services/Login-service";
import { deleteProduct, getProductById, getProducts, postProduct, putProduct } from "../services/Product-service";
import { postUser } from "../services/Users-service";

let response: any;
let user: any;
let token: any;
let product_id: string;
let product: any;

describe('Product test request', async ()=>{

    before(async () => {
        user = UserFactory.createUser();
        await postUser(user);
        token = await returnToken(user);
    })

    it('get products', async () => {
      response = await getProducts();
      expect(response.statusCode).to.eq(200)
      expect(response.body).haveOwnProperty('produtos');
      expect(response.body.quantidade).greaterThanOrEqual(0);
    })

    it('post new product', async () => {
        product = ProductFactory.createNewProduct();
        response = await postProduct(product, token);
        expect(response.statusCode).to.eq(201)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        product_id = response.body._id;
      })

      it('get product by Id', async () => {
        response = await getProductById(product_id);
        expect(response.statusCode).to.eq(200);
        expect(response.body.nome).to.eq(product.nome);
      })

      it('update product', async () => {
        let newProduct: any = ProductFactory.createNewProduct();
        response = await putProduct(product_id,newProduct, token);
        expect(response.statusCode).to.eq(200);
        expect(response.body.message).to.eq('Registro alterado com sucesso');
        newProduct = await getProductById(product_id);
        expect(newProduct.body.nome).not.eq(product.nome)
      })

      it('delete product', async () => {
        response = await deleteProduct(product_id,token)
        expect(response.statusCode).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      })
})