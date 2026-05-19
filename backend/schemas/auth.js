import * as z from "zod";

const LoginSchema = z.object({
    email: z
        .string({error: "Email is required"})
        .email({error: "Email is not valid"}),
    password: z
        .string({error: "Password is required"})
        
})

const RegisterSchema = z.object({
    name: z
        .string({error: "Name is required"})
        .min(3, {error: "Name must have at least 3 characters"})
        .max(50, {error: "Name cannot have more than 50 characters"}),

    email: z
        .string({error: "Email is required"})
        .email({error: "Email is not valid"}),

    password: z
        .string({error: "Password is required"})
        .min(6, {error: "Password must have at least 6 characters"})
        .max(100, {error: "Password cannot have more than 100 characters"})
        .regex(/[A-Z]/, {error: "Password must contain at least one uppercase letter"})
        .regex(/[a-z]/, {error: "Password must contain at least one lowercase letter"})
        .regex(/[0-9]/, {error: "Password must contain at least one number"})
        
})


const UpdateUserSchema = z.object({
    name: z
        .string({error: "Name is required"})
        .min(3, {error: "Name must have at least 3 characters"})
        .max(50, {error: "Name cannot have more than 50 characters"}),

    phone: z
        .string({error: "Phone is required"})
        .min(10, {error: "Phone must have at least 10 characters"})
        .max(11, {error: "Phone cannot have more than 11 characters"}),

    title: z
        .string({error: "Title is required"})
        .min(3, {error: "Title must have at least 3 characters"})
        .max(50, {error: "Title cannot have more than 50 characters"}),
        
})

export function validateRegister(data) {
    const result = RegisterSchema.safeParse(data)
    return result
}

export function validateLogin(data) {
    const result = LoginSchema.safeParse(data)
    return result
}

export function validateUpdateUser(data){
    const result = UpdateUserSchema.safeParse(data)
    return result
}


// Function to format Zod errors
export const formatZodErrors = (zodError) => {
  if (!zodError?.issues) return []

  return zodError.issues.map(err => ({
    field: err.path.join('.'),
    message: err.message
  }))
}
   

