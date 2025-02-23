class PlayerWon {
    execute(playerWonProps) {
        playerWonProps.coins += playerWonProps.profit
        playerWonProps.hitAmount++
        playerWonProps.moves++

        return {
            success: true,
            data: playerWonProps
        }
    }
}

module.exports = { PlayerWon }
