import {Router} from "express"

const router: Router=Router();
import * as controller from "../controllers/quan.controller"


router.get("/",controller.index)



export const quanRoutes: Router=router