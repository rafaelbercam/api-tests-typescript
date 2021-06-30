const faker = require('faker');

const UserFactory = {

    createUser(){

        let firstName: string = faker.name.firstName();
        let lastName: string = faker.name.lastName();
        let nome = `${firstName} ${lastName}`
        let email = `${firstName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}@email.com`
        let password = faker.internet.password();
        let administrador = 'true'

        return {
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": administrador
        }
    }
}

export default UserFactory;