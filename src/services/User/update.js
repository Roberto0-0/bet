import { UserRepository } from "../../repositories/userRepository.js"

export class UserUpdate {
  async execute({ serialized, coin, diamond, won, limit }) {
    try {
      const user = await UserRepository.findOne({ where: { serialized: serialized } })
      
      if(!user) { return new Error("User not found.") }
      
      await user.update({ coin, diamond, won, limit })
      return
      
    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}