import { UserRepository } from "../../repositories/userRepository.js"

export class UserUpdate {
  async execute({ serialized, money, bets }) {
    try {
      const user = await UserRepository.findOne({
        where: { serialized: serialized }
      })
      
      if(!user) { return new Error("User not found.") }
      
      await user.update({ money, bets })
      
    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}