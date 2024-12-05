"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const quanSchema = new mongoose_1.default.Schema({
    TenQuan: String,
    MoTa: String,
    HinhAnh: String,
});
const Quan = mongoose_1.default.model('Quan', quanSchema, "quan");
exports.default = Quan;
