import { Router } from "express";

import { UserController } from "../controllers/users.js";
import { authMiddleware } from "../middleware/auth.js";
import { validateRegister, validateLogin, formatZodErrors } from "../schemas/auth.js";

export const createAuthRouter = ({ userModel }) => {

    const validateRegisterMiddleware = (req, res, next) => {
        const result = validateRegister(req.body)
        if (result.success) {
            req.body = result.data
            return next()
        }
        const errors = formatZodErrors(result.error)
        return res.status(400).json({ error: 'Invalid registration data', details: errors })
    }

    const validateLoginMiddleware = (req, res, next) => {
        const result = validateLogin(req.body)
        if (result.success) {
            req.body = result.data
            return next()
        }
        return res.status(400).json({ error: 'Invalid login data', details: result.error.errors })
    }

    const authRouter = Router();

    const userController = new UserController({ userModel})


    authRouter.post('/register', validateRegisterMiddleware, userController.register);
    authRouter.post('/login', validateLoginMiddleware, userController.login);
    authRouter.post('/logout', userController.logout);
    authRouter.get('/me', authMiddleware, userController.me);
    authRouter.patch('/update', authMiddleware, userController.update)

    return authRouter

}