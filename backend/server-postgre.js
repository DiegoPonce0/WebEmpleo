import 'dotenv/config';
import { createApp } from './index.js'

import { JobModel } from './models/postgresql/job.js'
import { UserModel } from './models/postgresql/user.js'
import { ExperienceModel } from './models/postgresql/experience.js'
import { FavoriteModel } from './models/postgresql/favorite.js';


const app = createApp(
    { 
        jobModel: JobModel,
        userModel: UserModel,
        experienceModel: ExperienceModel,
        favoriteModel: FavoriteModel
    }
)

export default app;