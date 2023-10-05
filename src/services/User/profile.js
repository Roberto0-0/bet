import { UserRepository } from "../../repositories/userRepository.js"

export class UserProfile {
    async execute({ commandSerialized, profileSerialized }) {
        const [ commandserialized, userProfile ] = await Promise.all([ 
            UserRepository.findOne({ where: { serialized: commandSerialized } }),
            UserRepository.findOne({ where: { name: profileSerialized } })
        ])

        if(!commandserialized) { return new Error("Serialized not found.") }
        if(!userProfile) { return new Error("Profile not found.") }

        return userProfile
    }
}
