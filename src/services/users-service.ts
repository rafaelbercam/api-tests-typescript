import chai = require('chai');
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const conf = require('../config/index')

export async function getUsers(_id?: string) {
    
    if(_id != null){
        return await chai
        .request(conf.url)
        .get(`/usuarios?_id=${_id}`)
        .set('Content-Type', 'application/json')
    } else {
        return await chai
        .request(conf.url)
        .get(`/usuarios`)
        .set('Content-Type', 'application/json')
    }
}

export async function getUserById(_id: string){

    return await chai
        .request(conf.url)
        .get(`/usuarios/${_id}`)
        .set('Content-Type', 'application/json')
}

export async function postUser(user:any) {
    return await chai   
        .request(conf.url)
        .post(`/usuarios`)
        .set('Content-Type', 'application/json')
        .send({
            "nome": user.nome,
            "email": user.email,
            "password": user.password,
            "administrador": user.administrador
        })
}

export async function putUser(user:any, _id: string) {
    return await chai
        .request(conf.url)
        .put(`/usuarios/${_id}`)
        .set('Content-Type', 'application/json')
        .send({
            "nome": user.nome,
            "email": user.email,
            "password": user.password,
            "administrador": user.administrador
        })
}

export async function deleteUser(_id: string) {
    return await chai
        .request(conf.url)
        .delete(`/usuarios/${_id}`)
        .set('Content-Type', 'application/json')
}