"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const stats_controller_1 = require("../controllers/stats.controller");
const app = express_1.default.Router();
app.get("/stats", (req, res, next) => {
    (0, stats_controller_1.getDashboardStats)(req, res, next);
});
app.get("/pie", (req, res, next) => { (0, auth_1.adminOnly)(req, res, next); }, (req, res, next) => {
    (0, stats_controller_1.getPieCharts)(req, res, next);
});
app.get("/bar", (req, res, next) => { (0, auth_1.adminOnly)(req, res, next); }, (req, res, next) => {
    (0, stats_controller_1.getBarCharts)(req, res, next);
});
app.get("/line", (req, res, next) => { (0, auth_1.adminOnly)(req, res, next); }, (req, res, next) => {
    (0, stats_controller_1.getLineCharts)(req, res, next);
});
exports.default = app;
