import { Request, Response } from "express"
import DonSuaChua from "../models/donSuaChua.model"
import { IDonSuaChua } from "../interface/donSuaChua.interface"

// [GET]/api/v1/donSuaChua/:userId
export const index = async (req: Request, res: Response) => {
  const userId=req.params.userId
  const donSuaChua = await DonSuaChua.find({IdKhachHang:userId})

  res.json(donSuaChua)
}

// [GET]/api/v1/donSuaChua/create/:userId/:userShop
export const create=async (req: Request, res: Response) => {
  const { userId, userShop } = req.params;
  const { diaChi, trangThai, ghiChu, dichVu } = req.body;
  // Kiểm tra các trường thông tin yêu cầu
  if (!diaChi) {
    res.json({
      code: 400,
      message: "Thiếu thông tin yêu cầu (địa chỉ)."
    });
    return 
  }
  try {
    // Tạo đối tượng đơn hàng mới
    const newDonSuaChua: IDonSuaChua = new DonSuaChua({
      IdCuaHang: userShop, // Lưu cửa hàng (userShop)
      IdKhachHang: userId, // Lưu khách hàng (userId)
      DiaChi: diaChi, // Địa chỉ của khách hàng
      TrangThai: trangThai, // Trạng thái đơn hàng
      GhiChu: ghiChu || "", // Ghi chú nếu có
      DichVu: dichVu || [], // Dịch vụ đã chọn (mảng có thể trống)
      NgayDatDon: new Date() // Ngày đặt đơn (tự động là thời gian hiện tại)
    });

    // Lưu đơn hàng vào database
    const savedDonSuaChua = await newDonSuaChua.save();

    res.json({
      code:200,
      message:"Tạo thành công",
      donSuaChua: savedDonSuaChua
    })
  } catch (error) {
    res.json({
      code: 500,
      message: "Lỗi server, không thể tạo đơn hàng"
    });
  }
}