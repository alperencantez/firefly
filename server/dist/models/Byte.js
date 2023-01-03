"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Byte = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const schemaByte = new Schema({
    content: String,
    author: String,
    replyingTo: mongoose_1.default.Types.ObjectId,
    media: { type: String, default: null },
    comments: { type: Array, default: [] },
    likes: { type: Number, default: 0 },
    reblogs: { type: Number, default: 0 },
    createdAt: String,
}, { timestamps: true });
exports.Byte = mongoose_1.default.model('post', schemaByte);
