import { UserRepository } from "../../repositories/userRepository.js"

export class UserLoses {
  async execute({ serialized, coin }) {
    try {
      const user = await UserRepository.findOne({ where: { serialized: serialized } })
      
      if(!user) { return new Error("User not found.") }
      if(coin > user.coin) { return new Error("You do not have enough money") }
      
      var newCoin = user.coin - coin
      
      await user.update({ coin: newCoin })
      return
      
    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}