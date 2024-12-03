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

// [GET]/api/v1/donSuaChua/cuaHang/:IdCuaHang/:status
export const indexCuaHang=async(req: Request, res: Response)=>{
  const IdCuaHang=req.params.IdCuaHang;
  const status=req.params.status;
  const donSuaChua=await DonSuaChua.find({
    IdCuaHang:IdCuaHang,
    TrangThai:status
  })
  res.json(donSuaChua)
}


//[GET]/api/v1/donSuaChua/khachHang/:IdKhachHang/:status
export const indexKhachHang=async(req: Request, res: Response)=>{
  const IdKhachHang=req.params.IdCuaHang;
  const status=req.params.status;
  const donSuaChua=await DonSuaChua.find({
    IdKhachHang:IdKhachHang,
    TrangThai:status
  })
  res.json(donSuaChua)
}

//[POST] /api/v1/donSuaChua/update/:IdDonSuaChua/:status
export const updateDonSuaChua = async (req: Request, res: Response) => {
  const TrangThai: string = req.params.status;  // Trạng thái mới
  const IdDonSuaChua: string = req.params.IdDonSuaChua;  // ID đơn sửa chữa

  try {
    // Tìm đơn sửa chữa trong cơ sở dữ liệu
    const donSuaChua = await DonSuaChua.findById(IdDonSuaChua);

    // Kiểm tra xem đơn sửa chữa có tồn tại hay không
    if (!donSuaChua) {
      res.json({code:404, message: 'Không tìm thấy đơn sửa chữa với ID này.' });
      return
    }

    // Cập nhật trạng thái của đơn sửa chữa
    donSuaChua.TrangThai = TrangThai;

    // Lưu thay đổi vào cơ sở dữ liệu
    await donSuaChua.save();

    // Trả về thông báo thành công
    res.json({
      message: 'Cập nhật trạng thái đơn sửa chữa thành công.',
      code:200,  // Có thể trả lại thông tin đơn sửa chữa đã cập nhật
    });
    return 

  } catch (error) {
    console.error(error);
    res.json({code:500, message: 'Lỗi server, vui lòng thử lại.' });
    return 
  }
};