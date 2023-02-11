import { NextFunction, Request, Response } from "express";
import StatusCodes from "../Helpers/StatusCodes";
import IError from "../Interfaces/IError";

class ErrorHandler {
    public static handle(
        error: IError,
        _req: Request,
        res: Response,
        next: NextFunction,
    ) {
        res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR_STATUS)
            .json({ message: error.message });
        next();
    }
}

export default ErrorHandler;