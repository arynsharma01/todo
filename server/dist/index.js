"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("./Routes/User");
const Todo_1 = require("./Routes/Todo");
const app = (0, express_1.default)();
app.use('/user', User_1.user);
app.use('/todo', Todo_1.todoRouter);
app.listen(3000, () => {
    console.log("listening at 3000");
});
