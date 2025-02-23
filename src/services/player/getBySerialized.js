class PlayerGetBySerialized {
    constructor(groupGetBySerialized) {
        this._groupGetBySerialized = groupGetBySerialized
    }

    async execute(session, serialized) {
        const group = await this._groupGetBySerialized.execute(session)
        if (!group.success) return {
            success: true,
            message: group.message
        }

        const player = group.data.players.find(x => x.serialized === serialized)
        if (!player) return {
            success: false,
            message: "Jogador não encontrado."
        }

        return {
            success: true,
            data: player
        }
    }
}

module.exports = { PlayerGetBySerialized }
