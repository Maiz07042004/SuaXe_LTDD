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
    }
})

const User = mongoose.model<IUser>('User', userSchema, "khachhang");

export default User