"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const donSuaChuaSchema = new mongoose_1.default.Schema({
    IdCuaHang: String,
    IdKhachHang: String,
    NgayDatDon: {
        type: Date,
        default: Date.now
    },
    TrangThai: String,
    DiaChi: String,
    DichVu: {
        type: Array,
        default: []
    },
    GhiChu: String,
    DaLike: {
        type: Boolean,
        default: false
    }
});
const DonSuaChua = mongoose_1.default.model('DonSuaChua', donSuaChuaSchema, "donsuachua");
exports.default = DonSuaChua;
