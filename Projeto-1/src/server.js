import http from "node:http";

const users = [];

// req e res são streams.
const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    
    const buffers = [];
    
    for await (const chunk of req) {
        buffers.push(chunk);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        req.body = null;
    }

    if (method === "GET" && url === "/users") {
        res.setHeader("Content-Type", "application/json");
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

        res.setHeader("Content-Type", "application/json");
        return res.writeHead(201).end(JSON.stringify(newUser));
    }

    return res.writeHead(404).end("Not Found");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});