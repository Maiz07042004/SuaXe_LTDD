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
exports.capNhatLike = exports.chiTietDonSuaChua = exports.updateDonSuaChua = exports.indexKhachHangAll = exports.indexKhachHang = exports.indexCuaHang = exports.create = exports.index = void 0;
const donSuaChua_model_1 = __importDefault(require("../models/donSuaChua.model"));
const cuaHang_model_1 = __importDefault(require("../models/cuaHang.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const donSuaChua = yield donSuaChua_model_1.default.find({ IdKhachHang: userId });
    res.json(donSuaChua);
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdCuaHang, IdKhachHang, DiaChi, TrangThai, GhiChu, DichVu } = req.body;
    if (!DiaChi) {
        res.json({
            code: 400,
            message: "Thiếu thông tin yêu cầu (địa chỉ)."
        });
        return;
    }
    try {
        const newDonSuaChua = new donSuaChua_model_1.default({
            IdCuaHang: IdCuaHang,
            IdKhachHang: IdKhachHang,
            DiaChi: DiaChi,
            TrangThai: TrangThai,
            GhiChu: GhiChu || "",
            DichVu: DichVu || [],
            NgayDatDon: new Date()
        });
        const savedDonSuaChua = yield newDonSuaChua.save();
        res.json({
            code: 200,
            message: "Tạo thành công",
        });
    }
    catch (error) {
        res.json({
            code: 500,
            message: "Lỗi server, không thể tạo đơn hàng"
        });
    }
});
exports.create = create;
const indexCuaHang = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const IdCuaHang = req.params.IdCuaHang;
    const status = req.params.status;
    const donSuaChuaList = yield donSuaChua_model_1.default.find({
        IdCuaHang: IdCuaHang,
        TrangThai: status
    }).sort({ NgayDatDon: -1 });
    const updatedDonSuaChuaList = yield Promise.all(donSuaChuaList.map((donSuaChua) => __awaiter(void 0, void 0, void 0, function* () {
        const khachHang = yield user_model_1.default.findById(donSuaChua.IdKhachHang);
        if (khachHang) {
            return Object.assign(Object.assign({}, donSuaChua.toObject()), { TenKhachHang: khachHang.TenKhachHang, HinhAnh: khachHang.HinhAnh, SDT: khachHang.SDT });
        }
        return donSuaChua.toObject();
    })));
    res.json(updatedDonSuaChuaList);
});
exports.indexCuaHang = indexCuaHang;
const indexKhachHang = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const IdKhachHang = req.params.IdKhachHang;
    const status = req.params.status;
    try {
        const donSuaChuaList = yield donSuaChua_model_1.default.find({
            IdKhachHang: IdKhachHang,
            TrangThai: status
        }).sort({ NgayDatDon: -1 });
        ;
        const updatedDonSuaChuaList = yield Promise.all(donSuaChuaList.map((donSuaChua) => __awaiter(void 0, void 0, void 0, function* () {
            const cuaHang = yield cuaHang_model_1.default.findById(donSuaChua.IdCuaHang);
            if (cuaHang) {
                return Object.assign(Object.assign({}, donSuaChua.toObject()), { TenCuaHang: cuaHang.TenCuaHang, HinhAnh: cuaHang.HinhAnh, DiaChi: cuaHang.DiaChi });
            }
            return donSuaChua.toObject();
        })));
        res.json(updatedDonSuaChuaList);
    }
    catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra' });
    }
});
exports.indexKhachHang = indexKhachHang;
const indexKhachHangAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const IdKhachHang = req.params.IdKhachHang;
    try {
        const donSuaChuaList = yield donSuaChua_model_1.default.find({
            IdKhachHang: IdKhachHang
        }).sort({ NgayDatDon: -1 });
        ;
        const updatedDonSuaChuaList = yield Promise.all(donSuaChuaList.map((donSuaChua) => __awaiter(void 0, void 0, void 0, function* () {
            const cuaHang = yield cuaHang_model_1.default.findById(donSuaChua.IdCuaHang);
            if (cuaHang) {
                return Object.assign(Object.assign({}, donSuaChua.toObject()), { TenCuaHang: cuaHang.TenCuaHang, HinhAnh: cuaHang.HinhAnh, DiaChi: cuaHang.DiaChi });
            }
            return donSuaChua.toObject();
        })));
        res.json(updatedDonSuaChuaList);
    }
    catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra' });
    }
});
exports.indexKhachHangAll = indexKhachHangAll;
const updateDonSuaChua = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TrangThai = req.params.status;
    const IdDonSuaChua = req.params.IdDonSuaChua;
    try {
        const donSuaChua = yield donSuaChua_model_1.default.findById(IdDonSuaChua);
        if (!donSuaChua) {
            res.json({ code: 404, message: 'Không tìm thấy đơn sửa chữa với ID này.' });
            return;
        }
        donSuaChua.TrangThai = TrangThai;
        yield donSuaChua.save();
        res.json({
            message: 'Cập nhật trạng thái đơn sửa chữa thành công.',
            code: 200,
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.json({ code: 500, message: 'Lỗi server, vui lòng thử lại.' });
        return;
    }
});
exports.updateDonSuaChua = updateDonSuaChua;
const chiTietDonSuaChua = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const IdDonSuaChua = req.params.IdDonSuaChua;
    const donSuaChua = yield donSuaChua_model_1.default.findById(IdDonSuaChua);
    const cuaHang = yield cuaHang_model_1.default.findById(donSuaChua === null || donSuaChua === void 0 ? void 0 : donSuaChua.IdCuaHang);
    const khachHang = yield user_model_1.default.findById(donSuaChua === null || donSuaChua === void 0 ? void 0 : donSuaChua.IdKhachHang);
    res.json({
        _id: donSuaChua === null || donSuaChua === void 0 ? void 0 : donSuaChua._id,
        TrangThai: donSuaChua === null || donSuaChua === void 0 ? void 0 : donSuaChua.TrangThai,
        NgayDatDon: donSuaChua === null || donSuaChua === void 0 ? void 0 : donSuaChua.NgayDatDon,
        DichVu: donSuaChua === null || donSuaChua === void 0 ? void 0 : donSuaChua.DichVu,
        DiaChi: donSuaChua === null || donSuaChua === void 0 ? void 0 : donSuaChua.DiaChi,
        TenKhachHang: khachHang === null || khachHang === void 0 ? void 0 : khachHang.TenKhachHang,
        SDT: khachHang === null || khachHang === void 0 ? void 0 : khachHang.SDT,
        TenCuaHang: cuaHang === null || cuaHang === void 0 ? void 0 : cuaHang.TenCuaHang,
        IdCuaHang: cuaHang === null || cuaHang === void 0 ? void 0 : cuaHang._id,
        HinhAnh: cuaHang === null || cuaHang === void 0 ? void 0 : cuaHang.HinhAnh,
        DaLike: donSuaChua === null || donSuaChua === void 0 ? void 0 : donSuaChua.DaLike
    });
});
exports.chiTietDonSuaChua = chiTietDonSuaChua;
const capNhatLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const IdDonSuaChua = req.params.IdDonSuaChua;
        const donSuaChua = yield donSuaChua_model_1.default.findById(IdDonSuaChua);
        if (!donSuaChua) {
            res.json({
                code: 400,
                message: "Đơn sửa chữa không tồn tại"
            });
            return;
        }
        const cuaHang = yield cuaHang_model_1.default.findById(donSuaChua === null || donSuaChua === void 0 ? void 0 : donSuaChua.IdCuaHang);
        if (!cuaHang) {
            res.json({
                code: 400,
                message: "Cửa hàng không tồn tại"
            });
            return;
        }
        donSuaChua.DaLike = true;
        yield donSuaChua.save();
        cuaHang.Like = (cuaHang.Like || 0) + 1;
        yield cuaHang.save();
        res.json({
            code: 200,
            message: "Cập nhật like thành công"
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            code: 500,
            message: "Lỗi server"
        });
        return;
    }
});
exports.capNhatLike = capNhatLike;
