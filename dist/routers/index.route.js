"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = require("./user.route");
const quan_route_1 = require("./quan.route");
const cuaHang_route_1 = require("./cuaHang.route");
const donSuaChua_route_1 = require("./donSuaChua.route");
const mainV1Routes = (app) => {
    const version = "/api/v1";
    app.use(version + "/users", user_route_1.userRoutes);
    app.use(version + "/quan", quan_route_1.quanRoutes);
    app.use(version + "/cuaHang", cuaHang_route_1.cuaHangRoutes);
    app.use(version + "/donSuaChua", donSuaChua_route_1.donSuaChuaRoutes);
};
exports.default = mainV1Routes;
