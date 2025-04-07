import fs from "node:fs/promises"

const databasePath = new URL("../db.json", import.meta.url) //database criada sempre na raiz

export class Database {
    #database = {} // # para deixar a propriedade privada

    constructor() {
        fs.readFile(databasePath, "utf-8")
            .then(data => {
                this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist() //caso o arquivo não exista, cria um vazio automaticamente
        })
    }

    #persist() {
        fs.writeFile(databasePath,JSON.stringify(this.#database))
    }

    select(table) {
        const data = this.#database[table] ?? [] //caso n exista, return vazio

        return data
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data) //add novo item 
        } else {
            this.#database[table] = [data] //criar novo array na tabela
        }

        this.#persist()

        return data
    }
}