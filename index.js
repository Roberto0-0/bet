const { GroupController } = require("./src/controllers/groupController")
const { PlayerController } = require("./src/controllers/playerController")

class BetGame {
    constructor(storagePath) {
        this.storage = storagePath
        this.group = new GroupController(this.storage) 
        this.player = new PlayerController(this.storage) 
    }
}

module.exports = BetGame
