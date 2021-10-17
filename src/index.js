const http = require('http')
const { URL } = require('url')

const bodyParser = require('./helpers/bodyParser')

const routes = require('./routes')

const server = http.createServer((req, res) => {

    const parsedUrl = new URL(`http://localhost:3000${req.url}`)

    let { pathname } = parsedUrl

    let id

    const splitEndpoint = pathname.split('/').filter(routeItem => Boolean(routeItem))

    if (splitEndpoint.length > 1) {
        pathname = `/${splitEndpoint[0]}/:id`
        id = splitEndpoint[1]
    }

    const route = routes.find(routeObj => routeObj.endpoint === pathname && routeObj.method === req.method)

    if (route) {
        req.query = Object.fromEntries(parsedUrl.searchParams)
        req.params = { id }

        res.send = (status, body) => {
            res.writeHead(status, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(body))
        }

        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            bodyParser(req, res, () => route.handler(req, res))
        } else {
            route.handler(req, res)
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end(`Cannot ${req.method} ${pathname}`)
    }
})

server.listen(3000, () => {
    console.log('server online')
})
