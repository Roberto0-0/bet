const { readdirSync, readFileSync } = require("node:fs")

class GroupGetAll {
    constructor(storage) {
        this._storage = storage
    }

   async execute() {
        const files = readdirSync(this._storage)

        function readfiles(files, _storage) {
            let _files = []

            for (var file of files) {
                _files.push(JSON.parse(readFileSync(`${_storage}/${file}`, "utf8")))
            }

            return _files
        }

        const _storage = this._storage
        const result = readfiles(files, _storage)

        return {
            success: true,
            data: result
        }
    } 
}

module.exports = { GroupGetAll }
