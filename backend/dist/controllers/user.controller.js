"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUser = exports.getAllUser = exports.newUser = void 0;
const user_model_1 = require("../models/user.model");
const error_1 = require("../middlewares/error");
const errorHandler_1 = require("../utils/errorHandler");
exports.newUser = (0, error_1.TryCatch)(async (req, res, next) => {
    const { name, email, photo, gender, _id, dob } = req.body;
    let user = await user_model_1.User.findById(_id);
    if (user)
        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`,
        });
    if (!_id || !name || !email || !photo || !gender || !dob)
        return next(new errorHandler_1.ErrorHandler("Please add all fields", 400));
    user = await user_model_1.User.create({
        name,
        email,
        photo,
        gender,
        _id,
        dob: new Date(dob),
    });
    return res.status(201).json({
        success: true,
        message: `Welcome, ${user.name}`,
    });
});
exports.getAllUser = (0, error_1.TryCatch)(async (req, res, next) => {
    const users = await user_model_1.User.find({});
    if (!users) {
        new errorHandler_1.ErrorHandler("No users founf", 404);
    }
    res.status(200).json({ success: true, mesage: 'Users Found', users: users });
});
exports.getUser = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const user = await user_model_1.User.findById(id);
    console.log(user);
    if (!user) {
        console.log("Error");
        throw new errorHandler_1.ErrorHandler("No users found", 404);
    }
    res.status(200).json({ success: true, mesage: 'Users Found', user: user });
});
exports.deleteUser = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const user = await user_model_1.User.findById(id);
    console.log(user);
    if (!user) {
        console.log("Error");
        throw new errorHandler_1.ErrorHandler("No users found", 404);
    }
    await user.deleteOne();
    res.status(200).json({ success: true, mesage: 'User deleted', user: user });
});
