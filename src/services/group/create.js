const { Group } = require("../../models/Group")
const products = require("../../objects/product")

class GroupCreate {
    execute(groupProps) {
        const { session, name } = groupProps

        var newGroup = new Group(session, name)
        newGroup.store = products

        return {
            success: true,
            data: newGroup
        }
    }
}

module.exports = { GroupCreate }
