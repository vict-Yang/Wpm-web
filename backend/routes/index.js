import infoRoute from './info'

const wrap = fn => (...args) => fn(...args).catch(args[2])

function main(app) {
  app.get('/api/getSearch', wrap(infoRoute.GetSearch))
  app.get('/api/getArticle', wrap(infoRoute.GetArticle))
  app.post('/api/createArticle', wrap(infoRoute.CreateArticle));
}

export default main
