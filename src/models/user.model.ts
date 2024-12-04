import mongoose from "mongoose";
import { IUser } from "../interface/user.interface";


const userSchema = new mongoose.Schema({
    TenKhachHang: String,
    GioiTinh:String,
    SDT:String,
    Password: String,
    Email:String,
    CuaHangDaLuu:{
        type:Array,
        default:[]
    },
    HinhAnh:{
        type:String,
        default:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRM-cD267Y-hZg3PTaPHGCowMwHWTpdW0RCfc2eownunIzruAo1"
    }
})

const User = mongoose.model<IUser>('User', userSchema, "khachhang");

export default User