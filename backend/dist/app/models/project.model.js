"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    start_date: {
        type: String,
        required: true,
    },
    end_date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tech_stack: {
        type: [String],
        required: true,
    },
    live_link: {
        type: String,
        required: true,
    },
    github_link: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Project = mongoose_1.default.model("Project", projectSchema);
exports.default = Project;
