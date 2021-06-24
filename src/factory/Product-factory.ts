const faker = require('faker');

const ProductFactory = {

    createNewProduct(){


        let nome = faker.commerce.productName();
        let preco = parseFloat(faker.commerce.price());
        let descricao = faker.commerce.productDescription();
        let quantidade = parseInt(faker.datatype.number());

        return {
            "nome": nome,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
        }
    }
}

export default ProductFactory;