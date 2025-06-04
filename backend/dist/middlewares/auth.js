"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = void 0;
const user_model_1 = require("../models/user.model");
const errorHandler_1 = require("../utils/errorHandler");
const error_1 = require("./error");
//middleware to makesure only admin is allowed
exports.adminOnly = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.query;
    if (!id)
        return next(new errorHandler_1.ErrorHandler("Please login first", 401));
    const user = await user_model_1.User.findById(id);
    if (!user)
        return next(new errorHandler_1.ErrorHandler("Please login first", 401));
    if (user.role !== 'admin')
        return next(new errorHandler_1.ErrorHandler("Only Admin is allowed", 401));
    console.log(user.role);
    next();
});
