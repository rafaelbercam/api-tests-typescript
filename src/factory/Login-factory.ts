const loginFactory = {

    loginSuccess: {
        "email": "fulano@qa.com",
        "password": "teste"
    },

    loginFail: {
        "email" : "fulano@qa.com",
        "password": "test"
    },

    loginEmailRequired: {
        "email" : "",
        "password": "test"
    }
}

export default loginFactory;