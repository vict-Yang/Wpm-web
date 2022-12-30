import { Router } from "express"
import User from "../models/User";

const router = Router();

router.get('/', async (req, res) => {
    const { username } = req.query;
    const user = await User.findOne({name: username});
    if(!user)
        res.json({message: "Not Found"});
    else
        res.json({message: "Found"});
})

export default router