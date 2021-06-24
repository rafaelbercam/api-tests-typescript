import { expect } from "chai";
import UserFactory from "../factory/User-factory";
import { deleteUser, getUserById, getUsers, postUser, putUser } from "../services/Users-service";

let response: any;
let _id: string;
let new_id: string;
let newData: any;


describe('User test request', async ()=>{
    it('get users', async () => {
        response = await getUsers();
        _id = response.body.usuarios[0]._id
        expect(response.statusCode).to.eq(200);
        expect(response.body.quantidade).greaterThanOrEqual(0);
    })

    it('get users by Id', async () => {
        response = await getUserById(_id);
        expect(response.statusCode).to.eq(200);
        expect(_id).to.eq(response.body._id)
    })

    it('post new user', async () => {
        newData = UserFactory.createUser();
        response = await postUser(newData);
        expect(response.statusCode).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        new_id = response.body._id
    })

    it('put user - new data', async () => {
        response = await putUser(UserFactory.createUser(), new_id);
       
        expect(response.statusCode).to.eq(200);
        expect(response.body.message).to.eq('Registro alterado com sucesso');
       
        let getUpdateUser: any = await getUserById(new_id);

        expect(getUpdateUser.body.nome).not.eq(newData.nome);
        expect(getUpdateUser.body.email).not.eq(newData.email);
        expect(getUpdateUser.body.password).not.eq(newData.password);
    })

    it('delete user', async ()=>{
        response = await deleteUser(new_id);
        expect(response.statusCode).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
    })
    
})