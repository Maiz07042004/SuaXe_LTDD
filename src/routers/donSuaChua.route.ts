import {Router} from "express"

const router: Router=Router();
import * as controller from "../controllers/donSuaChua.controller"


router.get("/:userId",controller.index)

router.get("/detail:id")

router.get("/cua-hang-da-luu/:userId")

export const donSuaChuaRoutes: Router=router