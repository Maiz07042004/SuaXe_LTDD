import { Request, Response } from "express"
import DonSuaChua from "../models/donSuaChua.model"
import { IDonSuaChua } from "../interface/donSuaChua.interface"

// [GET]/api/v1/donSuaChua/:userId
export const index = async (req: Request, res: Response) => {
  const userId=req.params.userId
  const donSuaChua = await DonSuaChua.find({IdKhachHang:userId})

  res.json(donSuaChua)
}

// [GET]/api/v1/donSuaChua/create
export const create=async (req: Request, res: Response) => {
  const { IdCuaHang, IdKhachHang,DiaChi, TrangThai, GhiChu, DichVu } = req.body;
  // Kiểm tra các trường thông tin yêu cầu
  if (!DiaChi) {
    res.json({
      code: 400,
      message: "Thiếu thông tin yêu cầu (địa chỉ)."
    });
    return 
  }
  try {
    // Tạo đối tượng đơn hàng mới
    const newDonSuaChua: IDonSuaChua = new DonSuaChua({
      IdCuaHang: IdCuaHang, // Lưu cửa hàng (userShop)
      IdKhachHang: IdKhachHang, // Lưu khách hàng (userId)
      DiaChi: DiaChi, // Địa chỉ của khách hàng
      TrangThai: TrangThai, // Trạng thái đơn hàng
      GhiChu: GhiChu || "", // Ghi chú nếu có
      DichVu: DichVu || [], // Dịch vụ đã chọn (mảng có thể trống)
      NgayDatDon: new Date() // Ngày đặt đơn (tự động là thời gian hiện tại)
    });

    // Lưu đơn hàng vào database
    const savedDonSuaChua = await newDonSuaChua.save();

    res.json({
      code:200,
      message:"Tạo thành công",
    })
  } catch (error) {
    res.json({
      code: 500,
      message: "Lỗi server, không thể tạo đơn hàng"
    });
  }
}