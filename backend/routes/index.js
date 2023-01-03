import {Router} from "express";
import SignInRouter from "./signin";
import UserRouter from "./user";
import LeaderboardRouter from "./leaderboard";
import articleRouter from "./article"
import recordRouter from "./record"

const router = Router();
router.use('/', SignInRouter);
router.use('/user', UserRouter);
router.use('/leaderboard', LeaderboardRouter);
router.use('/article', articleRouter)
router.use('/record', recordRouter)

export default router;