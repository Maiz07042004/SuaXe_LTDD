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
            message:"Không tồn tại Email"
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