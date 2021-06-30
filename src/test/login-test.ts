import Joi = require('joi');
import { expect } from "chai";
import loginFactory from "../factory/login-factory";
import UserFactory from "../factory/user-factory";
import { postLogin } from "../services/login-service";
import { postUser } from "../services/users-service";
const schema = require('../schema/login-schema');


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
        Joi.assert(response.body, schema.loginSchema);
    })

    it('Login test Fail - wrong credentials', async () => {
        response = await postLogin(loginFactory.loginFail);
        expect(response.statusCode).to.eq(401);
        expect(response.body.message).to.eq('Email e/ou senha inválidos');
        Joi.assert(response.body, schema.loginFailSchema);
    })

    it('Login test Fail - email required', async () => {
        response = await postLogin(loginFactory.loginEmailRequired);
        expect(response.statusCode).to.eq(400);
        expect(response.body.email).to.eq('email não pode ficar em branco');
        Joi.assert(response.body, schema.loginEmailRequiredSchema);
    })
})