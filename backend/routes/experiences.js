import { Router } from "express";

import { ExperienceController } from "../controllers/experiences.js";
import { authMiddleware } from "../middleware/auth.js";

// importar validaciones.

export const createExperienceRouter = ({ experienceModel }) => {

    const experienceRouter = Router();

    const experienceController = new ExperienceController({ experienceModel });

   // crear validaciones


    experienceRouter.post('/', authMiddleware, experienceController.create);
    experienceRouter.patch('/:id', authMiddleware, experienceController.update);
    experienceRouter.delete('/:id', authMiddleware, experienceController.delete);

    return experienceRouter

}