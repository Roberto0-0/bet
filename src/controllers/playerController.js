const { GroupGetBySession } = require("../services/group/getBySession")
const { PlayerCreate } = require("../services/player/create")
const { PlayerDelete } = require("../services/player/delete")
const { PlayerGetBySerialized } = require("../services/player/getBySerialized")
const { PlayerLost } = require("../services/player/lost")
const { PlayerWon } = require("../services/player/won")
const path = require("node:path")

class PlayerController {
    constructor(storagePath) {
        this.storage = path.join(process.cwd(), `${storagePath}/bet_storage`)
    }

    create(playerProps) {
        return new PlayerCreate().execute(playerProps)
    }

    async getBySerialized(session, serialized) {
        const groupGetBySessionService = new GroupGetBySession(this.storage)
        const service = new PlayerGetBySerialized(groupGetBySessionService)
        return await service.execute(session, serialized)
    }

    won(playerWonProps) {
        return new PlayerWon().execute(playerWonProps)
    }

    lost(playerLostProps) {
        return new PlayerLost().execute(playerLostProps)
    }

    delete(players, serialized) {
        return new PlayerDelete().execute(players, serialized) 
    }
}

module.exports = { PlayerController }
