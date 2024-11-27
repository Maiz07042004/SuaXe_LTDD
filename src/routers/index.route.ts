import { Express } from "express"
import { userRoutes } from "./user.route"
import { quanRoutes } from "./quan.route"


const mainV1Routes=(app: Express): void =>{
    const version ="/api/v1"

    app.use(version+"/users",userRoutes)

    app.use(version+"/quan",quanRoutes)


}
export default mainV1Routes