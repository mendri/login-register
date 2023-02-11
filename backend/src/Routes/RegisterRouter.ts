import { Router } from "express";
import RegisterController from "../Controllers/RegisterController";

class RegisterRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.setupRouter();
    }

    private setupRouter() {
        this.router.post("/", (req, res, next) => new RegisterController(req, res, next).register());
    }
}

export default RegisterRouter;