import express, { Express} from "express";
import dotenv from "dotenv"
import * as database from "./config/database"
import mainV1Routes from "./routers/index.route"


dotenv.config()

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// parse application/json
app.use(express.json());
app.use(express.urlencoded({extended:true}));


mainV1Routes(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});