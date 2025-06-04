"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.processOrder = exports.getSingleOrder = exports.allOrders = exports.myOrders = exports.newOrder = void 0;
const error_1 = require("../middlewares/error");
const order_model_1 = require("../models/order.model");
const features_1 = require("../utils/features");
const errorHandler_1 = require("../utils/errorHandler");
const app_1 = require("../app");
exports.newOrder = (0, error_1.TryCatch)(async (req, res, next) => {
    const { shippingInfo, orderItems, user, subtotal, tax, shippingCharges, discount, total } = req.body;
    if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !shippingCharges || !discount || !total)
        return next(new errorHandler_1.ErrorHandler('Please enter all field', 400));
    const order = await order_model_1.Orders.create({ shippingInfo, orderItems, user, subtotal, tax, shippingCharges, discount, total });
    await (0, features_1.reduceStock)(orderItems);
    await (0, features_1.invalidateCache)({ product: true });
    return res.status(201).json({ message: "Order Placed Successfully", order, success: true });
});
exports.myOrders = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.query;
    let orders = [];
    if (app_1.myCache.has(''))
        orders = JSON.parse(app_1.myCache.get(''));
    else {
        orders = await order_model_1.Orders.find({ user: id });
        app_1.myCache.set("", JSON.stringify(orders));
    }
    return res.status(201).json({
        success: true,
        message: "Order fetched Successfully"
    });
});
exports.allOrders = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.query;
    let orders = [];
    orders = await order_model_1.Orders.find({}).populate('user', "name");
    return res.status(201).json({
        success: true,
        message: "Order fetched Successfully"
    });
});
exports.getSingleOrder = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    let orders = [];
    orders = await order_model_1.Orders.find({ _id: id }).populate('user', "name");
    if (!orders)
        return next(new errorHandler_1.ErrorHandler("Order not found", 404));
    return res.status(201).json({
        success: true,
        message: "Order fetched Successfully"
    });
});
exports.processOrder = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const order = await order_model_1.Orders.findById(id);
    if (!order)
        return res.status(404).json({ message: "Order Not Found", order, success: false });
    switch (order.status) {
        case "Processing":
            order.status = "Shipped";
            break;
        case "Shipped":
            order.status = "Delivered";
            break;
        default:
            order.status = "Delivered";
            break;
    }
    await order.save();
    return res.status(201).json({ message: "Order Placed Successfully", order, success: true });
});
exports.deleteOrder = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const order = await order_model_1.Orders.findById(id).populate('user', "name");
    if (!order)
        return next(new errorHandler_1.ErrorHandler("Order not found", 404));
    await order.deleteOne();
    return res.status(201).json({
        success: true,
        message: "Order deleted  Successfully"
    });
});
