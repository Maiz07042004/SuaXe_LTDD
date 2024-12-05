"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    TenKhachHang: String,
    GioiTinh: String,
    SDT: String,
    Password: String,
    Email: String,
    CuaHangDaLuu: {
        type: Array,
        default: []
    },
    HinhAnh: {
        type: String,
        default: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRM-cD267Y-hZg3PTaPHGCowMwHWTpdW0RCfc2eownunIzruAo1"
    }
});
const User = mongoose_1.default.model('User', userSchema, "khachhang");
exports.default = User;
