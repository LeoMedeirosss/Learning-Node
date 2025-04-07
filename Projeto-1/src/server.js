import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

const database = new Database();

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res);

    if (method === "GET" && url === "/users") {
        const users = database.select("users");
        return res.writeHead(200).end(JSON.stringify(users));
    }

    if (method === "POST" && url === "/users") {
        const { name, email } = req.body || {};

        if (!name || !email) {
            return res.writeHead(400).end("Bad Request: Name and email are required");
        }

        // Recupera usuários atuais para calcular ID
        const users = database.select("users") || [];
        const newUser = {
            id: users.length + 1,
            name,
            email,
        };

        database.insert("users", newUser);

        return res.writeHead(201).end(JSON.stringify(newUser));
    }

    return res.writeHead(404).end("Not Found");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
