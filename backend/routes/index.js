import {Router} from "express";
import SignInRouter from "./signin";
import UserRouter from "./user";
import LeaderboardRouter from "./leaderboard";

const router = Router();
router.use('/', SignInRouter);
router.use('/user', UserRouter);
router.use('/leaderboard', LeaderboardRouter);

export default router;