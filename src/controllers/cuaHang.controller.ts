import CuaHang from "../models/cuaHang.model"
import { Request, Response } from "express"
import User from "../models/user.model"

// [GET]/api/v1/cuaHang/:IdQuan
export const index = async (req: Request, res: Response) => {
  const cuaHang = await CuaHang.find({
    IdQuan:req.params.IdQuan
  })

  res.json({
    code:"200",
    cuaHang
  })
}

// [GET]/api/v1/cuaHang/detail/:id
export const detail=async (req:Request,res:Response)=>{
  const id: string = req.params.id
  const cuaHang=await CuaHang.findOne({
    _id:id
  })
  res.json({
    code:"200",
    cuaHang
  })
}

// [GET] /api/v1/cuaHang/cua-hang-da-luu/:userId
export const getSavedShops = async (req: Request, res: Response) => {
  const userId = req.params.userId; // Lấy userId từ tham số URL
  // 1. Tìm người dùng theo userId
  const user = await User.findById(userId);
  // Kiểm tra nếu người dùng không tồn tại
  if (!user) {
    res.json({ 
      code:400,
      message: "Không thấy người dùng" 
    });
    return 
  }
  // 2. Lấy danh sách IdCuaHang từ trường CuaHangDaLuu
  const savedShopIds:any = user.CuaHangDaLuu; 
      
  // 3. Tìm cửa hàng theo danh sách các IdCuaHang
  const savedShops = await CuaHang.find({ _id: { $in: savedShopIds } });
  
  res.json({
    code:200,
    savedShops
  });
};