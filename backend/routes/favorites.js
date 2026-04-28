import { Router } from "express";
import { authMiddleware } from '../middleware/auth.js';

import { FavoriteController } from "../controllers/favorites.js";

export const createFavoritesRouter = ({ favoriteModel }) => {


    const favoritesRouter = Router();

    const favoriteController = new FavoriteController({ favoriteModel })

    favoritesRouter.get('/', authMiddleware, favoriteController.readAll);
    favoritesRouter.post('/:id', authMiddleware, favoriteController.create)
    favoritesRouter.delete('/:id', authMiddleware, favoriteController.delete)

    return favoritesRouter
}