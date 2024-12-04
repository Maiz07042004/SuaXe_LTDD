import {Router} from "express"

const router: Router=Router();
import * as controller from "../controllers/donSuaChua.controller"


router.get("/:userId",controller.index)

router.post("/create",controller.create)

//Danh sách đơn hàng của cửa hàng
router.get("/cuaHang/:IdCuaHang/:status",controller.indexCuaHang)

//Danh sách đơn hàng theo trạng thái của khách hàng
router.get("/khachHang/:IdKhachHang/:status",controller.indexKhachHang)

//Danh sách đơn hàng của khách hàng
router.get("/khachHang/:IdKhachHang",controller.indexKhachHangAll)

// Update đơn sửa chữa
router.post("/updateDonSuaChua/:IdDonSuaChua/:status",controller.updateDonSuaChua)

export const donSuaChuaRoutes: Router=router