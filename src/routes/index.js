import { Router } from "express"

export class Routes {
    constructor() {
        this.router = Router()

        this.home()
    }

    home() {
        this.get("/", (req, res) => {
            return res.send("hellos")
        })
    }
}