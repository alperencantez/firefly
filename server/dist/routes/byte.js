"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const byte_1 = require("../controllers/byte");
const authToken_1 = require("../middlewares/authToken");
const postByte_1 = require("../middlewares/postByte");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/new', [authToken_1.authenticateToken, postByte_1.postByte], byte_1.ByteController.postByte);
router.post('/new-comment', [authToken_1.authenticateToken, postByte_1.postByte], byte_1.ByteController.commentByte);
router.get('/:handle', [authToken_1.authenticateToken], byte_1.ByteController.readByteFromProfile);
exports.default = router;
