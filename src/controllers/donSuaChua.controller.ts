import { Request, Response } from "express"
import DonSuaChua from "../models/donSuaChua.model"
import { IDonSuaChua } from "../interface/donSuaChua.interface"
import CuaHang from "../models/cuaHang.model"
import User from "../models/user.model"

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
  const donSuaChuaList=await DonSuaChua.find({
    IdCuaHang:IdCuaHang,
    TrangThai:status
  }).sort({ NgayDatDon: -1 });
  // 2. Duyệt qua danh sách đơn sửa chữa và lấy thông tin cửa hàng
  const updatedDonSuaChuaList = await Promise.all(donSuaChuaList.map(async (donSuaChua: any) => {
    // Lấy thông tin cửa hàng từ IdCuaHang trong đơn sửa chữa
    const khachHang = await User.findById(donSuaChua.IdKhachHang);

    // Nếu tìm thấy cửa hàng, gán thông tin vào đơn sửa chữa
    if (khachHang) {
      return {
        ...donSuaChua.toObject(), // Chuyển đổi mongoose document thành object
        TenKhachHang: khachHang.TenKhachHang,
        HinhAnh: khachHang.HinhAnh,
        SDT: khachHang.SDT
      };
    }
    
    // Nếu không tìm thấy cửa hàng, trả về đơn sửa chữa ban đầu
    return donSuaChua.toObject();
  }));
  
    // 3. Trả về danh sách đơn sửa chữa đã bổ sung thông tin cửa hàng
    res.json(updatedDonSuaChuaList);
}


//[GET]/api/v1/donSuaChua/khachHang/:IdKhachHang/:status
export const indexKhachHang=async(req: Request, res: Response)=>{
  const IdKhachHang = req.params.IdKhachHang;  // Lấy IdKhachHang từ tham số URL
  const status = req.params.status;  // Lấy status từ tham số URL

  try {
    // 1. Tìm tất cả đơn sửa chữa của khách hàng theo IdKhachHang và trạng thái
    const donSuaChuaList: any = await DonSuaChua.find({
      IdKhachHang: IdKhachHang,
      TrangThai: status
    }).sort({ NgayDatDon: -1 });;

    // 2. Duyệt qua danh sách đơn sửa chữa và lấy thông tin cửa hàng
    const updatedDonSuaChuaList = await Promise.all(donSuaChuaList.map(async (donSuaChua: any) => {
      // Lấy thông tin cửa hàng từ IdCuaHang trong đơn sửa chữa
      const cuaHang = await CuaHang.findById(donSuaChua.IdCuaHang);

      // Nếu tìm thấy cửa hàng, gán thông tin vào đơn sửa chữa
      if (cuaHang) {
        return {
          ...donSuaChua.toObject(), // Chuyển đổi mongoose document thành object
          TenCuaHang: cuaHang.TenCuaHang,
          HinhAnh: cuaHang.HinhAnh,
          DiaChi: cuaHang.DiaChi
        };
      }
      
      // Nếu không tìm thấy cửa hàng, trả về đơn sửa chữa ban đầu
      return donSuaChua.toObject();
    }));

    // 3. Trả về danh sách đơn sửa chữa đã bổ sung thông tin cửa hàng
    res.json(updatedDonSuaChuaList);
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra' });
  }
}

//[GET]/api/v1/donSuaChua/khachHang/:IdKhachHang/:status
export const indexKhachHangAll=async(req: Request, res: Response)=>{
  const IdKhachHang = req.params.IdKhachHang;  // Lấy IdKhachHang từ tham số URL

  try {
    // 1. Tìm tất cả đơn sửa chữa của khách hàng theo IdKhachHang và trạng thái
    const donSuaChuaList: any = await DonSuaChua.find({
      IdKhachHang: IdKhachHang
    }).sort({ NgayDatDon: -1 });;

    // 2. Duyệt qua danh sách đơn sửa chữa và lấy thông tin cửa hàng
    const updatedDonSuaChuaList = await Promise.all(donSuaChuaList.map(async (donSuaChua: any) => {
      // Lấy thông tin cửa hàng từ IdCuaHang trong đơn sửa chữa
      const cuaHang = await CuaHang.findById(donSuaChua.IdCuaHang);

      // Nếu tìm thấy cửa hàng, gán thông tin vào đơn sửa chữa
      if (cuaHang) {
        return {
          ...donSuaChua.toObject(), // Chuyển đổi mongoose document thành object
          TenCuaHang: cuaHang.TenCuaHang,
          HinhAnh: cuaHang.HinhAnh,
          DiaChi: cuaHang.DiaChi
        };
      }
      
      // Nếu không tìm thấy cửa hàng, trả về đơn sửa chữa ban đầu
      return donSuaChua.toObject();
    }));

    // 3. Trả về danh sách đơn sửa chữa đã bổ sung thông tin cửa hàng
    res.json(updatedDonSuaChuaList);
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra' });
  }
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

//[GET] /api/v1/donSuaChua/chiTietDonSuaChua/:IdDonSuaChua
export const chiTietDonSuaChua = async (req: Request, res: Response) => {
  const IdDonSuaChua=req.params.IdDonSuaChua;
  const donSuaChua = await DonSuaChua.findById(IdDonSuaChua);
  const cuaHang=await CuaHang.findById(donSuaChua?.IdCuaHang);
  const khachHang=await User.findById(donSuaChua?.IdKhachHang);

  res.json({
    _id:donSuaChua?._id,
    TrangThai:donSuaChua?.TrangThai,
    NgayDatDon:donSuaChua?.NgayDatDon,
    DichVu:donSuaChua?.DichVu,
    DiaChi:donSuaChua?.DiaChi,
    TenKhachHang:khachHang?.TenKhachHang,
    SDT:khachHang?.SDT,
    TenCuaHang:cuaHang?.TenCuaHang,
    IdCuaHang:cuaHang?._id,
    HinhAnh:cuaHang?.HinhAnh,
    DaLike:donSuaChua?.DaLike
  });
}

export const capNhatLike = async (req: Request, res: Response) => {
  try {
    const IdDonSuaChua = req.params.IdDonSuaChua;
    const donSuaChua = await DonSuaChua.findById(IdDonSuaChua);
    
    if (!donSuaChua) {
      res.json({
        code: 400,
        message: "Đơn sửa chữa không tồn tại"
      });
      return 
    }

    // Lấy cửa hàng liên quan đến đơn sửa chữa
    const cuaHang = await CuaHang.findById(donSuaChua?.IdCuaHang);
    if (!cuaHang) {
      res.json({
        code: 400,
        message: "Cửa hàng không tồn tại"
      });
      return 
    }

    // Cập nhật trạng thái DaLike và số lượng Like của cửa hàng
    donSuaChua.DaLike = true
    await donSuaChua.save();

    cuaHang.Like = (cuaHang.Like || 0) + 1; // Đảm bảo Like có giá trị mặc định nếu không được khởi tạo
    await cuaHang.save();

    res.json({
      code: 200,
      message: "Cập nhật like thành công"
    });

  } catch (error) {
    console.error(error);
    res.json({
      code: 500,
      message: "Lỗi server"
    });
    return 
  }
};
