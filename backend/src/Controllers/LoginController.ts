import { NextFunction, Request, Response } from "express";
import LoginService from "../Services/LoginService";

class LoginController {
    private service: LoginService;

    constructor() {
        this.service = new LoginService();
    }

    public async login(
        _req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await this.service.handleLoginService();
            return res.status(200).json(response);
        } catch(e) {
            console.log(e);
            next();
        }
    }
}

export default LoginController;