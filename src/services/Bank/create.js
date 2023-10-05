import { BankRepository } from "../../repositories/bankRespository.js"

export class BankCreate {
    async execute() {
        await BankRepository.create()

        return
    }
}
