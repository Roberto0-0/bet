import { BankRepository } from "../../repositories/bankRespository.js"

export class BankCheck {
    async execute({ id, allBetCoin }) {
        console.log(allBetCoin)
        const bank = await BankRepository.findOne({ where: { id: id } })

        if(!bank) { return new Error("Bank not found.") }
        if(allBetCoin >= Math.abs(bank.coin)) { return new Error(`The bank limit is $${Number(bank.coin).toLocaleString("pt-BR")}`) }

        return
    }
}
