"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoupon = exports.allCoupons = exports.applyDiscount = exports.newCoupon = exports.createPayment = void 0;
const error_1 = require("../middlewares/error");
const coupon_model_1 = require("../models/coupon.model");
const app_1 = require("../app");
exports.createPayment = (0, error_1.TryCatch)(async (req, res, next) => {
    const { amount } = req.body;
    if (!amount)
        return res.status(403).json({ message: "bad request ", success: "false" });
    const paymentIntent = await app_1.stripe.paymentIntents.create({
        amount: 343,
        currency: "inr"
    });
    return res.status(201).json({ clientSecret: paymentIntent.client_secret, success: "true" });
});
exports.newCoupon = (0, error_1.TryCatch)(async (req, res, next) => {
    const { coupon, amount } = req.body;
    if (!coupon || !amount)
        return res.status(403).json({ message: "bad request ", success: "false" });
    await coupon_model_1.Coupon.create({
        code: coupon, amount
    });
    return res.status(201).json({ message: "Coupon Created ", success: "true" });
});
exports.applyDiscount = (0, error_1.TryCatch)(async (req, res, next) => {
    const { coupon } = req.query;
    const discount = await coupon_model_1.Coupon.findOne({ code: coupon });
    if (!discount)
        return res.status(403).json({ message: "Invalid Coupon ", success: "false" });
    return res.status(201).json({ message: "discount has been applied  ", success: "true", discount });
});
exports.allCoupons = (0, error_1.TryCatch)(async (req, res, next) => {
    const coupons = await coupon_model_1.Coupon.find({});
    if (!coupons)
        return res.status(404).json({ message: " Coupon not found ", success: "false" });
    return res.status(201).json({ message: "Coupon found  ", success: "true", coupons });
});
exports.deleteCoupon = (0, error_1.TryCatch)(async (req, res, next) => {
    const id = req.params.id;
    const coupons = await coupon_model_1.Coupon.find({ id }).deleteOne();
    if (!coupons)
        return res.status(404).json({ message: " Coupon not found ", success: "false" });
    return res.status(201).json({ message: "Coupon deleted successfully  ", success: "true", coupons });
});
