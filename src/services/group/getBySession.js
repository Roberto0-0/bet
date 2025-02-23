const { existsSync, readFileSync } = require("node:fs")

class GroupGetBySession {
    constructor(storage) {
        this._storage = storage
    }

    async execute(session) {
        const groupStoragePath = `${this._storage}/${session}.json`

        if(!existsSync(groupStoragePath)) return {
            success: false,
            message: "grupo não encontrado."
        }

        const data = JSON.parse(readFileSync(groupStoragePath)) 

        return {
            success: true,
            data
        }
    }
}

module.exports = { GroupGetBySession }
