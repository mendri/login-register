import { NextFunction, Request, Response } from "express";
import LoginService from "../Services/LoginService";

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
            const response = await this.service.handleLoginService();
            return this.res.status(200).json(response);
        } catch(e) {
            this.next(e);
        }
    }
}

export default LoginController;