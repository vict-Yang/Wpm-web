import {Router} from "express"
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/login", async (req, res) => {
    const { username, password } = req.query;
    const user = await User.findOne({name: username});
    if(!user)
        res.status(400).json({message: "User does not exist"});
    else {
        const correct = await bcrypt.compare(password, user.hash);
        if(correct)
        {
            const SECRET = "thisismysecretkey";
            const token = jwt.sign({name: user.name}, SECRET);
            res.status(200).json({message: "success", token});
        }
        else
            res.status(400).json({message: "wrong password"});
    }
})

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const existed = await User.findOne({name: username});
    if(existed)
        res.status(400).json({message: "username used"});
    else {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = await new User({name: username, hash: hash}).save();
        res.status(200).json({message: "success"});
    }
})

export default router;