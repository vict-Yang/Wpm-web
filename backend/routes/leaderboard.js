import { Router } from "express"
import User from "../models/User";

const router = Router();

router.get('/', async (req, res) => {
    const sortedUsers = await User.find({}).sort({bestWPM: -1});
    const top50 = sortedUsers.slice(0, 50).map((user, index) => ({
        username: user.name,
        bestWPM: user.bestWPM,
        ranking: index+1,
    }));

    const selfName = req.query.name;
    const selfRanking = sortedUsers.findIndex((user) => user.name === selfName) + 1;
    const selfWPM = sortedUsers[selfRanking - 1].bestWPM;

    res.json({topUsers: top50, self: {username: selfName, bestWPM: selfWPM, ranking: selfRanking}});
})

export default router