import { BankCreate } from "../services/Bank/create.js"
import { BankRead } from "../services/Bank/read.js"
import { BankUpdate } from "../services/Bank/update.js"
import { BankCheck } from "../services/Bank/check.js"

export class BankController {
    async create(req, res) {
        try {
            const service = new BankCreate()
            const result = await service.execute()
    
            return res.status(204).send()   
        } catch (error) {
           console.log(error)
           return res.status(500).send({ message: "Internal server error." })
        }
    }

    async read(req, res) {
        const { id } = req.params

        try {
            const service = new BankRead()
            const result = await service.execute(id)

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            return res.status(200).send(result)
        } catch (error) {
           console.log(error)
           return res.status(500).send({ message: "Internal server error." })
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { coin } = req.body

        try {
            const service = new BankUpdate()
            const result = await service.execute({
                id,
                coin: Math.abs(coin)
            })

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            return res.status(204).send()
        } catch (error) {
           console.log(error)
           return res.status(500).send({ message: "Internal server error." })
        }
    }

    async check(req, res) {
        const { id } = req.params
        const { allBetCoin } = req.body

        try {
            const service = new BankCheck()
            const result = await service.execute({ 
                id,
                allBetCoin: Math.abs(allBetCoin)
            })

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            return res.status(200).json({
              statusCode: 200,
              success: true
            })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error." })
        }
    }
}
