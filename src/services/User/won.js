import { UserRepository } from "../../repositories/userRepository.js"

export class UserWon {
  async execute({ serialized, money, bets, luckCoin }) {
    try {
      const user = await UserRepository.findOne({ where: { serialized: serialized } })
      
      if(!user) { return new Error("User not found.") }
      
      var luck = money * luckCoin
      var newMoney = luck += user.money
      var newWon = user.bets += 1
      
      await user.update({ money: newMoney, bets: newWon })
      
    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}