"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const _1 = require(".");
cloudinary_1.v2.config({
    cloud_name: _1.config.cloudinary.cloud_name,
    api_key: _1.config.cloudinary.api_key,
    api_secret: _1.config.cloudinary.api_secret,
});
exports.default = cloudinary_1.v2;
