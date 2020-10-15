import http from 'http'

//
//
//
import ProductsController from './controllers/productsController'

//
// Constants
//

// Default port
const PORT = process.env.PORT || 3000

// Entry point
const server = http.createServer((req, res) => { 

    const url = req.url

    if (url === '/api/products' && req.method == 'GET') {
        ProductsController.All(req, res)
    } else if (url.match(/\/api\/products\/([0-9]+)/) && req.method == 'GET') {
        ProductsController.GetByID(req, res)
    } else if (url === '/api/products' && req.method == 'POST') {
        ProductsController.Create(req, res)
    } else {
        res.statusCode = 404
        res.end()
    }

})

server.listen(PORT, () => console.log(`Server online - Port ${PORT}`))