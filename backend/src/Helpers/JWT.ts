import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import IError from "../Interfaces/IError";
import StatusCodes from "./StatusCodes";

dotenv.config();

const TOKEN_SECRET = process.env.JWT_SECRET;

const generateToken = (payload: string | object) => {
    if (typeof TOKEN_SECRET != "string") {
        const error = new Error("Problemas internos") as IError;
        error.status = StatusCodes.INTERNAL_SERVER_ERROR_STATUS;
        throw error;
    }
    const token = jwt.sign(payload, TOKEN_SECRET);
    return token;
};

export default generateToken;