# __Boilerplate Testes de API em TypeScript__


## __Pré-requisitos__
1. Instalar o [Node](https://nodejs.org/pt-br/)

## __Ambiente__
Para executar os testes localmente, estou utilizando o ServeRest

<p align="center">
 <img alt="Logo do ServeRest" src="https://user-images.githubusercontent.com/29241659/115161869-6a017e80-a076-11eb-9bbe-c391eff410db.png" height="120">
</p>

Link do Repo: https://github.com/ServeRest/ServeRest

 ServeRest está disponível de forma [online](https://serverest.dev), no [npm](https://www.npmjs.com/package/serverest) e no [docker](https://hub.docker.com/r/paulogoncalvesbh/serverest/).

## __Instalando Dependências__
1. Rodar o comando 
```
npm i
```
2. Criar arquivo `.env` na raiz do projeto

Criar o arquivo com as seguintes variáveis

```text
PROD=https://serverest.dev
DEV=http://localhost:3000
```

3. Rodar os testes localhost
```
npm run test-dev
````

4. Para rodar os testes em Produção
```
npm run test-prod
````

## __Configuração do Projeto__
### Estrutura de Pastas
O projeto esta dividido da seguinte maneira:

    [api-tests-typescript]
       [src] -> código fonte
            [config] -> arquivos de configuração ambiente
            [factory] -> métodos para criar objetos
            [services] -> funções que retornam requisições das rotas
            [test] -> Arquivos de testes com Mocha e Chai.
       .env -> arquivo com variáveis de ambiente(normalmente não commitada)
       .mocharc.js -> arquivo de configuração do Mochawesome
  

### __Services__
Services são funções que retornam requests pré-estabelecidas de cara um dos endpoints, sendo responsável apenas por devolver o conteúdo produzido pela request. Essas funções podem ter parâmetros ou não.

Exemplo:

``` ts
export async function postLogin(credentials: any) {
    return await chai
        .request(conf.url)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            email: credentials.email,
            password: credentials.password
        })
```

Este trecho de código, exibe a função de Login (`postLogin`), na qual apresenta um parâmetro `credentials`.

Foi utilizado o `chai-http` para criar a estrutura do request, para saber mais sobre seu uso acesse: https://www.chaijs.com/plugins/chai-http/

### __Factory__

Factory, é um padrão criacional onde se utiliza funções ou métodos para gerar objetos de forma independente, sem o uso de classes concretas

Exemplo:

```ts
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
```

Neste expelo, a função `createUser()` retorna um objeto que não utiliza uma classe concreta, e para utiliza-la basta importar para as classes de teste.

```ts
    //...
    before(async () => {
        user = UserFactory.createUser();
        await postUser(user);
        token = await returnToken(user);
    })
    //...
```

### __Schema__

Para realizar os testes de contrato, usei a lib [Joi](https://joi.dev/api/), seu uso é muito simples e basicamente criamos uma estrutura para validar se o retorno de uma requisição segue exatamente os modelo criado pelo Joi.

Exemplo da linguagem

```ts
import Joi = require('joi');

const loginSchema = Joi.object({
    message: Joi.string().required(),
    authorization: [Joi.string(),Joi.number()]
})

module.exports = { loginSchema };
```

Dentro dos testes basta importar o Joi e criar uma validação usando o `Joi.assert()` 

```ts
const schema = require('../schema/Login-schema');

//any code


it('Login Success', async ()=>{       
    response = await postLogin(user);
    expect(response.statusCode).to.eq(200);
    expect(response.body.message).to.eq('Login realizado com sucesso');  
    Joi.assert(response.body, schema.loginSchema);
})
```

### Apresentação no YouTube 

#### [Apresentação no Canal Café, Testes e Pão de Queijo](https://www.youtube.com/watch?v=akz8WbZ5Dz4)

#### [Link dos Slides](https://docs.google.com/presentation/d/1u_LdkHvwRTdWfIPkjv53d1Xfn3uC296fRtmT7oQ8pmI/edit?usp=sharing)
