import http from "node:http"
import { Transform } from "node:stream"


class InverseNumberStream extends Transform{
    _transform(chunk,encoding,callback) {
        const transformed = Number(chunk.toString()) * (-1)

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}

//utilizando streams internas do NodeJS
//req -> readeble stream (le a requisição)
//res -> writable stream (res== resposta; escreve a requisição)
const server = http.createServer(async (req,res) => {
    const buffers = []

    for await (const chunk of rec) {
        buffers.push(chunk)
    }

    const fullContent = Buffer.concat(buffers).toString()

    console.log(fullContent)

    //return req
    //    .pipe(new InverseNumberStream())
    //    .pipe(res)
})

server.listen(3334)