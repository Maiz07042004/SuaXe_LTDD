import CuaHang from "../models/cuaHang.model"
import { Request, Response } from "express"
import User from "../models/user.model"
import Quan from "../models/quan.model"

// [GET]/api/v1/cuaHang/:IdQuan
export const index = async (req: Request, res: Response) => {
  const cuaHang = await CuaHang.find({
    IdQuan:req.params.IdQuan
  })

  res.json(cuaHang)
}

// [POST] /api/v1/cuaHang/login
export const login=async(req:Request,res:Response)=>{
  const sdt:string=req.body.SDT;
  const password:string=req.body.Password;

  const cuaHang=await CuaHang.findOne({
      SDT:sdt
  })

  if(!cuaHang){
      res.json({
          code:400,
          message:"Không tồn tại SDT"
      })
      return;
  }

  if(cuaHang.Password!==password){
      res.json({
          code:400,
          message:"Sai mật khẩu"
      })
      return;
  }

  res.json({
      code:200,
      message:"Đăng nhập thành công",
      cuaHangId:cuaHang._id
  })
}

// [POST] /api/v1/cuaHang/register
export const register=async(req:Request,res:Response)=>{

  const existSDT=await CuaHang.findOne({
      SDT:req.body.SDT
  })

  if(existSDT){
      res.json({
          code:400,
          message:"SDT đã tồn tại"
      })
  } else{
      const quan=await Quan.findOne({TenQuan:req.body.TenQuan})
      if (!quan) {
        res.json({
          code: 400,
          message: "Quận không tồn tại"
        });
        return 
      }
      const cuaHang=new CuaHang({
          TenCuaHang:req.body.TenCuaHang,
          Email:req.body.Email,
          SDT:req.body.SDT,
          Password:req.body.Password,
          IdQuan:quan._id,
          MoTa:req.body.MoTa,
          DiaChi:req.body.DiaChi
      })
      await cuaHang.save();


      res.json({
          code:200,
          message:"Tạo tài khoản thành công"
      })
  }
}

// [GET]/api/v1/cuaHang/detail/:id
export const detail=async (req:Request,res:Response)=>{
  const id: string = req.params.id;

  // Tìm cửa hàng theo ID
  const cuaHang:any = await CuaHang.findOne({ _id: id });

  if (!cuaHang) {
     res.status(404).json({ message: "Cửa hàng không tồn tại" });
     return
  }

  // Tìm tên quận theo ID quận của cửa hàng
  const quan = await Quan.findOne({ _id: cuaHang.IdQuan });

  if (quan) {
    res.json({
      ...cuaHang.toObject(), // Chuyển đổi mongoose document thành object
      TenQuan: quan.TenQuan
    });
    return

  }

  res.json(cuaHang);
}

// [POST] /api/v1/cuaHang/update/:id
export const update=async (req:Request,res:Response)=>{
  const id:string=req.params.IdCuaHang
  const updateData:any = req.body;

  if (updateData.TenQuan) {
    // Tìm quận theo tên quận
    const quan = await Quan.findOne({ TenQuan: updateData.TenQuan });
    if (quan) {
      // Gán IdQuan từ tên quận vào dữ liệu cập nhật
      updateData.IdQuan = quan._id;
    } else {
      res.status(400).json({ message: "Quận không tồn tại" });
      return 
    }
  }
   // Tìm người dùng theo _id và cập nhật thông tin
   const updatedCuaHang = await CuaHang.findByIdAndUpdate(id, updateData, {
      new: true,       // Trả về document đã được cập nhật
      runValidators: true // Chạy các validator (nếu có) khi cập nhật
  });

  if (!updatedCuaHang) {
      res.json({ 
          code:400,
          message: "Không tìm thấy" });
          return 
  }

  res.json({
      code:200,
      message: "Cập nhật thành công",
  });
  
}

// [POST] /api/v1/cuaHang/updatePassword/:id
export const updatePassword=async (req:Request,res:Response)=>{
  const id:string=req.params.id
  const {Password,NewPassword}=req.body

  try {
      // Kiểm tra xem các tham số có đầy đủ không
      if (!Password || !NewPassword) {
        res.json({ code:400, message: 'Vui lòng cung cấp mật khẩu cũ và mật khẩu mới.' });
        return 
      }
  
      // Tìm người dùng trong cơ sở dữ liệu
      const cuaHang = await CuaHang.findById(id);
      if (!cuaHang) {
        res.json({ 
          code:404,
          message: 'Không tìm thấy cửa hàng với id này.' });
        return 
      }
  
       // Kiểm tra mật khẩu cũ
  if (cuaHang.Password !== Password) {
      res.json({code:401, message: 'Mật khẩu cũ không đúng.' });
      return 
    }

    // Kiểm tra mật khẩu mới (có thể thêm các điều kiện như độ dài tối thiểu...)
    if (NewPassword.length < 6) {
      res.json({ code:400,message: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
      return 
    }

    // Cập nhật mật khẩu trong cơ sở dữ liệu (Không mã hóa)
    cuaHang.Password = NewPassword;
    await cuaHang.save();

    res.json({ code:200,message: 'Mật khẩu đã được cập nhật thành công.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại.' });
    return
  }

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
