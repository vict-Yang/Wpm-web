import {Router} from "express";
import SignInRouter from "./signin";
import UserRouter from "./user";

const router = Router();
router.use('/', SignInRouter);
router.use('/user', UserRouter);

export default router;