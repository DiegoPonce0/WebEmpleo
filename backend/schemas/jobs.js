
import * as z from "zod";

const JobSchema = z.object({
    
    title: z.string({error: "Job title is required"})
        .min(3, {error: "Job title need to have at least 3 characters"})
        .max(100, {error: "Job title cant have more than 100 characters"}),
    company: z.string({error: "Company is required"}),
    location: z.string({error: "Location is required"}),
    description: z.string({error: "Job description is required"})
        .optional(),

    data: z.object({
        technology: z.array(z.string()).optional(),
        modality: z.enum(['remote', 'on-site', 'hybrid']).optional(),
        level: z.enum(['junior', 'mid', 'senior']).optional()
    }).optional(),

    content: z.object({
        description: z.string().optional(),
        responsibilities: z.string().optional(),
        requirements: z.string().optional(),
        about: z.string().optional()
    }).optional()
})

const JobIDSchema = z.object({
    id: z.string({error: "Id is requiered"})
        .uuid({error: "ID need to be a UUID valid"})
})

const JobQuerySchema = z.object({
    location: z.string().optional(),
    text: z.string().optional(),
    level: z.string().optional(),
    technology: z.string().optional()
})


export function validateJobQuery(data) {
    const result = JobQuerySchema.safeParse(data)
    return result
}

export function validateJobID(data) {
    const result = JobIDSchema.safeParse(data)
    return result
}


export function validateJob(data) {
    const result = JobSchema.safeParse(data)
    return result
}

export function validateJobPatch(data) {
    const partialSchema = JobSchema.partial()
    const result = partialSchema.safeParse(data)
    return result
}