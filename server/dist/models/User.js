"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const schemaUser = new Schema({
    name: String,
    handle: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
}, { timestamps: true });
schemaUser.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            throw err;
        }
        else {
            this.password = hash;
            next();
        }
    });
});
const User = mongoose_1.default.model('user', schemaUser);
exports.default = User;
