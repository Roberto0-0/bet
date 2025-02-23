class PlayerDelete {
    execute(players, serialized) {
        function remove(data, key, value) {
            data = data.filter((jsonObject) => {
                return jsonObject[key] != value
            })

            return data
        }

        return {
            data: remove(players, "serialized", serialized)
        }
    }
}

module.exports = { PlayerDelete }
