import { UserRepository } from "../../repositories/userRepository.js"
import { BankRepository } from "../../repositories/bankRespository.js"
import "dotenv/config"

const { BANK_COIN_LIMIT } = process.env
var { COIN_LIMIT } = process.env
export var COIN_LIMIT = Math.abs(COIN_LIMIT)

export class UserWon {
  async execute({ serialized, coin }) {
    try {
      const [ user, bank ] = await Promise.all([
        UserRepository.findOne({ where: { serialized: serialized } }),
        BankRepository.findOne({ where: { id: 1 } })
      ])
      
      if(!user) { return new Error("Conta não encontrada.") }
      if(!bank) { return new Error("Banco não encontrado.") }

      var newBankCoin = Math.abs(bank.coin) - coin
      var newCoin = coin += Math.abs(user.coin)

      if(newCoin > COIN_LIMIT) {
        newCoin = COIN_LIMIT
        var newWon = user.won += 1

        if(newBankCoin <= 0) { newBankCoin = BANK_COIN_LIMIT }

        await user.update({ coin: newCoin, won: newWon })
        await bank.update({ coin: newBankCoin })

        return
      }

      if(newCoin <= COIN_LIMIT) {
        var newWon = user.won += 1

        if(newBankCoin <= 0) { newBankCoin = 0 }
        
        await user.update({ coin: newCoin, won: newWon })
        await bank.update({ coin: newBankCoin })

        return
      }
    } catch(error) {
      console.error(error)
      return new Error("Internal server error.") 
    }
  }
}
