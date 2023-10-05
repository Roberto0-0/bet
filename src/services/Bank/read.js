import { BankRepository } from "../../repositories/bankRespository.js"

export class BankRead {
    marketBankResult() {
        var diamondPrice = 1000000
        const diamondPercent = () => Math.floor(Math.random() * (100 - -100) + -100)
        var diamondpercent = diamondPercent()
        var newDiamondPrice = ((diamondPrice*diamondpercent) / 100) + diamondPrice

        return {
            diamondpercent,
            newDiamondPrice
        }
    }

    async execute(id) {
        const bank = await BankRepository.findOne({ where: { id: id } })

        if(!bank) { return new Error("Bank not found.") }

        const { diamondpercent, newDiamondPrice } = this.marketBankResult()

        await bank.update({ coin: bank.coin, diamondPercent: diamondpercent, diamondCoin: newDiamondPrice })
        
        return bank
    }
}
