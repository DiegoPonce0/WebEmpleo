import * as z from "zod";

const ExperienceSchema = z.object({

    title: z.string({error: "Experience title is required"})
        .min(3, {error: "Experience title need to have at least 3 characters"})
        .max(100, {error: "Experience title cant have more than 100 characters"}),
    company: z.string({error: "Company is required"}) 
        .min(3, {error: "Company name need to have at least 3 characters"})
        .max(100, {error: "Company name cant have more than 100 characters"}),
    startDate: z.string({error: "Start date is required"}),
    endDate: z.string({error: "End date is not valid"}) .optional(),
    responsibilities: z.string({error: "Experience description is required"}) 
        .max(500, {error: "Experience description cant have more than 500 characters"})
        .optional(),

    })


const DeleteExperienceSchema = z.object({
    id: z.string({error: "Experience ID is required"})
})

    export function validateExperience(data) {
        const result = ExperienceSchema.safeParse(data)
        return result
    }

    export function validateExperiencePatch(data) {
        const partialSchema = ExperienceSchema.partial()
        const result = partialSchema.safeParse(data)
        return result
    }

    export function validateDeleteExperience(data) {
        const result = DeleteExperienceSchema.safeParse(data)
        return result
    }