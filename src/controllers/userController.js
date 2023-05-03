import { UserCreate } from "../services/User/create.js"
import { UserRead } from "../services/User/read.js"
import { UserUpdate } from "../services/User/update.js"

export class UserController {
  async create(req, res) {
    const { name, serialized } = req.body
    
    try {
      const userCreateService = new UserCreate()
      const userCreateResult = await userCreateService.execute({
        name,
        serialized
      })
      
      if(userCreateResult instanceof Error) { return res.status(400).send({ message: userCreateResult.message }) }
      
      return res.status(201).send({ message: userCreateResult })
      
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }
  
  async read(req, res) {
    const { serialized } = req.query
    
    try {
      const userReadService = new UserRead()
      const userReadResult = await userReadService.execute(serialized)
      
      if(userReadResult instanceof Error) { return res.status(400).send({ message: userReadResult.message }) }
      
      return res.status(200).send(userReadResult)
      
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }
  
  async update(req, res) {
    const { serialized } = req.params
    const { money, bets } = req.body
    
    try {
      const userUpdateService = new UserUpdate()
      const userUpdateResult = await userUpdateService.execute({
        serialized,
        money: Math.abs(money),
        bets: Math.abs(bets)
      })
      
      if(userUpdateResult instanceof Error) { return res.status(400).send({ message: userUpdateResult.message }) }
      
      return res.status(200)
      
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }
}
