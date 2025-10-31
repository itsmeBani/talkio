import {z} from "zod";


export const registerFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(7, "Password must be at least 7 characters"),
    confirmPassword: z.string().min(7, "Confirm password must be at least 7 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
