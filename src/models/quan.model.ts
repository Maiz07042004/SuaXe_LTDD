import mongoose from "mongoose";
import { IQuan } from "../interface/quan.interface";


const quanSchema = new mongoose.Schema({
    TenQuan: String,
    MoTa:String,
    HinhAnh:String,
})

const Quan = mongoose.model<IQuan>('Quan', quanSchema, "quan");

export default Quan