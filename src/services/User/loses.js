import { UserRepository } from "../../repositories/userRepository.js"

export class UserLoses {
  async execute({ serialized, coin }) {
    try {
      const user = await UserRepository.findOne({ where: { serialized: serialized } })
      
      if(!user) { return new Error("User not found.") }
      if(coin > Math.abs(user.coin)) { return new Error("You do not have enough money.") }
      
      var newCoin = Math.abs(user.coin) - coin

      if(newCoin === 0) {
        if(user.limit < 3) {
            newCoin = 100
            var newLimit = user.limit += 1
        }
      }
      
      await user.update({ coin: newCoin, limit: newLimit })
      return
      
    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}