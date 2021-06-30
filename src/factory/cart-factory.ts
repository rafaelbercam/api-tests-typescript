const faker = require('faker');

const CartFactory = {

    createNewCart(_id:string, quantidade:number){

        return {
            "produtos": [
              {
                "idProduto": _id,
                "quantidade": quantidade
              }
            ]
          }
    },
    createNewCartDuplicatedProduct(_id:string, quantidade:number){

        return {
            "produtos": [
              {
                "idProduto": _id,
                "quantidade": quantidade
              },
              {
                "idProduto": _id,
                "quantidade": quantidade
              }
            ]
          }
    }
}

export default CartFactory;