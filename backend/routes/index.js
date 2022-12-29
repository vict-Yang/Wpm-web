import {Router} from "express";
import SignInRouter from "./signin";

const router = Router()
router.use('/', SignInRouter);

export default router;