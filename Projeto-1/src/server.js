import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res);

    const route = routes.find(route => {
        return route.method === methor && route.path === url
    })

    return res.writeHead(404).end("Not Found");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
