import {Router} from "express";
import LoginRouter from "./login";

const router = Router()
router.use('/', LoginRouter);

export default router;