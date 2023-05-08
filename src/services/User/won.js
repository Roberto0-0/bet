import { UserRepository } from "../../repositories/userRepository.js"

export class UserWon {
  async execute({ serialized, coin, luckCoin }) {
    try {
      const user = await UserRepository.findOne({ where: { serialized: serialized } })
      
      if(!user) { return new Error("User not found.") }
      
      var luck = coin * luckCoin
      var newCoin = luck += user.coin
      var newWon = user.won += 1
      
      await user.update({ coin: newCoin, won: newWon })
      return
      
    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}