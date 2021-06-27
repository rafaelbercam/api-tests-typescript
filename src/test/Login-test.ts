import Joi = require('joi');
import { expect } from "chai";
import loginFactory from "../factory/Login-factory";
import UserFactory from "../factory/User-factory";
import { postLogin } from "../services/Login-service";
import { postUser } from "../services/Users-service";
const schema = require('../schema/Login-schema')

require ('dotenv').config({ path: '../../.env' })

let response: any;
let user: any;
describe('Login test request', async ()=>{


    before(async()=>{
        user = UserFactory.createUser();
        await postUser(user);
    })

    it('Login Success', async ()=>{       
        response = await postLogin(user);
        expect(response.statusCode).to.eq(200);
        expect(response.body.message).to.eq('Login realizado com sucesso');  
        Joi.assert(response.body, schema.loginSchema)
    })

    it('Login test Fail - wrong credentials', async () => {
        response = await postLogin(loginFactory.loginFail);
        expect(response.statusCode).to.eq(401);
        expect(response.body.message).to.eq('Email e/ou senha inválidos');
        Joi.assert(response.body, schema.loginFailSchema)
    })

    it('Login test Fail - email required', async () => {
        response = await postLogin(loginFactory.loginEmailRequired);
        expect(response.statusCode).to.eq(400);
        expect(response.body.email).to.eq('email não pode ficar em branco');
    })
})