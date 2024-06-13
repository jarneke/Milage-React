import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_KEY } from '../server';
import dotenv from 'dotenv';

dotenv.config();

export default function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // If no token, return Unauthorized

    jwt.verify(token, JWT_KEY, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.body.user = user;
        return next();
    });
};

