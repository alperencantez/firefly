"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timeline_1 = __importDefault(require("./timeline"));
const byte_1 = __importDefault(require("./byte"));
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => res.end());
router.use('/auth', auth_1.default);
router.use('/timeline', timeline_1.default);
router.use('/byte', byte_1.default);
exports.default = router;
