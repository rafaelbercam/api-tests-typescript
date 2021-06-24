import chai = require('chai');
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const conf = require('../config/index')

export async function postLogin(credentials: any) {
    return await chai
        .request(conf.url)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            email: credentials.email,
            password: credentials.password
        })
}

export async function returnToken(credentials: any) {
    let token: any = await chai
    .request(conf.url)
    .post('/login')
    .set('Content-Type', 'application/json')
    .send({
        email: credentials.email,
        password: credentials.password
    })

    return token.body.authorization;
}