import products from '../database/products.json'

class Product {

    static All() {
        return new Promise((resolve, reject) => {
            resolve(products)
        })
    }

    static FindByID(ID: number) {
        return new Promise((resolve, reject) => {
            const product = products.find(product => product.ID === ID)
            resolve(product)
        })
    }

    static Find(search: any) {
        return new Promise((resolve, reject) => {
            const results = products.filter(p => Object.keys(search).every(key => p[key] === search[key]))
            resolve(results)
        })
    }

    static Create(product) {
        return new Promise((resolve, reject) => {
            products.push(product)
            resolve(product)
        })
    }

}

export default Product