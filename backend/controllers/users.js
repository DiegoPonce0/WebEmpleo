import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const SALT_ROUNDS = 10;


export class UserController {
    
    constructor({userModel}) {
        this.userModel = userModel
    }
    
    register = async (req, res) => {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        try {
            const user = await this.userModel.createUser({
                id: crypto.randomUUID(),
                name,
                email,
                password: hashedPassword
            })

            const { password: _, ...safeUser } = user;

            const token = jwt.sign(
            {
            id: user.id,
            email: user.email,
            role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

            res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 60 * 60 * 1000 // <== 1 hora
        })

            return res.status(201).json({
                message: 'User created and logged in successfully',
                user: safeUser
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Error registering user' })
        }
    }

    login = async (req, res) => {
        const { email, password } = req.body;

        try {
        const user = await this.userModel.findByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            {
            id: user.id,
            email: user.email,
            role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Lax para localhost, None para Vercel etc.
            maxAge: 60 * 60 * 1000 // <== 1 hora
        })

        const { password: _, ...safeUser } = user;

        res.json({
            user: safeUser,
            message: 'Logged in successfully'
        })

        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
        }
    };

    logout = (req, res) => {
        res.clearCookie('token')
        res.json({ message: 'Logged out successfully' })
    }

    me = async (req, res) => {
        try{
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const user = await this.userModel.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const { password: _, ...safeUser } = user;

        res.json({ user: safeUser });
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Server error' });
        }
    }

    update = async (req, res) => {
        try{
            if (!req.user) {
                return res.status(401).json({ error: 'Not authenticated' });
            }
            
            const { name, phone, title, experience, location, skills } = req.body;

            const updateUser = await this.userModel.updateProfile({
                id: req.user.id,
                name,
                phone,
                title,
                experience,
                location,
                skills
            });
            if (!updateUser) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            const { password: _, ...safeUser } = updateUser;
    
            res.json({ user: safeUser });

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Server error' });    
        }
    }
}