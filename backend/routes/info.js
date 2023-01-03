import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    const allArticles = Info.find()
    allArticles.exec((error, articles)=>{
        if(error){
            res.status(403).send({ message: 'error', contents: null })
        }
        else{
            res.status(200).send({ message: 'success', contents: articles })
        }
    })
}

exports.GetArticle = async (req, res) => {
    const id = req.query.id
    const allArticles = Info.find()
    allArticles.exec((error, articles)=>{
        if(error){
            res.status(403).send({ message: 'error', contents: [] })
        }
        else{
            const result = articles.filter(article => article.id===id)[0]
            res.status(200).send({ message: 'success', contents: result })
        }
    })
}