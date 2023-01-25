import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import connectToDatabase from "./Models/connection";
import LoginRouter from "./Routes/LoginRouter";


class App {
    private app: Express;

    constructor() {
        this.app = express();
    }
    
    private config() {
        this.app.use(express.json());
        this.app.use("/login", new LoginRouter().router);
    }

    public start() {
        this.config();
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