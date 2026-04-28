import { Router } from "express";
import { authMiddleware } from '../middleware/auth.js';
import { roleMiddleware } from '../middleware/role.js'
import { JobController } from "../controllers/jobs.js";
import { validateJobPatch, validateJob, validateJobID, validateJobQuery } from '../schemas/jobs.js';

export const createJobsRouter = ({ jobModel }) => {

    const validateJobMiddleware = (req, res, next) => {
        const result = validateJob(req.body)
        if (result.success) {
            req.body = result.data
            return next()
        }
        return res.status(400).json({ error: 'Invalid job data', details: result.error.errors })
    }

    const validateJobIDMiddleware = (req, res, next) => {
        const result = validateJobID(req.params)
        if (result.success) {
            req.params = result.data
            return next()
        }
        return res.status(404).json({ error: 'Invalid job ID', details: result.error.errors })
    }

    const validateJobQueryMiddleware = (req, res, next) => {
        const result = validateJobQuery(req.query)
        if (result.success) {
            req.query = result.data
            return next()
        }
        return res.status(400).json({ error: 'Invalid query parameters', details: result.error.errors })
    }

    const validateJobPatchMiddleware = (req, res, next) => {
        const result = validateJobPatch(req.body)
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        req.body = result.data
        return next()
    }


    const jobsRouter = Router();

    const jobController = new JobController({ jobModel })

    jobsRouter.get('/', jobController.getAll);
    jobsRouter.post('/', authMiddleware, roleMiddleware(['employer', 'admin']), validateJobMiddleware,  jobController.create);

    jobsRouter.get('/:id', jobController.getById);
    jobsRouter.put('/:id', authMiddleware, roleMiddleware(['employer', 'admin']), validateJobIDMiddleware, validateJobMiddleware, jobController.update);
    jobsRouter.patch('/:id', authMiddleware, roleMiddleware(['employer', 'admin']), validateJobIDMiddleware, validateJobPatchMiddleware, jobController.patch);
    jobsRouter.delete('/:id', authMiddleware, roleMiddleware(['employer', 'admin']), validateJobIDMiddleware, jobController.delete);

    return jobsRouter
}