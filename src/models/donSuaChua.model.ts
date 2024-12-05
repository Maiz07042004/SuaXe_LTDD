import mongoose from "mongoose";
import { IDonSuaChua } from "../interface/donSuaChua.interface";

const donSuaChuaSchema = new mongoose.Schema({
  IdCuaHang: String,
  IdKhachHang:String,
  NgayDatDon:{
    type: Date,
    default: Date.now 
  },
  TrangThai:String,
  DiaChi:String,
  DichVu:{
    type:Array,
    default:[]
  },
  GhiChu: String,
  DaLike:{
    type:Boolean,
    default:false
  }
})

const DonSuaChua = mongoose.model<IDonSuaChua>('DonSuaChua', donSuaChuaSchema, "donsuachua");

export default DonSuaChua