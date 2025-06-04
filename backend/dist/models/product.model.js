"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter Name"],
    },
    photos: [
        {
            public_id: {
                type: String,
                required: [true, "Please enter Public ID"],
            },
            url: {
                type: String,
                required: [true, "Please enter URL"],
            },
        },
    ],
    price: {
        type: Number,
        required: [true, "Please enter Price"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter Stock"],
    },
    category: {
        type: String,
        required: [true, "Please enter Category"],
        trim: true,
    },
    // description: {
    //   type: String,
    //   required: [true, "Please enter Description"],
    // },
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.Product = mongoose_1.default.model("Product", schema);
