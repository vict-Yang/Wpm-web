import { Router } from "express"
import Word from "../models/Word";
import articleRouter from "./article"
import recordRouter from "./record"

const router = Router();

router.get('/', async (req, res) => {
    const randomWords = await Word.aggregate(
        [ { $sample: { size: 600 } } ]
    )
    var article = ""
    for(let word of randomWords){
        article = article+word.string+" "
    }
    res.json({string: article})
})

export default router