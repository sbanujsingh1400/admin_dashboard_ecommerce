"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const multer_1 = require("../middlewares/multer");
const products_controller_1 = require("../controllers/products.controller");
const app = express_1.default.Router();
app.post("/new", multer_1.singleUpload, (req, res, next) => {
    (0, products_controller_1.newProduct)(req, res, next);
});
app.get('/latest', (req, res, next) => {
    (0, products_controller_1.getLatestProducts)(req, res, next);
});
app.get('/all', (req, res, next) => {
    (0, products_controller_1.getLatestProducts)(req, res, next);
});
app.get('/category', (req, res, next) => {
    (0, products_controller_1.getAllCategories)(req, res, next);
});
app.get('/admin-products', (req, res, next) => {
    (0, products_controller_1.getAdminProducts)(req, res, next);
});
app.get('/admin-products', (req, res, next) => {
    (0, products_controller_1.getAdminProducts)(req, res, next);
});
app.route("/:id").get((req, res, next) => { (0, products_controller_1.getSingleProduct)(req, res, next); }).put((req, res, next) => { (0, auth_1.adminOnly)(req, res, next); }, (req, res, next) => { (0, products_controller_1.updateProduct)(req, res, next); }).delete((req, res, next) => { (0, products_controller_1.deleteProduct)(req, res, next); });
exports.default = app;
