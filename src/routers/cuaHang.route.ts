import {Router} from "express"

const router: Router=Router();
import * as controller from "../controllers/cuaHang.controller"


router.get("/:IdQuan",controller.index)

router.get("/detail:id",controller.detail)

router.get("/cua-hang-da-luu/:userId",controller.getSavedShops)

export const cuaHangRoutes: Router=router