import { generateSummary } from "../services/ai.js";

export class AIController {
    constructor({jobModel}){
        this.jobModel = jobModel
    }
    getSummary = async (req, res) => {
        const { id } = req.params
        
        try { 
            const job = await this.jobModel.getById(id)

            if (!job) {
                return res.status(404).json({ error: 'Job not found' })
            }

            const stream = await generateSummary(job)

            if (!stream) {
                return res.status(502).json({ error: 'No summary generated'})
            }

            return stream.pipeTextStreamToResponse(res)
        } catch(error){
            console.log(error)
            if (!res.headersSent) {
                    res.setHeader('Content-Type', 'application/json')
                    return res.status(500).json({ error: 'Error generating summary' })
                }

                return res.end()
        }
    }
}

