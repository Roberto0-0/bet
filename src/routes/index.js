import { Router } from "express"
import { UserController} from "../controllers/userController.js"

export class Routes {
    constructor() {
        this.router = Router()

        this.home()
        this.user()
    }

    home() {
        this.router.get("/", (req, res) => {
            return res.send("hellos")
        })
    }
    
    user() {
      this.router.post("/create", new UserController().create)
      this.router.get("/read", new UserController().read)
      this.router.post("/won/:serialized", new UserController().won)
      this.router.post("/loses/:serialized", new UserController().loses)
      this.router.post("/transfer/:send_serialized/:receive_serialized", new UserController().transfer)
    }
}