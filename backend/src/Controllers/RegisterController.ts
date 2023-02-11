import { NextFunction, Request, Response } from "express";
import RegisterService from "../Services/RegisterService";
import StatusCodes from "../Helpers/StatusCodes";
import UserValidation from "../Validations/UserValidation";

class RegisterController {
    private req: Request;
    private res: Response;
    private next: NextFunction;
    private service: RegisterService;

    constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.service = new RegisterService();
    }

    public async register() {
        try {
            const { user } = this.req.body;
            UserValidation.validate(user);
            await this.service.handleRegister(user);
            return this.res.status(StatusCodes.OK_STATUS).json({ message: "Usuário Registrado" });
        } catch(e) {
            this.next(e);
        }
    }
}

export default RegisterController;