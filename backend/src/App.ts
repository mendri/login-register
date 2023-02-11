import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import connectToDatabase from "./Models/connection";
import cors from "cors";
import LoginRouter from "./Routes/LoginRouter";
import ErrorHandler from "./Middlewares/ErrorHandler";
import RegisterRouter from "./Routes/RegisterRouter";


class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.config();
    }
    
    private config() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use("/login", new LoginRouter().router);
        this.app.use("/register", new RegisterRouter().router);
        this.app.use(ErrorHandler.handle);
    }

    public start() {
        connectToDatabase(process.env.MONGO_DB_URI || "").then(
            () => {
                this.app.listen(process.env.PORT, () => {
                    console.log(`Running at Port ${process.env.PORT}`);
                });
            }
        ).catch((error) => {
            console.log("Connection with database generated an error:\r\n");
            console.error(error);
            console.log("\r\nServer initialization cancelled");
            process.exit(0);
        });
    }
}

export default App;