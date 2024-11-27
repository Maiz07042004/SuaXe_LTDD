import { Document } from "mongoose";

export interface IQuan extends Document{
    TenQuan?: string;
    MoTa?:string;
    HinhAnh?:string;
}