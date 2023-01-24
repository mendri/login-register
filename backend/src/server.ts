import * as dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectToDatabase from "./Models/connection";

connectToDatabase(process.env.MONGO_DB_URI || "").then(
    () => {
        app.listen(3001, () => {
            console.log("Running at Port 3001");
        });
    }
).catch((error) => {
    console.log("Connection with database generated an error:\r\n");
    console.error(error);
    console.log("\r\nServer initialization cancelled");
    process.exit(0);
});