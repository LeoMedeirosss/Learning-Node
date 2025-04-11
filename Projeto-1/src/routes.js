import { Database } from "./database.js";
import { randomUUID } from "node:crypto"

const database = new Database();

export const routes = [ 
    {
        method: "GET",
        path: "/users",
        handler: (req,res) => {
            const users = database.select("users");

            return res.writeHead(200).end(JSON.stringify(users));
        }
    },
    {
        method: "POST",
        path: "/users",
        handler: (req,res) => {
            const { name, email } = req.body || {};
        
            if (!name || !email) {
                return res.writeHead(400).end("Bad Request: Name and email are required");
            }
        
            // Recupera usuários atuais para calcular ID
            const users = database.select("users") || [];
            const newUser = {
                id: randomUUID(),
                name,
                email,
            };
        
            database.insert("users", newUser);
        
            return res.writeHead(201).end(JSON.stringify(newUser));
        }
    }
]