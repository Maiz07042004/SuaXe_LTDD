"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const donSuaChua_model_1 = __importDefault(require("../models/donSuaChua.model"));
node_cron_1.default.schedule('*/5 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 15 * 60 * 1000);
    try {
        const donSuaChuaList = yield donSuaChua_model_1.default.find({
            TrangThai: 'ChoXacNhan',
            NgayDatDon: { $lt: oneHourAgo }
        });
        for (const donSuaChua of donSuaChuaList) {
            donSuaChua.TrangThai = 'DaHuy';
            yield donSuaChua.save();
            console.log(`Đơn sửa chữa ${donSuaChua._id} đã được cập nhật trạng thái thành 'DaHuy'`);
        }
    }
    catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật trạng thái:', error);
    }
}));
