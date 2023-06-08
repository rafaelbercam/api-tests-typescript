import chai = require('chai');
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const conf = require('../config/index')


export async function getCarts() {
    return await chai
    .request(conf.url)
    .get(`/carrinhos`)
    .set('Content-Type', 'application/json')
}

export async function getCartsByUserId(_id:String) {
    return await chai
    .request(conf.url)
    .get(`/carrinhos/?_id=${_id}`)
    .set('Content-Type', 'application/json')
}

export async function postCart(cart:any, token:string) {
    return await chai
    .request(conf.url)
    .post(`/carrinhos`)
    .set('Authorization', token)
    .send({
        produtos: [
            {
                idProduto: cart.produtos[0].idProduto,
                quantidade: cart.produtos[0].quantidade
            }
        ]
    })
}

export async function completedPurchase(token:string) {
    return await chai
    .request(conf.url)
    .delete(`/carrinhos/concluir-compra`)
    .set('Authorization', token)
}

export async function canceledPurchase(token:string) {
    return await chai
    .request(conf.url)
    .delete(`/carrinhos/cancelar-compra`)
    .set('Authorization', token)
}