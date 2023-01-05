import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import Word from "./models/Word"
import User from "./models/User"
import userData from "./users.json"
import wordData from "./words.json"

const dataInit = async () => {
    await User.deleteMany({})
    await User.insertMany(userData)
    await Word.deleteMany({})
    await Word.insertMany(wordData)
}

export default {
    connect: () => {
        dotenv.config();
        if (!process.env.MONGO_URL) {
            console.error("Missing MONGO_URL!!!");
            process.exit(1);
        }
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((res) => {
            console.log("mongo db connection created")
            if(process.env.MODE === "reset")
            {
                console.log("initialize data")
                dataInit()
            }
        });
        mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    }
};