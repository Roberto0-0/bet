import { UserRepository } from "../../repositories/userRepository.js"
import dayjs from "dayjs"

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

      var currentDate = Number(dayjs(new Date()).format("DD"))
      var updateDate = Number(dayjs(user.updatedAt).format("DD"))

      if(user.limit == 3) {
        if(currentDate >= updateDate) {
            var newCoint = Math.abs(user.coin) + 100
            await user.update({ coin: newCoint, limit: 0 })
        }
      }

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
