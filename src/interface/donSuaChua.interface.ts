import { Document } from "mongoose";

export interface IDonSuaChua extends Document{
    IdCuaHang?: string;
    IdKhachHang?:string;
    NgayDatDon?:Date;
    TrangThai?:string,
    DiaChi?:string,
    DichVu?:any[],
    GhiChu?: string;
    DaLike?:boolean;
}