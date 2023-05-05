import { UserRepository } from "../../repositories/userRepository.js"

export class UserTransferMoney {
  async execute({ send_serialized, receive_serialized, money }) {
    try {
      const userSend = await UserRepository.findOne({ where: { serialized: send_serialized } })
      const userReceive = await UserRepository.findOne({ where: { serialized: receive_serialized } })
      
      if(!userSend) { return new Error("User send not found.") }
      if(!userReceive) { return new Error("User receive not found.") }
      
      if(money > userSend.money) { return new Error("Invalid coin.") }
      
      var newSendMoney = userSend.money - money
      var newReceiveMoney = userReceive.money += money
      
      await userSend.update({ money: newSendMoney })
      await userReceive.update({ money: newReceiveMoney })
      
      return { success_message: `${userSend.name} -> ${userReceive.name} $${money}` }
      
    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}
