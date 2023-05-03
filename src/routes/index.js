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
      this.router.post("/update/:serialized", new UserController().update)
    }
}