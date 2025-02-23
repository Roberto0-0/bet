class PlayerLost {
    execute(playerLostProps) {
        playerLostProps.coins -= playerLostProps.prejudice
        playerLostProps.moves++

        return {
            success: true,
            data: playerLostProps
        }
    }
}

module.exports = { PlayerLost }
