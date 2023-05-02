import { UserCreate } from "../services/User/create.js"
import { UserRead } from "../services/User/read.js"

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
      
      return res.status(201).send({ message: userReadResult })
      
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }
}
