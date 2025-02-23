import { Router } from "express"
import { AccountController } from "../controllers/accountController.js"
import { BankController } from "../controllers/bankController.js"

export class Routes {
    constructor() {
        this.router = Router()

        this.account()
        this.bank()
    }

    account() {
      this.router.post("/account/create", new AccountController().create)
      this.router.get("/account/read/:serialized", new AccountController().read)
      this.router.put("/account/update/:serialized", new AccountController().update)
      this.router.delete("/account/delete/:serialized", new AccountController().delete)
      this.router.put("/account/won/:serialized", new AccountController().won)
      this.router.put("/account/loses/:serialized", new AccountController().loses)
      this.router.put("/transfer/:send_serialized/:receive_serialized", new AccountController().transfer)
      this.router.put("/buy/:serialized", new AccountController().buy)
      this.router.put("/sellMarket/:serialized", new AccountController().sellMarket)
      this.router.put("/sell/:selleSerialized/:buyerSerialized", new AccountController().sell)
      this.router.put("/buyer/:selleSerialized/:buyerSerialized", new AccountController().buyer)
      this.router.get("/profile/:commandSerialized/:profileSerialized", new AccountController().profile)
      this.router.get("/ranking", new AccountController().ranking)
    }

    bank() {
      this.router.post("/bank", new BankController().create)
      this.router.get("/bank/:id", new BankController().read)
      this.router.put("/bank/:id", new BankController().update)
      this.router.put("/bank/check/:id", new BankController().check)
    }
}
