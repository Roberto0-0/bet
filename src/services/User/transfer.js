import { UserRepository } from "../../repositories/userRepository.js"
import { COIN_LIMIT } from "./won.js"

export class UserTransferCoin {
    async execute({ send_serialized, receive_serialized, coin }) {
        try {
            const [ userSend, userReceive ] = await Promise.all([
                UserRepository.findOne({ where: { serialized: send_serialized } }),
                UserRepository.findOne({ where: { serialized: receive_serialized } })
            ])

            if(!userSend) { return new Error("User send not found.") }
            if(!userReceive) { return new Error("User receive not found.") }
            
            if(Math.abs(userSend.coin) === 100) { return new Error("You cannot send the initial value.") }
            if(coin > Math.abs(userSend.coin)) { return new Error("Invalid coin.") }

            var newSendCoin = Math.abs(userSend.coin) - coin
            var newReceiveCoin = Math.abs(userReceive.coin) + coin

            if(newReceiveCoin > COIN_LIMIT) { newReceiveCoin = COIN_LIMIT }
            
            await userSend.update({ coin: newSendCoin })
            await userReceive.update({ coin: newReceiveCoin })

            return { 
                send: userSend.name,
                receive: userReceive.name,
                value: coin
            }
        
        } catch(error) {
            console.error(error)
            return new Error("Internal server error.") 
        }
    }
}
