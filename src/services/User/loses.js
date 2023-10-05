import { UserRepository } from "../../repositories/userRepository.js"
import { BankRepository } from "../../repositories/bankRespository.js"
import "dotenv/config"

const { BANK_COIN_LIMIT } = process.env

export class UserLoses {
  async execute({ serialized, coin }) {
    try {
      const [ user, bank ] = await Promise.all([
        UserRepository.findOne({ where: { serialized: serialized } }),
        BankRepository.findOne({ where: { id: 1 } })
      ])
      
      if(!user) { return new Error("User not found.") }
      if(!bank) { return new Error("Bank not found.") }

      if(coin > Math.abs(user.coin)) { return new Error("You do not have enough money.") }
      
      var newBankCoin = Math.abs(bank.coin) + coin
      var newCoin = Math.abs(user.coin) - coin

      if(newCoin <= 0) {
        if(user.limit < 3) {
            newCoin = 100
            var newLimit = user.limit += 1
        }
      }
      
      if(newBankCoin > Math.abs(BANK_COIN_LIMIT) ) { newBankCoin = Math.abs(BANK_COIN_LIMIT) }
    
      await user.update({ coin: newCoin, limit: newLimit })
      await bank.update({ coin: newBankCoin })
      
      return
    } catch(error) {
      console.error(error)
      return new Error("Internal server error.") 
    }
  }
}