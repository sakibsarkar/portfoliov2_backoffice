"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const create = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: "First name is required" }),
    lastName: zod_1.z.string().min(1, { message: "Last name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    role: zod_1.z.enum(["user", "admin"], {
        message: "Role must be either 'user' or 'admin'",
    }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    image: zod_1.z.string().url().optional(),
});
const update = zod_1.z
    .object({
    firstName: zod_1.z
        .string()
        .min(1, { message: "First name is required" })
        .optional(),
    lastName: zod_1.z
        .string()
        .min(1, { message: "Last name is required" })
        .optional(),
    email: zod_1.z.string().email({ message: "Invalid email address" }).optional(),
    image: zod_1.z.string().url().optional(),
    role: zod_1.z.enum(["user", "player"], {
        message: "Role must be either 'user' or 'player'",
    }),
})
    .partial();
const userValidationSchema = {
    create,
    update,
};
exports.default = userValidationSchema;
