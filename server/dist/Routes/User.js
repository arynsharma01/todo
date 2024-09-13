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
exports.user = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const input_1 = require("./middlewares/input");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pass = "supersecpass";
const prisma = new client_1.PrismaClient();
const app = express_1.default.Router();
exports.user = app;
``;
app.use(body_parser_1.default.json());
app.post('/signup', input_1.signupValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    let result = yield prisma.user.findFirst({
        where: {
            OR: [
                { username: username },
                { email: email }
            ]
        }
    });
    if (result != null) {
        res.status(400).json({
            "message": "username/email already exists "
        });
        return;
    }
    const createUser = yield prisma.user.create({
        data: {
            email: email,
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
        }
    });
    const token = jsonwebtoken_1.default.sign(username, pass);
    res.status(200).json({
        "message": "created successfully",
        "token": token
    });
}));
app.post('/signin', input_1.signinValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const result = yield prisma.user.findFirst({
        where: {
            AND: [
                { username: username },
                { password: password }
            ]
        }
    });
    if (result == null) {
        res.status(411).json({
            "message ": "invalid username or wrong password "
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign(username, pass);
    res.status(200).json({
        "message ": "successfull",
        "token": token
    });
}));
