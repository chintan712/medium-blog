import z from "zod";

export const signupInput = z.object({
    user: z.string().email(),
    pasaword: z.string().min(6),
    name: z.string().min(5)
})
//type inference
export const signinInput = z.object({
    user: z.string().email(),
    pasaword: z.string().min(6),
})

export const postInput = z.object({
    title: z.string(),
    content: z.string()
})

export const postUpdateInput = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
})

export type SignupInput = z.infer<typeof signupInput>;

export type SigninInput = z.infer<typeof signinInput>;

export type PostInput = z.infer<typeof postInput>;

export type PostUpdateInput = z.infer<typeof postUpdateInput>;