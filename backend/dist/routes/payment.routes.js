"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const payment_controller_1 = require("../controllers/payment.controller");
const app = express_1.default.Router();
app.post("/create", (req, res, next) => { (0, auth_1.adminOnly)(req, res, next); }, (req, res, next) => {
    (0, payment_controller_1.createPayment)(req, res, next);
});
app.post("/coupon/new", (req, res, next) => { (0, auth_1.adminOnly)(req, res, next); }, (req, res, next) => {
    (0, payment_controller_1.newCoupon)(req, res, next);
});
app.get("/discount", (req, res, next) => {
    (0, payment_controller_1.applyDiscount)(req, res, next);
});
app.get("/coupon/all", (req, res, next) => { (0, auth_1.adminOnly)(req, res, next); }, (req, res, next) => {
    (0, payment_controller_1.allCoupons)(req, res, next);
});
app.delete('/coupon/:id', (req, res, next) => { (0, auth_1.adminOnly)(req, res, next); }, (req, res, next) => { (0, payment_controller_1.deleteCoupon)(req, res, next); });
exports.default = app;
