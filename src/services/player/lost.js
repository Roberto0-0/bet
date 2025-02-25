class PlayerLost {
    execute(playerLostProps) {
        playerLostProps.coins -= playerLostProps.prejudice
        playerLostProps.moves++

        return playerLostProps 
    }
}

module.exports = { PlayerLost }
