"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cuaHangSchema = new mongoose_1.default.Schema({
    TenCuaHang: String,
    SDT: String,
    MoTa: String,
    HinhAnh: {
        type: String,
        default: "https://congcutot.vn/uploads/store/page/article/2023/07/thiet-ke-quy-mo-vua-theo-chieu-ngang.jpg"
    },
    DiaChi: String,
    Email: String,
    Like: {
        type: Number,
        default: 0
    },
    IdQuan: String,
    Password: String
});
const CuaHang = mongoose_1.default.model('CuaHang', cuaHangSchema, "cuahang");
exports.default = CuaHang;
