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
exports.deleteSavedShop = exports.addSavedShop = exports.getSavedShops = exports.updatePassword = exports.update = exports.detail = exports.register = exports.login = exports.index = void 0;
const cuaHang_model_1 = __importDefault(require("../models/cuaHang.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const quan_model_1 = __importDefault(require("../models/quan.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cuaHang = yield cuaHang_model_1.default.find({
        IdQuan: req.params.IdQuan
    });
    res.json(cuaHang);
});
exports.index = index;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sdt = req.body.SDT;
    const password = req.body.Password;
    const cuaHang = yield cuaHang_model_1.default.findOne({
        SDT: sdt
    });
    if (!cuaHang) {
        res.json({
            code: 400,
            message: "Không tồn tại SDT"
        });
        return;
    }
    if (cuaHang.Password !== password) {
        res.json({
            code: 400,
            message: "Sai mật khẩu"
        });
        return;
    }
    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        cuaHangId: cuaHang._id
    });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existSDT = yield cuaHang_model_1.default.findOne({
        SDT: req.body.SDT
    });
    if (existSDT) {
        res.json({
            code: 400,
            message: "SDT đã tồn tại"
        });
    }
    else {
        const quan = yield quan_model_1.default.findOne({ TenQuan: req.body.TenQuan });
        if (!quan) {
            res.json({
                code: 400,
                message: "Quận không tồn tại"
            });
            return;
        }
        const cuaHang = new cuaHang_model_1.default({
            TenCuaHang: req.body.TenCuaHang,
            Email: req.body.Email,
            SDT: req.body.SDT,
            Password: req.body.Password,
            IdQuan: quan._id,
            MoTa: req.body.MoTa,
            DiaChi: req.body.DiaChi
        });
        yield cuaHang.save();
        res.json({
            code: 200,
            message: "Tạo tài khoản thành công"
        });
    }
});
exports.register = register;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cuaHang = yield cuaHang_model_1.default.findOne({ _id: id });
    if (!cuaHang) {
        res.status(404).json({ message: "Cửa hàng không tồn tại" });
        return;
    }
    const quan = yield quan_model_1.default.findOne({ _id: cuaHang.IdQuan });
    if (quan) {
        res.json(Object.assign(Object.assign({}, cuaHang.toObject()), { TenQuan: quan.TenQuan }));
        return;
    }
    res.json(cuaHang);
});
exports.detail = detail;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.IdCuaHang;
    const updateData = req.body;
    if (updateData.TenQuan) {
        const quan = yield quan_model_1.default.findOne({ TenQuan: updateData.TenQuan });
        if (quan) {
            updateData.IdQuan = quan._id;
        }
        else {
            res.status(400).json({ message: "Quận không tồn tại" });
            return;
        }
    }
    const updatedCuaHang = yield cuaHang_model_1.default.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });
    if (!updatedCuaHang) {
        res.json({
            code: 400,
            message: "Không tìm thấy"
        });
        return;
    }
    res.json({
        code: 200,
        message: "Cập nhật thành công",
    });
});
exports.update = update;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { Password, NewPassword } = req.body;
    try {
        if (!Password || !NewPassword) {
            res.json({ code: 400, message: 'Vui lòng cung cấp mật khẩu cũ và mật khẩu mới.' });
            return;
        }
        const cuaHang = yield cuaHang_model_1.default.findById(id);
        if (!cuaHang) {
            res.json({
                code: 404,
                message: 'Không tìm thấy cửa hàng với id này.'
            });
            return;
        }
        if (cuaHang.Password !== Password) {
            res.json({ code: 401, message: 'Mật khẩu cũ không đúng.' });
            return;
        }
        if (NewPassword.length < 6) {
            res.json({ code: 400, message: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
            return;
        }
        cuaHang.Password = NewPassword;
        yield cuaHang.save();
        res.json({ code: 200, message: 'Mật khẩu đã được cập nhật thành công.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server, vui lòng thử lại.' });
        return;
    }
});
exports.updatePassword = updatePassword;
const getSavedShops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        res.json({
            code: 400,
            message: "Không thấy người dùng"
        });
        return;
    }
    const savedShopIds = user.CuaHangDaLuu;
    const savedShops = yield cuaHang_model_1.default.find({ _id: { $in: savedShopIds } });
    res.json(savedShops);
});
exports.getSavedShops = getSavedShops;
const addSavedShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = req.params.userId;
    const { cuaHangId } = req.body;
    if (!cuaHangId) {
        res.json({
            code: 400,
            message: "ID cửa hàng không hợp lệ"
        });
        return;
    }
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.json({
                code: 404,
                message: "Không tìm thấy người dùng"
            });
            return;
        }
        if ((_a = user === null || user === void 0 ? void 0 : user.CuaHangDaLuu) === null || _a === void 0 ? void 0 : _a.includes(cuaHangId)) {
            res.json({
                code: 400,
                message: "Cửa hàng này đã được lưu trước đó"
            });
            return;
        }
        (_b = user === null || user === void 0 ? void 0 : user.CuaHangDaLuu) === null || _b === void 0 ? void 0 : _b.push(cuaHangId);
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(200).json({
            code: 200,
            message: "Cửa hàng đã được thêm vào danh sách lưu"
        });
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Lỗi server: "
        });
    }
});
exports.addSavedShop = addSavedShop;
const deleteSavedShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.params.userId;
    const { cuaHangId } = req.body;
    if (!cuaHangId) {
        res.json({
            code: 400,
            message: "ID cửa hàng không hợp lệ"
        });
        return;
    }
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.json({
                code: 404,
                message: "Không tìm thấy người dùng"
            });
            return;
        }
        if (!((_a = user === null || user === void 0 ? void 0 : user.CuaHangDaLuu) === null || _a === void 0 ? void 0 : _a.includes(cuaHangId))) {
            res.json({
                code: 400,
                message: "Cửa hàng này chưa được lưu"
            });
            return;
        }
        user.CuaHangDaLuu = user.CuaHangDaLuu.filter(id => id !== cuaHangId);
        yield user.save();
        res.status(200).json({
            code: 200,
            message: "Cửa hàng đã được xóa khỏi danh sách lưu"
        });
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: "Lỗi server: "
        });
    }
});
exports.deleteSavedShop = deleteSavedShop;
