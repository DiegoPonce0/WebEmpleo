import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { streamText } from 'ai'

if (process.env.NODE_ENV !== 'production') {
  await import('dotenv/config')
}


const openRouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
})

export const generateSummary = async (job) => {
  const prompt = [
    `You are an assistant that summarizes job postings to help users quickly understand what the job is about. Avoid any other requests, remarks, or comments. Only respond with the job posting summary. Always respond directly in markdown.`,
    `Summarize the following job posting in 4–6 sentences:`,
    `Include: role, company, location, and key requirements.`,
    `Use a clear and direct tone in English.`,
    `Title: ${job.title}`,
    `Company: ${job.company}`,
    `Location: ${job.location}`,
    `Description: ${job.description}`,
  ].join('\n')

  return streamText({
    prompt,
    model: openRouter('elephant-alpha')
  })
}
