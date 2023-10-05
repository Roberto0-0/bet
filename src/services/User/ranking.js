import { UserRepository } from "../../repositories/userRepository.js"
import { COIN_LIMIT } from "./won.js"

var topThreeUsers = [] 

export class Ranking {
    async execute() {
        topThreeUsers = []
        const users = await UserRepository.findAll({
            order:[
                ["diamond", "DESC"]
            ],
            limit: 3
        })

        if(!users) { return new Error("Users not found.") }
        users.map((user, index) => {
            topThreeUsers.push(`*${index+1}°* *${user.name}* _*${user.diamond}*_`)
        })

        return topThreeUsers
    }
}
