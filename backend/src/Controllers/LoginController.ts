import { NextFunction, Request, Response } from "express";
import StatusCodes from "../Helpers/StatusCodes";
import LoginService from "../Services/LoginService";
import UserValidation from "../Validations/UserValidation";

class LoginController {
    private req: Request;
    private res: Response;
    private next: NextFunction;
    private service: LoginService;

    constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.service = new LoginService();
    }

    public async login() {
        try {
            const { user } = this.req.body;
            UserValidation.validate(user);
            const token = await this.service.handleLoginService(user);
            return this.res.status(StatusCodes.OK_STATUS).json({ token });
        } catch(e) {
            this.next(e);
        }
    }
}

export default LoginController;