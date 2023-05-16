import { UserRepository } from "../../repositories/userRepository.js"

export class UserTransferCoin {
    async execute({ send_serialized, receive_serialized, coin }) {
        try {
            const userSend = await UserRepository.findOne({ where: { serialized: send_serialized } })
            const userReceive = await UserRepository.findOne({ where: { serialized: receive_serialized } })
            
            if(!userSend) { return new Error("User send not found.") }
            if(!userReceive) { return new Error("User receive not found.") }
            
            if(Math.abs(userSend.coin) === 100) { return new Error("You cannot send the initial value.") }
            if(coin > Math.abs(userSend.coin)) { return new Error("Invalid coin.") }

            var newSendCoin = userSend.coin - coin
            var newReceiveCoin = Math.abs(userReceive.coin) + coin
            
            await userSend.update({ coin: newSendCoin })
            await userReceive.update({ coin: newReceiveCoin })

            return { 
                send: userSend.name,
                receive: userReceive.name,
                value: coin
            }
        
        } catch(error) {
            console.log(error)
            return new Error("Internal server error.") 
        }
    }
}
