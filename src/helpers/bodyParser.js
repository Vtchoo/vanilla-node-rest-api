function bodyParser(req, res, callback) {

    let body = ''

    req.on('data', (chunk) => {
        body += chunk
    })

    req.on('end', () => {
        req.body = JSON.parse(body)
        callback()
    })

}

module.exports = bodyParser