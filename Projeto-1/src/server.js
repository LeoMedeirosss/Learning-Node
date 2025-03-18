import http from "node:http"

const server = http.createServer((req, res) => {
    return res.end("first alo")
})

server.listen(3000)