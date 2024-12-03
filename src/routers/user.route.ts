import {Router} from "express"

const router: Router=Router();
import * as controller from "../controllers/user.controller"


router.get("/",controller.index)

router.get("/detail/:id",controller.detail)

router.post("/update/:id",controller.update)

router.post("/updatePassword/:id",controller.updatePassword)

router.post("/login",controller.login)

router.post("/register",controller.register)

export const userRoutes: Router=router