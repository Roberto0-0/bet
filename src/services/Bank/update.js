import { BankRepository } from "../../repositories/bankRespository.js"
import "dotenv/config"

var { BANK_COIN_LIMIT } = process.env.BANK_COIN_LIMIT

export class BankUpdate {
    async execute({ id, coin }) {
        const bank = await BankRepository.findOne({ where: { id: id } })

        if(!bank) { return new Error("Bank not found.") }
        if(coin > Math.abs(BANK_COIN_LIMIT)) { coin = Math.abs(BANK_COIN_LIMIT )}

        await bank.update({ coin })
        return
    }
}
