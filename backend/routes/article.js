import { Router } from "express"
import Word from "../models/Word";

const router = Router();

router.get('/', async (req, res) => {
    const randomWords = await Word.aggregate(
        [ { $sample: { size: 200 } } ]
    )
    var article = ""
    for(let word of randomWords){
        article = article+word.string+" "
    }
    res.json({string: article})
})

export default router