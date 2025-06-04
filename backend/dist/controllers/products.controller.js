"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAdminProducts = exports.getAllCategories = exports.getLatestProducts = exports.newProduct = void 0;
const error_1 = require("../middlewares/error");
const product_model_1 = require("../models/product.model");
const errorHandler_1 = require("../utils/errorHandler");
const app_1 = require("../app");
const features_1 = require("../utils/features");
exports.newProduct = (0, error_1.TryCatch)(async (req, res, next) => {
    console.log(req.body);
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo)
        return next(new errorHandler_1.ErrorHandler('Please Add Photo', 400));
    if (!name || !price || !stock || !category)
        return next(new errorHandler_1.ErrorHandler('Please enter all field', 400));
    const product = await product_model_1.Product.create({ name, price, stock, category, photo: photo?.path });
    await (0, features_1.invalidateCache)({ product: true });
    return res.status(201).json({
        success: true,
        message: "Product Created Successfully",
        product
    });
});
exports.getLatestProducts = (0, error_1.TryCatch)(async (req, res, next) => {
    let products = [];
    if (app_1.myCache.has('latest-product')) {
        products = JSON.parse(app_1.myCache.get('latest-products'));
    }
    else {
        products = await product_model_1.Product.find({}).sort({ createdAt: -1 }).limit(5);
        app_1.myCache.set("latest-product", JSON.stringify(products));
    }
    return res.status(200).json({
        success: true,
        message: "Product Created Successfully",
        products
    });
});
exports.getAllCategories = (0, error_1.TryCatch)(async (req, res, next) => {
    const products = await product_model_1.Product.distinct('category');
    return res.status(200).json({
        success: true,
        message: "Product Created Successfully",
        products
    });
});
exports.getAdminProducts = (0, error_1.TryCatch)(async (req, res, next) => {
    const products = await product_model_1.Product.find({});
    return res.status(200).json({
        success: true,
        message: "Product Created Successfully",
        products
    });
});
exports.getSingleProduct = (0, error_1.TryCatch)(async (req, res, next) => {
    const products = await product_model_1.Product.findById(req.params.id);
    return res.status(200).json({
        success: true,
        message: "Product Created Successfully",
        products
    });
});
exports.updateProduct = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await product_model_1.Product.findById(id);
    if (!product)
        return next(new errorHandler_1.ErrorHandler('Invalid Product ID', 404));
    //    if(photo){
    //     rm(product.photos[0])
    //    }
    if (name)
        product.name = name;
    if (price)
        product.price = price;
    if (stock)
        product.stock = stock;
    if (category)
        product.category = category;
    await product.save();
    return res.status(201).json({
        success: true,
        message: "Product UPDATED Successfully",
        product
    });
});
exports.deleteProduct = (0, error_1.TryCatch)(async (req, res, next) => {
    const product = await product_model_1.Product.findById(req.params.id);
    if (!product)
        return next(new errorHandler_1.ErrorHandler('Product not found', 404));
    await product_model_1.Product.deleteOne();
    return res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    });
});
exports.getAllProducts = (0, error_1.TryCatch)(async (req, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page);
    const limmit = process.env.PRODUCT_PER_PAGE;
    const baseQuery = {
    // price:{
    //     $lte:Number(price),
    // },
    // category,
    };
    if (search) {
        baseQuery.name = { $regex: search, $options: 'i' };
    }
    if (price) {
        baseQuery.price = { $lte: Number(price) };
    }
    if (category) {
        baseQuery.category = category;
    }
    const products = await product_model_1.Product.find({ baseQuery }).sort(sort ? { price: sort === 'asc' ? 1 : -1 } : undefined);
    return res.status(200).json({
        success: true,
        message: "Product Created Successfully",
        products
    });
});
