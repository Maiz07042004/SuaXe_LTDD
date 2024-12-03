import { Request, Response } from "express"
import User from "../models/user.model"


// [POST] /api/v1/users/register
export const register=async(req:Request,res:Response)=>{

    const existSDT=await User.findOne({
        SDT:req.body.SDT
    })

    if(existSDT){
        res.json({
            code:400,
            message:"SDT đã tồn tại"
        })
    } else{
        const user=new User({
            TenKhachHang:req.body.TenKhachHang,
            Email:req.body.Email,
            SDT:req.body.SDT,
            Password:req.body.Password,
            GioiTinh:req.body.GioiTinh
        })
        await user.save();


        res.json({
            code:200,
            message:"Tạo tài khoản thành công",
            userId:user._id
        })
    }
}

// [GET]/api/v1/users
export const index = async (req: Request, res: Response) => {
    const user = await User.find()

    res.json(user)
}

// [GET]/api/v1/users/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id

    const user = await User.findOne({
        _id: id
    })

    res.json(user)
}

// [POST] /api/v1/users/update/:id
export const update=async (req:Request,res:Response)=>{
    const id:string=req.params.id
    const updateData = req.body;

     // Tìm người dùng theo _id và cập nhật thông tin
     const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,       // Trả về document đã được cập nhật
        runValidators: true // Chạy các validator (nếu có) khi cập nhật
    });

    if (!updatedUser) {
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

// [POST] /api/v1/users/updatePassword/:id
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
        const user = await User.findById(id);
        if (!user) {
          res.json({ 
            code:404,
            message: 'Không tìm thấy người dùng với id này.' });
          return 
        }
    
         // Kiểm tra mật khẩu cũ
    if (user.Password !== Password) {
        res.json({code:401, message: 'Mật khẩu cũ không đúng.' });
        return 
      }
  
      // Kiểm tra mật khẩu mới (có thể thêm các điều kiện như độ dài tối thiểu...)
      if (NewPassword.length < 6) {
        res.json({ code:400,message: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
        return 
      }
  
      // Cập nhật mật khẩu trong cơ sở dữ liệu (Không mã hóa)
      user.Password = NewPassword;
      await user.save();
  
      res.json({ code:200,message: 'Mật khẩu đã được cập nhật thành công.' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server, vui lòng thử lại.' });
      return
    }

}

// [POST] /api/v1/users/login
export const login=async(req:Request,res:Response)=>{
    const sdt:string=req.body.SDT;
    const password:string=req.body.Password;

    const user=await User.findOne({
        SDT:sdt
    })

    if(!user){
        res.json({
            code:400,
            message:"Không tồn tại SDT"
        })
        return;
    }

    if(user.Password!==password){
        res.json({
            code:400,
            message:"Sai mật khẩu"
        })
        return;
    }

    res.json({
        code:200,
        message:"Đăng nhập thành công",
        userId:user._id
    })
}