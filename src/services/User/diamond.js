import { BankRepository } from "../../repositories/bankRespository.js"
import { UserRepository } from "../../repositories/userRepository.js"
import { COIN_LIMIT } from "./won.js"

export class Diamond {
    async buy({ serialized, coin, quantityDiamond }) {
        try {
          const user = await UserRepository.findOne({ where: { serialized: serialized } })
          
          if(!user) { return new Error("User not found.") }

          var fullPrice = coin * quantityDiamond

          if(fullPrice > Math.abs(user.coin)) { return new Error("You don't have enough money") }
          if(Math.abs(user.coin) < fullPrice) { return new Error("Invalid coin") }
          
          var newCoin = Math.abs(user.coin) - (fullPrice)
          if(newCoin <= 0) { newCoin = 0 }

          var newDiamond = user.diamond += quantityDiamond
          
          await user.update({ coin: newCoin, diamond: newDiamond })
          return user
          
        } catch(error) {
          console.log(error)
          return new Error("Internal server error.") 
        }
    }


    async sale({ selleSerialized, buyerSerialized, quantityDiamond }) {
        const [selleUser, buyerUser] = await Promise.all([
            UserRepository.findOne({ where: { serialized: selleSerialized } }),
            UserRepository.findOne({ where: { serialized: buyerSerialized } })
        ])

        if(!selleUser) { return new Error("Selle player not found.") }
        if(!buyerUser) { return new Error("Buyer player not found.") }

        if(quantityDiamond > selleUser.diamond) { return new Error("You don't have enough diamonds.") }

        return {
            success: true
        }
    }

    async buyer({ selleSerialized, buyerSerialized, diamondPrice, quantityDiamond }) {
        const [selleUser, buyerUser] = await Promise.all([
            UserRepository.findOne({ where: { serialized: selleSerialized } }),
            UserRepository.findOne({ where: { serialized: buyerSerialized } })
        ])

        if(!selleUser) { return new Error("Selle player not found.") }
        if(!buyerUser) { return new Error("Buyer player not found.") }

        if(diamondPrice > 1000000) { return new Error("Sales below 1 million.") }

        var convertSalerCoin = (quantityDiamond * diamondPrice)
        var sellerDiamond = selleUser.diamond

        if(Math.abs(buyerUser.coin) < convertSalerCoin) { return new Error("You don't have enough coins.") }
        if(sellerDiamond < quantityDiamond) { return new Error(`"${selleUser.name}" don't have enough diamonds.`) }

        var newBuyerCoin = Math.abs(buyerUser.coin) - convertSalerCoin
        var newBuyerDiamond = buyerUser.diamond += quantityDiamond
        var newSellerDiamond = sellerDiamond - quantityDiamond
        var newSellerCoin = Math.abs(selleUser.coin) + convertSalerCoin

        if(newSellerCoin >= COIN_LIMIT) { newSellerCoin = COIN_LIMIT }

        await selleUser.update({ coin: newSellerCoin, diamond: newSellerDiamond })
        await buyerUser.update({ coin: newBuyerCoin, diamond: newBuyerDiamond })

        return {
            success: true,
            data: { selleUser, buyerUser, quantityDiamond, convertSalerCoin }
        }
    }

    async buyMarket({ serialized, quantityDiamond }) {
        const [ user, bank ] = await Promise.all([
            UserRepository.findOne({ where: { serialized: serialized } }),
            BankRepository.findOne({ where: { id: 1 } })
        ])

        if(!user) { return new Error("User player not found.") }
        if(!bank) { return new Error("Bank not found.") }

        if(quantityDiamond > user.diamond) { return new Error("You don't have enough diamonds.") }

        var convertDimondPrice = quantityDiamond * bank.diamondCoin
        var newCoin = Math.abs(user.coin) + convertDimondPrice
        var newDiamond = user.diamond - quantityDiamond

        if(newCoin > COIN_LIMIT) { newCoin = COIN_LIMIT }

        await user.update({ coin: newCoin, diamond: newDiamond })
        return
    }
}
