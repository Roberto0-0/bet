import { UserRepository } from "../../repositories/userRepository.js"

export class UserLoses {
  async execute({ serialized, money }) {
    try {
      const user = await UserRepository.findOne({ where: { serialized: serialized } })
      
      if(!user) { return new Error("User not found.") }
      
      var newMoney = user.money - money
      
      await user.update({ money: newMoney })
      
    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}