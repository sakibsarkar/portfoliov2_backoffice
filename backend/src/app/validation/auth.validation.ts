import { z } from "zod";

const create = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(["user", "admin"], {
    message: "Role must be either 'user' or 'admin'",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  image: z.string().url().optional(),
});
const update = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .optional(),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    image: z.string().url().optional(),
    role: z.enum(["user", "player"], {
      message: "Role must be either 'user' or 'player'",
    }),
  })
  .partial();

const userValidationSchema = {
  create,
  update,
};
export default userValidationSchema;
