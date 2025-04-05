import http from "node:http";
import { json } from "./middlewares/json.js";

const users = [];

// req e res são streams.
const server = http.createServer(async (req, res) => {
    const { method, url } = req;

   await json(req,res)

    if (method === "GET" && url === "/users") {
        res
        return res.writeHead(200).end(JSON.stringify(users));
    }

    if (method === "POST" && url === "/users") {
        if (!req.body || !req.body.name || !req.body.email) {
            return res.writeHead(400).end("Bad Request: Name and email are required");
        }

        const newUser = {
            id: users.length + 1,
            name: req.body.name,
            email: req.body.email,
        };

        users.push(newUser);

        res
        return res.writeHead(201).end(JSON.stringify(newUser));
    }

    return res.writeHead(404).end("Not Found");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
