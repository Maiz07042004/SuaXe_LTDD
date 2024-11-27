import { Document } from "mongoose";

export interface ICuaHang extends Document{
    TenCuaHang?: string;
    SDT?:string;
    HinhAnh?:string;
    MoTa?:string,
    DiaChi?:string,
    Email?:string,
    Like?: number;
    IdQuan?:string,
}