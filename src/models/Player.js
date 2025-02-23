class Player {
    constructor(serialized, name) {
        this.serialized = serialized
        this.name = name
        this.coins = 100 
        this.items = []
        this.moves = 0
        this.hitAmount = 0
        this.createdAt = new Date().getTime()
    } 
}

module.exports = { Player }
