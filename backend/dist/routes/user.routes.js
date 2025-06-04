"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middlewares/auth");
const app = express_1.default.Router();
app.post("/new", (req, res, next) => {
    (0, user_controller_1.newUser)(req, res, next);
});
app.get('/all', (req, res, next) => { (0, auth_1.adminOnly)(req, res, next); }, (req, res, next) => {
    (0, user_controller_1.getAllUser)(req, res, next);
});
app.get('/:id', (req, res, next) => {
    (0, user_controller_1.getUser)(req, res, next);
});
app.delete('/:id', (req, res, next) => {
    (0, user_controller_1.deleteUser)(req, res, next);
});
exports.default = app;
