import express from "express";
import cors from "cors";
import mongo from './mongo';
import routes from "./routes"

mongo.connect();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { 
    console.log(`Server listening on port ${PORT}`)
});