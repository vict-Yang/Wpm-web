import { Router } from "express"
import User from "../models/User";

const router = Router();

router.post('/', async (req, res) => {
    const { username, WPM } = req.body;
    await User.updateOne({name: username, bestWPM: {$lt: WPM}},{
        $set: {
            bestWPM: WPM
        }
    })
    await User.updateOne({name: username},{
        $push: {
            recentWPM: {
                WPM: WPM,
                time: new Date()
            }
        }
    })
    await User.updateOne({name: username, recentWPM: {$size: 11}},{
        $pop: {
            recentWPM: -1
        }
    })
    const user = await User.findOne({name: username})
    console.log(user.recentWPM)
    res.json({message: "Saved"})
})

export default router