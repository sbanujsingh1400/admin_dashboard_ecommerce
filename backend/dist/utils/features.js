"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChartData = exports.calculatePercentage = exports.reduceStock = exports.invalidateCache = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
const product_model_1 = require("../models/product.model");
const connectDB = () => {
    const url = process.env.MONGO_URL;
    if (typeof url !== 'undefined')
        mongoose_1.default.connect(url).then(c => {
            console.log("DB CONNECTED");
        }).catch((e) => console.log(e));
};
exports.connectDB = connectDB;
const invalidateCache = async ({ product, order, admin }) => {
    if (product) {
        const productKeys = ['latest-products', 'categoriies', 'all-products'];
        app_1.myCache.del(productKeys);
    }
};
exports.invalidateCache = invalidateCache;
const reduceStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await product_model_1.Product.findById(order.productId);
        if (!product)
            throw new Error("Product not found");
        product.stock -= order.quantity;
        await product.save();
    }
};
exports.reduceStock = reduceStock;
const calculatePercentage = (thisMonth, lastMonth) => {
    return ((thisMonth - lastMonth) / lastMonth) * 100;
};
exports.calculatePercentage = calculatePercentage;
const getChartData = ({ length, docArr, today, property, }) => {
    const data = new Array(length).fill(0);
    docArr.forEach((i) => {
        const creationDate = i.createdAt;
        const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
        if (monthDiff < length) {
            if (property) {
                data[length - monthDiff - 1] += i[property];
            }
            else {
                data[length - monthDiff - 1] += 1;
            }
        }
    });
    return data;
};
exports.getChartData = getChartData;
