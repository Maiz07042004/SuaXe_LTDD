import mongoose from "mongoose";
import { ICuaHang } from "../interface/cuaHang.interface";

const cuaHangSchema = new mongoose.Schema({
  TenCuaHang: String,
  SDT:String,
  MoTa:String,
  HinhAnh:{
    type:String,
    default:"https://congcutot.vn/uploads/store/page/article/2023/07/thiet-ke-quy-mo-vua-theo-chieu-ngang.jpg"
  },
  DiaChi:String,
  Email:String,
  Like: {
    type:Number,
    default:0
  },
  IdQuan:String,
  Password:String
})

const CuaHang = mongoose.model<ICuaHang>('CuaHang', cuaHangSchema, "cuahang");

export default CuaHang