import { IncomingMessage } from "http"

class HttpParser {

    static GetRequestData(req: IncomingMessage): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                let body = ''
                req.on('data', chunk => {
                    body += chunk.toString()
                })
                req.on('end', () => {
                    resolve(JSON.parse(body))
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default HttpParser