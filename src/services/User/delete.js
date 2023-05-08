import { UserRepository } from "../../repositories/userRepository.js"

export class UserDelete {
  async execute(serialized) {
    try {
      const user = await UserRepository.findOne({ where: { serialized: serialized } })
      
      if(!user) { return new Error("User not exist.") }
      
      const deleteUser = await user.destroy(user.id)
      return deleteUser.name
      
    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}