//using insomnia to test API
import http from "node:http"

const users = []

//req and res are streams.
const server = http.createServer((req, res) => {
    const { method, url} = req

    //console.log(req.headers)

    if (method === "GET" && url === "/users") {
        return res
        .setHeader("Content-type", "aplication/json")
        .end(JSON.stringify(users))
    }

    
    if (method === "POST" && url === "/users") {
        users.push({
            id: 1,
            name: "alguem",
            email:"alguem@email.com",
        })

        return res.writeHead(201).end()
    }   

    return res.writeHead(404).end("Not Found")
})

server.listen(3000)