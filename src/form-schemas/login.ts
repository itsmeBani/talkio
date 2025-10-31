import {z} from "zod";

export const loginFormSchema = z.object({
    email: z.email(),
    password: z.string().min(7,"Password must be at least 7 characters")
})