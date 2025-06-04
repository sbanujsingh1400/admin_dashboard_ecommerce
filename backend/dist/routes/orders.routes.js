"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const orders_controller_1 = require("../controllers/orders.controller");
const app = express_1.default.Router();
app.post("/new", (req, res, next) => {
    (0, orders_controller_1.newOrder)(req, res, next);
});
app.get("/my", (req, res, next) => {
    (0, orders_controller_1.myOrders)(req, res, next);
});
app.get("/all", (req, res, next) => { (0, auth_1.adminOnly)(req, res, next); }, (req, res, next) => {
    (0, orders_controller_1.allOrders)(req, res, next);
});
app.route('/:id').get((req, res, next) => { (0, orders_controller_1.getSingleOrder)(req, res, next); }).put((req, res, next) => { (0, auth_1.adminOnly)(req, res, next); }, (req, res, next) => { (0, orders_controller_1.processOrder)(req, res, next); }).delete((req, res, next) => { (0, auth_1.adminOnly)(req, res, next); }, (req, res, next) => { (0, orders_controller_1.deleteOrder)(req, res, next); });
exports.default = app;
