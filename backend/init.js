import Info from './models/info'
import infoData from './articles.json'

const dataInit = async () => {
    await Info.deleteMany({})
    await Info.insertMany(infoData)
}
  

export { dataInit }