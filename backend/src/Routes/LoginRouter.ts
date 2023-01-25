import { Router } from "express";
import LoginController from "../Controllers/LoginController";

const router = Router();

router.get("/", (req, res, next) => new LoginController(req, res, next).login());

export default router;