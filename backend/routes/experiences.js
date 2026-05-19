import { Router } from "express";

import { ExperienceController } from "../controllers/experiences.js";
import { authMiddleware } from "../middleware/auth.js";

import { validateExperience, validateExperiencePatch, validateDeleteExperience } from "../schemas/experiences.js";

export const createExperienceRouter = ({ experienceModel }) => {

    const experienceRouter = Router();

    const experienceController = new ExperienceController({ experienceModel });

   const validateExperienceMiddleware = (req, res, next) => {
           const result = validateExperience(req.body)
           if (result.success) {
               req.body = result.data
               return next()
           }
           return res.status(400).json({ error: 'Invalid experience data', details: result.error.errors })
       }

   const validateExperiencePatchMiddleware = (req, res, next) => {
           const result = validateExperiencePatch(req.body)
           if (result.success) {
               req.body = result.data
               return next()
           }
           return res.status(400).json({ error: 'Invalid experience data', details: result.error.errors })
       }


    const validateDeleteExperienceMiddleware = (req, res, next) => {
           const result = validateDeleteExperience(req.body)
           if (result.success) {
               req.body = result.data
               return next()
           }
           return res.status(400).json({ error: 'Invalid experience data', details: result.error.errors })
       }


    experienceRouter.post('/', authMiddleware, validateExperienceMiddleware, experienceController.create);
    experienceRouter.patch('/:id', authMiddleware, validateExperiencePatchMiddleware, experienceController.update);
    experienceRouter.delete('/:id', authMiddleware, validateDeleteExperienceMiddleware, experienceController.delete);

    return experienceRouter

}