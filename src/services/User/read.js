import { UserRepository } from "../../repositories/userRepository.js"

export class UserRead {
  async execute(serialized) {
    try {
      const user = await UserRepository.findOne({
        where: { serialized: serialized }
      })
      
      if(!user) { return new Error("User not found.") }
      return user
      
    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}