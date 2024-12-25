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
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMessage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ html, receiverMail, subject, }) {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAILPASS,
        },
        tls: {
            rejectUnauthorized: true,
        },
    });
    const mailOptions = {
        from: "legendxpro123455@gmail.com",
        to: receiverMail,
        subject: subject,
        html: html,
    };
    try {
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
});
exports.default = sendMessage;
