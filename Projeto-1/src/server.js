import http from "node:http"

const users = []

const server = http.createServer((req, res) => {
    const { method, url} = req

    if (method === "GET" && url === "/users") {

        return res.end(users)
    }

    
    if (method === "POST" && url === "/users") {
        users.push({
            id: 1,
            name: "alguem",
            email:"alguem@email.com",
        })

        return res.end("criação de usuário")
    }   

    return res.end("first test")
})

server.listen(3000)