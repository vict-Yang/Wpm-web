import {Router} from "express"
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const SECRET = "thisismysecretkey";

router.get("/signin", async (req, res) => {
    const { username, password } = req.query;
    const user = await User.findOne({name: username});
    if(!user)
        res.status(400).json({message: "User does not exist"});
    else {
        const correct = await bcrypt.compare(password, user.hash);
        if(correct)
        {
            const token = jwt.sign({name: user.name}, SECRET);
            res.status(200).json({message: "Success", token});
        }
        else
            res.status(400).json({message: "Wrong Password"});
    }
})

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const existed = await User.findOne({name: username});
    if(existed)
        res.status(400).json({message: "Username Used"});
    else {
        const hash = await bcrypt.hash(password, 10);
        const newUser = await new User({name: username, hash: hash}).save();
        res.status(200).json({message: "Success"});
    }
})

router.post("/changePassword", async (req, res) => {
    const token = req.header('Authorization').replace("Bearer ", '');
    const decoded = jwt.verify(token, SECRET);
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({name: decoded.name});
    const correct = await bcrypt.compare(oldPassword, user.hash);
    if(correct)
    {
        user.hash = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({message: "Success"});
    }
    else
        res.status(400).json({message: "Wrong Password"});  
})

export default router;