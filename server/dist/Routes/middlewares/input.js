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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidate = signupValidate;
exports.signinValidate = signinValidate;
const zod_1 = require("zod");
const signupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    username: zod_1.z.string().min(5),
    firstName: zod_1.z.string().max(30),
    lastName: zod_1.z.string().max(30).optional()
});
const loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(8),
});
function signupValidate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("ho");
        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                "message": "invalid input"
            });
            return;
        }
        next();
    });
}
function signinValidate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                "message": "invalid input"
            });
            return;
        }
        next();
    });
}
