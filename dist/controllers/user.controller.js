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
exports.login = exports.updatePassword = exports.update = exports.detail = exports.index = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existSDT = yield user_model_1.default.findOne({
        SDT: req.body.SDT
    });
    if (existSDT) {
        res.json({
            code: 400,
            message: "SDT đã tồn tại"
        });
    }
    else {
        const user = new user_model_1.default({
            TenKhachHang: req.body.TenKhachHang,
            Email: req.body.Email,
            SDT: req.body.SDT,
            Password: req.body.Password,
            GioiTinh: req.body.GioiTinh
        });
        yield user.save();
        res.json({
            code: 200,
            message: "Tạo tài khoản thành công"
        });
    }
});
exports.register = register;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.find();
    res.json(user);
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_model_1.default.findOne({
        _id: id
    });
    res.json(user);
});
exports.detail = detail;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    const updatedUser = yield user_model_1.default.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });
    if (!updatedUser) {
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
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            res.json({
                code: 404,
                message: 'Không tìm thấy người dùng với id này.'
            });
            return;
        }
        if (user.Password !== Password) {
            res.json({ code: 401, message: 'Mật khẩu cũ không đúng.' });
            return;
        }
        if (NewPassword.length < 6) {
            res.json({ code: 400, message: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
            return;
        }
        user.Password = NewPassword;
        yield user.save();
        res.json({ code: 200, message: 'Mật khẩu đã được cập nhật thành công.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server, vui lòng thử lại.' });
        return;
    }
});
exports.updatePassword = updatePassword;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sdt = req.body.SDT;
    const password = req.body.Password;
    const user = yield user_model_1.default.findOne({
        SDT: sdt
    });
    if (!user) {
        res.json({
            code: 400,
            message: "Không tồn tại SDT"
        });
        return;
    }
    if (user.Password !== password) {
        res.json({
            code: 400,
            message: "Sai mật khẩu"
        });
        return;
    }
    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        userId: user._id
    });
});
exports.login = login;
