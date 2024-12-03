import CuaHang from "../models/cuaHang.model"
import { Request, Response } from "express"
import User from "../models/user.model"

// [GET]/api/v1/cuaHang/:IdQuan
export const index = async (req: Request, res: Response) => {
  const cuaHang = await CuaHang.find({
    IdQuan:req.params.IdQuan
  })

  res.json(cuaHang)
}

// [GET]/api/v1/cuaHang/detail/:id
export const detail=async (req:Request,res:Response)=>{
  const id: string = req.params.id
  const cuaHang=await CuaHang.findOne({
    _id:id
  })
  res.json(cuaHang)
}

// [GET] /api/v1/cuaHang/cua-hang-da-luu/:userId
export const getSavedShops = async (req: Request, res: Response) => {
  const userId = req.params.userId; // Lấy userId từ tham số URL
  // Tìm người dùng theo userId
  const user = await User.findById(userId);
  // Kiểm tra nếu người dùng không tồn tại
  if (!user) {
    res.json({ 
      code:400,
      message: "Không thấy người dùng" 
    });
    return 
  }
  //  Lấy danh sách IdCuaHang từ trường CuaHangDaLuu
  const savedShopIds:any = user.CuaHangDaLuu; 
      
  //  Tìm cửa hàng theo danh sách các IdCuaHang
  const savedShops = await CuaHang.find({ _id: { $in: savedShopIds } });

  res.json(savedShops);
};

// [POST] /api/v1/cuaHang/luu-cua-hang/:userId
export const addSavedShop = async (req: Request, res: Response) => {
  const userId = req.params.userId;  // Lấy userId từ tham số URL
  const { cuaHangId } = req.body;    // Lấy cuaHangId từ body của request (ID của cửa hàng cần thêm)

  // Kiểm tra xem cuaHangId đã tồn tại trong danh sách chưa
  if (!cuaHangId) {
    res.json({
      code: 400,
      message: "ID cửa hàng không hợp lệ"
    });
    return
  }

  try {
    // Tìm người dùng theo userId
    const user = await User.findById(userId);

    if (!user) {
      res.json({
        code: 404,
        message: "Không tìm thấy người dùng"
      });
      return
    }

    // Kiểm tra nếu ID cửa hàng đã tồn tại trong CuaHangDaLuu
    if (user?.CuaHangDaLuu?.includes(cuaHangId)) {
      res.json({
        code: 400,
        message: "Cửa hàng này đã được lưu trước đó"
      });
      return
    }

    // Thêm cuaHangId vào danh sách CuaHangDaLuu của người dùng
    user?.CuaHangDaLuu?.push(cuaHangId);

    // Lưu lại thay đổi vào cơ sở dữ liệu
    await user?.save();

    res.status(200).json({
      code: 200,
      message: "Cửa hàng đã được thêm vào danh sách lưu"
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Lỗi server: " 
    });
  }
};

// [DELETE] /api/v1/cuaHang/xoa-cua-hang-da-luu/:userId
export const deleteSavedShop = async (req: Request, res: Response) => {
  const userId = req.params.userId;  // Lấy userId từ tham số URL
  const { cuaHangId } = req.body;    // Lấy cuaHangId từ body của request (ID của cửa hàng cần xóa)

  // Kiểm tra xem cuaHangId đã tồn tại hay chưa
  if (!cuaHangId) {
    res.json({
      code: 400,
      message: "ID cửa hàng không hợp lệ"
    });
    return;
  }

  try {
    // Tìm người dùng theo userId
    const user = await User.findById(userId);

    if (!user) {
      res.json({
        code: 404,
        message: "Không tìm thấy người dùng"
      });
      return;
    }

    // Kiểm tra xem cửa hàng có trong danh sách lưu của người dùng không
    if (!user?.CuaHangDaLuu?.includes(cuaHangId)) {
      res.json({
        code: 400,
        message: "Cửa hàng này chưa được lưu"
      });
      return;
    }

    // Xóa cuaHangId khỏi danh sách CuaHangDaLuu của người dùng
    user.CuaHangDaLuu = user.CuaHangDaLuu.filter(id => id !== cuaHangId);

    // Lưu lại thay đổi vào cơ sở dữ liệu
    await user.save();

    res.status(200).json({
      code: 200,
      message: "Cửa hàng đã được xóa khỏi danh sách lưu"
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Lỗi server: "
    });
  }
};
