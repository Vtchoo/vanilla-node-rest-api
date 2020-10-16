import { IncomingMessage, ServerResponse } from 'http'
import Product from '../models/product'
import { v4 as uuid } from 'uuid'
import HttpParser from '../utils/httpparser'

const ProductsController = {

    All: async (req, res, next?) => {

        try {
            const products = await Product.All()

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(products))

        } catch (error) {
            console.log(error)
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end()
        }
    },

    GetByID: async (req: IncomingMessage, res: ServerResponse, next?) => {

        const ID = parseInt(req.url.split('/')[3])

        if (!ID) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end()
        }

        try {
            const product = await Product.FindByID(ID)

            if (product) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(product))
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end()
            }

        } catch (error) {
            console.log(error)
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end()
        }

    },

    Create: async (req: IncomingMessage, res: ServerResponse, next?) => {

        try {

            // let body
            // let data = ''
            // req.on('data', chunk => {
            //     data += chunk.toString()
            // })
            // req.on('end', async () => {
            //     console.log(data)
            //     body = JSON.parse(data)
                
            //     const product = {
            //         ...body,
            //         ID: uuid()
            //     }
    
            //     const newProduct = await Product.Create(product)
    
            //     console.log('new product created')
    
            //     res.writeHead(201, { 'Content-Type': 'application/json' })
            //     res.end(JSON.stringify(newProduct))
            // })

            try {
                const body = await HttpParser.GetRequestData(req)

                const product = { ...body, ID: uuid() }

                const newProduct = await Product.Create(product)

                res.writeHead(201, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(newProduct))
            } catch (error) {
                res.writeHead(500)
                res.end(error)
            }

            

            // const product = {
            //     ID: uuid(),
            //     name: 'New Product',
            //     price: 100
            // }

           
        } catch (error) {
            console.log(error)
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end()
        }
    }
}

export default ProductsController