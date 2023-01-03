"use strict";
/* TODO:
    --> Create a Byte [X]
        >> Some Bytes will be comments but they are still Bytes [X]
        >> Create a Byte with a photo [X]
        >> Create a comment Byte with photo [X]

    --> Read a Byte []
        >> Bytes from a specific user [X]
        >> Bytes from a user's following list []

    --> Update a Byte []
        >> Add an "updated" notifier next to user's handle for
        people to know that it's been edited []

    --> Delete a Byte []
        >> Important: The Byte owner has a privilege to delete all comments
        with their Byte itself []
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteController = void 0;
const Byte_1 = require("../models/Byte");
const crypto = __importStar(require("crypto"));
class ByteController {
    // Methods for controllers
    static createPost(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const newByte = yield Byte_1.Byte.create(query);
            return newByte;
        });
    }
    static checkHasMediaAndCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { image } = req.files;
            // Doesn't allow the upload if submitted file is not an image
            if (!/^image/.test(image.mimetype))
                return res.sendStatus(400);
            const imgName = crypto.randomBytes(15).toString('hex');
            yield image.mv('./public/' + req.body.user.handle + imgName + '.jpg');
            const createdByte = yield ByteController.createPost({
                content: req.body.content,
                author: req.body.user.handle,
                media: './public/' + req.body.user.handle + imgName,
            });
            return createdByte;
        });
    }
    // Controller methods about Creating Bytes
    static postByte(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.hasMedia == 'true') {
                yield ByteController.checkHasMediaAndCreate(req, res);
                return res.sendStatus(201);
            }
            else {
                yield ByteController.createPost({
                    content: req.body.content,
                    author: req.body.user.handle,
                });
                return res.sendStatus(201);
            }
        });
    }
    static commentByte(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repliedByte = yield Byte_1.Byte.findById(req.body.byteId);
            if (req.query.hasMedia == 'true') {
                const createdCommentMedia = yield ByteController.checkHasMediaAndCreate(req, res);
                yield (repliedByte === null || repliedByte === void 0 ? void 0 : repliedByte.updateOne({ $push: { comments: createdCommentMedia } }));
                return res.sendStatus(201);
            }
            const createdComment = yield ByteController.createPost({
                content: req.body.content,
                author: req.body.user.handle,
            });
            yield (repliedByte === null || repliedByte === void 0 ? void 0 : repliedByte.update({ $push: { comments: createdComment } }));
        });
    }
    // Controller methods related to Reading Bytes
    static readByteFromProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userBytes = yield Byte_1.Byte.where({ author: req.params.handle });
            if (userBytes.length === 0)
                return res.sendStatus(404);
            return res.json(userBytes);
        });
    }
}
exports.ByteController = ByteController;
