import { UserRepository } from "../../repositories/userRepository.js"

export class UserBuy {
  async execute({ serialized, coin }) {
    try {
      const user = await UserRepository.findOne({ where: { serialized: serialized } })
      
      if(!user) { return new Error("User not found.") }
      if(coin > Math.abs(user.coin)) { return new Error("You do not have enough money") }
      if(Math.abs(user.coin) < coin) { return new Error("Invalid coin") }
      
      var newCoin = Math.abs(user.coin) - coin
      var newDiamond = user.diamond += 1
      
      await user.update({ coin: newCoin, diamond: newDiamond })
      return user
      
    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}
