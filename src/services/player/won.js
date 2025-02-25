class PlayerWon {
    execute(playerWonProps) {
        playerWonProps.coins += playerWonProps.profit
        playerWonProps.hitAmount++
        playerWonProps.moves++

        return playerWonProps
    }
}

module.exports = { PlayerWon }
