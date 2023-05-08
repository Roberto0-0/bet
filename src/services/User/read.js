import { UserRepository } from "../../repositories/userRepository.js"

export class UserRead {
  async execute(serialized) {
    try {
      const user = await UserRepository.findOne({ where: { serialized: serialized } })
      const allUsers = await UserRepository.findAll({
        order:[
            ["diamond", "DESC"]
        ]
      })

      if(!user) { return new Error("User not found.") }

      const result = new Promise((resolve, reject) => {
        allUsers.map((users) => {
            if(users.diamond > 0) {
                if(user.serialized == allUsers[0].serialized) {
                    resolve({ user,crown: true })
                }
                resolve({ user,crown: false })   
            } else {
              resolve({ user,crown: false })
            }
          })
      })
      return result

    } catch(error) {
      console.log(error)
      return new Error("Internal server error.") 
    }
  }
}
