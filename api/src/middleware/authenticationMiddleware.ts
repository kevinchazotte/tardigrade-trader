// api/src/controllers/authenticationController.ts
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
};

export const authenticate = async (request: Request, response: Response, continueWith: NextFunction) => {
    let token;
    const authenticationHeader = request.headers.authorization;
    if (authenticationHeader && authenticationHeader.startsWith('Bearer')) {
        try {
            token = authenticationHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            request.user = (decoded as any).user;
            continueWith();
        } catch (error) {
            response.status(401).json({ message: "User session expired" });
        }
    }

    if (!token) {
        response.status(401).json({ message: "" });
    }
};
