export class Database {
    #database = {} // # para deixar a propriedade privada

    select(table) {
        const data = this.#database(table) ?? [] //caso n exista, return vazio

        return data
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data) //add novo item 
        } else {
            this.#database[table] = [data] //criar novo array na tabela
        }

        return data
    }
}