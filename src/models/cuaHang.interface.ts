import mongoose from "mongoose";
import { ICuaHang } from "../interface/cuaHang.interface";

const cuaHangSchema = new mongoose.Schema({
  TenCuaHang: String,
  SDT:String,
  MoTa:String,
  HinhAnh:String,
  DiaChi:String,
  Email:String,
  Like: Number,
  IdQuan:String,
})

const CuaHang = mongoose.model<ICuaHang>('CuaHang', cuaHangSchema, "cuahang");

export default CuaHang