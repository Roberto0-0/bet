const BetGame = require("../index")

const session = "94939483"
const storagePath = ("test/config")

const betGame = new BetGame(storagePath)
var data =

    test("should get group by session", async () => {
        const groupGetBySessionService = await betGame.group.getBySession(session)
        expect(groupGetBySessionService.success).toBe(false)
    })

test("should create a group", () => {
    const groupProps = {
        session: "94939483",
        name: "group name"
    }

    const groupCreateService = betGame.group.create(groupProps)
    data = groupCreateService.data
    expect(groupCreateService.success).toBe(true)
})

test("should create a player", () => {
    const playerProps = {
        serialized: "2039030203@c.us",
        name: "Player name"
    }

    const playerCreateService = betGame.player.create(playerProps)
    data.coins -= playerCreateService.data.coins
    data.players.push(playerCreateService.data)
    expect(playerCreateService.data.name).toEqual(playerProps.name)
})

test("should the player win.", () => {
    const playerWonProps = {
        coins: data.players[0].coins,
        hitAmount: data.players[0].hitAmount,
        moves: data.players[0].moves,
        profit: 225
    }

    const playerWonService = betGame.player.won(playerWonProps)
    data.players[0].coins = playerWonService.data.coins
    data.players[0].hitAmount = playerWonService.data.hitAmount
    data.players[0].moves = playerWonService.data.moves
    expect(playerWonService.data.hitAmount).toEqual(1)
})

test("should the player lost.", () => {
    const playerLostProps = {
        coins: data.players[0].coins,
        moves: data.players[0].moves,
        prejudice: 25
    }

    const playerWonService = betGame.player.lost(playerLostProps)
    data.players[0].coins = playerWonService.data.coins
    data.players[0].moves = playerWonService.data.moves
    expect(playerWonService.data.coins).toEqual(300)
})

test("should save group changes.", async () => {
    const groupSaveChangesService = await betGame.group.saveChanages(session, data)
    expect(groupSaveChangesService.success).toBe(true)
})

test("should get a player by serialized.", async () => {
    const serialized = "2039030203@c.us"

    const playerGetBySerialziedService = await betGame.player.getBySerialized(serialized)
    expect(playerGetBySerialziedService.data)
})

test("should remove a player.", () => {
    const serialized = "2039030203@c.us"

    const playerRemoveService = betGame.player.delete(data.players, serialized)
    data.players = playerRemoveService.data
    expect(playerRemoveService.data.length).toEqual(0)
})

test("should save group changes.", async () => {
    const groupSaveChangesService = await betGame.group.saveChanages(session, data)
    expect(groupSaveChangesService.success).toBe(true)
})
