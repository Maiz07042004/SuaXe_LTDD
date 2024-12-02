import {Router} from "express"

const router: Router=Router();
import * as controller from "../controllers/cuaHang.controller"

// Lấy danh sách cửa hàng theo Id quận
router.get("/:IdQuan",controller.index)

// Xem chi tiết cửa hàng theo Id cửa hàng
router.get("/detail/:id",controller.detail)

// Lấy danh sách cửa hàng đã lưu từ Id khách hàng
router.get("/cua-hang-da-luu/:userId",controller.getSavedShops)

// Lưu cửa hàng vào danh sách cửa hàng đã lưu của người dùng
router.post("/luu-cua-hang/:userId",controller.addSavedShop)

export const cuaHangRoutes: Router=router