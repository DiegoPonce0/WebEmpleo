import express from 'express';
import cookieParser from  'cookie-parser';
import { corsMiddleware } from './middleware/cors.js';
import { DEFAULTS } from './config.js';
import { createJobsRouter } from './routes/jobs.js';
import { createAIRouter } from './routes/ai.js';
import { createAuthRouter } from './routes/auth.js';
import { createExperienceRouter } from './routes/experiences.js';
import { createFavoritesRouter } from './routes/favorites.js'



export const createApp = ({ jobModel, userModel, experienceModel, favoriteModel }) => {
  const PORT = process.env.PORT ?? DEFAULTS.PORT;
  const app = express();
  
  app.disable('x-powered-by')
  app.set('trust proxy', 1)
  
  app.use(corsMiddleware());
  app.use(cookieParser());
  
  app.use(express.json());


  
  app.use('/jobs', createJobsRouter({jobModel}));
  app.use('/ai', createAIRouter({jobModel}));
  app.use('/auth', createAuthRouter({userModel}));
  app.use('/experiences', createExperienceRouter({experienceModel}));
  app.use('/favorites', createFavoritesRouter({favoriteModel}))

  if (!process.env.NODE_ENV){
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }

  return app;

}
