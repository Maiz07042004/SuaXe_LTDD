import { Document } from "mongoose";

export interface IUser extends Document{
    TenKhachHang?: string;
    GioiTinh?:string;
    SDT?:string;
    Password?: string;
    Email?:string;
    CuaHangDaLuu?:any[];
}