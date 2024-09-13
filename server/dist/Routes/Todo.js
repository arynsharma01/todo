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
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const tokenCheck_1 = __importDefault(require("./middlewares/tokenCheck"));
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default.Router();
exports.todoRouter = app;
app.use(body_parser_1.default.json());
app.post('/add', tokenCheck_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.username;
    const prisma = new client_1.PrismaClient();
    try {
        const result = yield prisma.user.findFirst({
            where: {
                username: username
            }
        });
        if (result == null) {
            res.status(411).json({
                "message": "user not found sign up "
            });
            return;
        }
        const userId = result.id;
        const title = req.body.title;
        const description = req.body.description;
        const result2 = yield prisma.todo.create({
            data: {
                title: title,
                description: description,
                userId: userId
            }
        });
        res.status(200).json({
            "message ": "done successfully "
        });
    }
    catch (e) {
        res.status(500).json({
            "message ": "server side error try again later "
        });
        return;
    }
}));
