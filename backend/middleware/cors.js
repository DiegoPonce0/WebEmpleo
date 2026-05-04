import cors from 'cors';

const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:1234',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://web-empleo.vercel.app',
  'https://web-empleo-backend.vercel.app'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
    return cors({
      origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin) || !origin) {
          return callback(null, true)
        }
        return callback(new Error('Origen no permitido por CORS'))
      },
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    });
}