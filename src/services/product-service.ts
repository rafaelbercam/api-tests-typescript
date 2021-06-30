import chai = require('chai');
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const conf = require('../config/index')

export async function getProducts() {
    return await chai
    .request(conf.url)
    .get(`/produtos`)
    .set('Content-Type', 'application/json')
}

export async function postProduct(product: any, token: any) {
    return await chai
    .request(conf.url)
    .post(`/produtos`)
    .set("Authorization", token)
    .send({
        nome: product.nome,
        preco: product.preco,
        descricao: product.descricao,
        quantidade: product.quantidade
    })
}

export async function getProductById(_id: string) {
    return await chai
    .request(conf.url)
    .get(`/produtos/${_id}`)
    .set('Content-Type', 'application/json')
}

export async function putProduct(_id:string, product:any, token:string) {
    return await chai
    .request(conf.url)
    .put(`/produtos/${_id}`)
    .set("Authorization", token)
    .send({
        nome: product.nome,
        preco: product.preco,
        descricao: product.descricao,
        quantidade: product.quantidade
    })
}

export async function deleteProduct(_id:string, token:string) {
    return await chai
    .request(conf.url)
    .delete(`/produtos/${_id}`)
    .set("Authorization", token)
}