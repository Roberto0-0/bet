import { Router } from "express"
import { UserController } from "../controllers/userController.js"
import { BankController } from "../controllers/bankController.js"

export class Routes {
    constructor() {
        this.router = Router()

        this.user()
        this.bank()
    }

    user() {
      this.router.post("/create", new UserController().create)
      this.router.get("/read/:serialized", new UserController().read)
      this.router.put("/update/:serialized", new UserController().update)
      this.router.delete("/delete/:serialized", new UserController().delete)
      this.router.put("/won/:serialized", new UserController().won)
      this.router.put("/loses/:serialized", new UserController().loses)
      this.router.put("/transfer/:send_serialized/:receive_serialized", new UserController().transfer)
      this.router.put("/buy/:serialized", new UserController().buy)
      this.router.put("/sellMarket/:serialized", new UserController().sellMarket)
      this.router.put("/sell/:selleSerialized/:buyerSerialized", new UserController().sell)
      this.router.put("/buyer/:selleSerialized/:buyerSerialized", new UserController().buyer)
      this.router.get("/profile/:commandSerialized/:profileSerialized", new UserController().profile)
      this.router.get("/ranking", new UserController().ranking)
    }

    bank() {
      this.router.post("/bank", new BankController().create)
      this.router.get("/bank/:id", new BankController().read)
      this.router.put("/bank/:id", new BankController().update)
      this.router.put("/bank/check/:id", new BankController().check)
    }
}
