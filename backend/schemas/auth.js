import * as z from "zod";

const LoginSchema = z.object({
    email: z
        .string({error: "El email es requerido"})
        .email({error: "El email no es válido"}),
    password: z
        .string({error: "La contraseña es requerida"})
        
})

const RegisterSchema = z.object({
    name: z
        .string({error: "El nombre es requerido"})
        .min(3, {error: "El nombre debe tener al menos 3 caracteres"})
        .max(50, {error: "El nombre no puede tener más de 50 caracteres"}),

    email: z
        .string({error: "El email es requerido"})
        .email({error: "El email no es válido"}),

    password: z
        .string({error: "La contraseña es requerida"})
        .min(6, {error: "La contraseña debe tener al menos 6 caracteres"})
        .max(100, {error: "La contraseña no puede tener más de 100 caracteres"})
        .regex(/[A-Z]/, {error: "La contraseña debe contener al menos una letra mayúscula"})
        .regex(/[a-z]/, {error: "La contraseña debe contener al menos una letra minúscula"})
        .regex(/[0-9]/, {error: "La contraseña debe contener al menos un número"})
        
})

export function validateRegister(data) {
    const result = RegisterSchema.safeParse(data)
    return result
}

export function validateLogin(data) {
    const result = LoginSchema.safeParse(data)
    return result
}


// Función para formatear errores de Zod
export const formatZodErrors = (zodError) => {
  if (!zodError?.issues) return []

  return zodError.issues.map(err => ({
    field: err.path.join('.'),
    message: err.message
  }))
}
   

