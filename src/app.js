import express from "express"
import bodyParser from "body-parser"
import Routes from "./routes/index"
import { sequelize } from "./database/index"

export class App {
    constructor() {
        this.app = express()
        this.sequelizeSync = sequelize
        
        this.middlewares()
        this.routes()
    }
    
    middlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
    
        this.sequelizeSync.sync()
    }
    
    routes() {
        this.app.use(new Routes().router)
    }
}
