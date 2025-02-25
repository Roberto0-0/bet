class Group {
    constructor(session, name) {
        this.session = session
        this.name = name
        this.players = []
        this.store = []
        this.coins = 999999999 
        this.status = false
        this.createdAt = new Date().getTime()
    }
}

module.exports = { Group } 
