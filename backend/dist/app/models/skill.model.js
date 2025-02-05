"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SkillSchema = new mongoose_1.default.Schema({
    label: { type: String, required: true },
    image: { type: String, required: true },
    expertise: { type: Number, required: true },
}, {
    timestamps: true,
});
const Skill = mongoose_1.default.model("Skill", SkillSchema);
exports.default = Skill;
