import { UserRepository } from "../../repositories/userRepository.js"

export class UserCreate {
  async execute({ name, serialized }) {
    try {
      const user = await UserRepository.findOne({
        where: { serialized: serialized }
      })
      
      if(user) { return new Error("User already exist.") }
      
      const newUser = await UserRepository.create({ name, serialized })
      return {
        success_message: `${newUser.name}, your account has been created.`,
      }
      
    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}