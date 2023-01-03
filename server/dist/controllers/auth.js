"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jwt = require('jsonwebtoken');
const User_1 = __importDefault(require("../models/User"));
const bcrypt = require('bcrypt');
class Auth {
    static userSignup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = yield req.body;
            // Controls if there's any missing fields
            if (Object.keys(credentials).length < 4) {
                res.sendStatus(400);
            }
            try {
                yield User_1.default.create(credentials).then(() => res.sendStatus(201));
            }
            catch (err) {
                // MongoDB Error Code 11000 refers to duplicate key error, read about it using the link below
                // https://congtuanle.medium.com/mongoerror-e11000-duplicate-key-error-collection-695e7e9ccdc4
                if (err.code == 11000) {
                    res.status(400).send('Bad request');
                }
                else {
                    console.log(err);
                }
            }
        });
    }
    static userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = yield req.body;
            // Controls if there's any missing fields
            if (Object.keys(credentials).length < 2) {
                res.sendStatus(400);
            }
            function generateAccessToken(id, handle) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const token = jwt.sign({ id: id, handle: handle }, process.env.JWT_SECRET, {
                            expiresIn: '7d',
                        });
                        return token;
                    }
                    catch (err) {
                        console.log(err);
                        res.sendStatus(500);
                    }
                });
            }
            function authChecker(query) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = yield User_1.default.findOne(query);
                    if (user != null) {
                        try {
                            const control = yield bcrypt.compare(credentials.password, user.password);
                            control === true
                                ? res.json(yield generateAccessToken(user.id, user.handle))
                                : res.json({ message: 'Invalid credentials', status: 404 });
                        }
                        catch (err) {
                            throw err;
                        }
                    }
                    else {
                        res.json({ message: 'Invalid credentials', status: 404 });
                    }
                });
            }
            // Checks if the given input is an email or a handle but
            // any charachters other than A-Z and 0-9 is banned
            // in handles so a handle cannot contain an "@".
            if (credentials.handleOrEmail.includes('@') == true) {
                authChecker({ email: credentials.handleOrEmail });
            }
            else {
                authChecker({ handle: credentials.handleOrEmail });
            }
        });
    }
}
exports.Auth = Auth;
