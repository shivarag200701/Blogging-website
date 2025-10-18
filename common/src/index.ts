import { z } from "zod";

export const signupSchema = z.object({
  email: z.email(),
  password: z.string(),
  name: z.string(),
});

export type SignupType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type SigninType = z.infer<typeof signinSchema>;

export const createPostSchema = z.object({
  content: z.string().min(10, { error: "Must be atleast 10 characters" }),
  title: z.string().min(3, { error: "Must be atleast 3 characters" }),
});

export type createPostType = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
  content: z.string().min(10, { error: "Must be atleast 10 characters" }),
  title: z.string().min(3, { error: "Must be atleast 3 characters" }),
  id: z.string(),
});

export type updatePostType = z.infer<typeof createPostSchema>;
