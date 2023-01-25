import { Router } from "express";
import LoginController from "../Controllers/LoginController";

class LoginRouter {
    public router: Router;
    private controller: LoginController;

    constructor() {
        this.router = Router();
        this.controller = new LoginController();
        this.setupRoutes();
    }

    private async setupRoutes() {
        this.router.get("/", (req, res, next) => this.controller.login(req, res, next));
    }
}


export default LoginRouter;