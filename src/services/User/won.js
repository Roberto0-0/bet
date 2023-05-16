import { UserRepository } from "../../repositories/userRepository.js"

export class UserWon {
  async execute({ serialized, coin }) {
    try {
      const user = await UserRepository.findOne({ where: { serialized: serialized } })
      
      if(!user) { return new Error("User not found.") }
      
      var newCoin = coin += Math.abs(user.coin)
      var newWon = user.won += 1

      console.log(newCoin)

      await user.update({ coin: newCoin, won: newWon })
      return
      
    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}