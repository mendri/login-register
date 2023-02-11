import { Router } from "express";
import LoginController from "../Controllers/LoginController";

class LoginRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.setupRouter();
    }

    private async setupRouter() {
        this.router.post("/", (req, res, next) => new LoginController(req, res, next).login());
    }
}

export default LoginRouter;