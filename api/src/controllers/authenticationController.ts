// api/src/controllers/authenticationController.ts
import { Request, Response } from 'express';
import * as authenticationService from '../services/authenticationService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (request: Request, response: Response) => {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
        return response.status(400).json({ message: "Missing required user fields" });
    }

    try {
        const matchingUsers = await authenticationService.getPossibleMatchingUsers(username, email);
        if (matchingUsers.length > 0) {
            return response.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        const newUser = await authenticationService.insertUser(username, email, password_hash);
        return response.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error('Error registering user: ', error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
};

export const loginUser = async (request: Request, response: Response) => {
    const { username, email, password } = request.body;
    if (!email || !password) {
        return response.status(400).json({ message: "Missing required user fields" });
    }

    try {
        const existingUsers = await authenticationService.getExactMatchingUsers(username, email);
        const user = existingUsers[0];
        if (!user) {
            return response.status(404).json({ message: "User credentials not found" });
        }
        const passwordMatches = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatches) {
            return response.status(401).json({ message: "Invalid credentials for user" });
        }
        const payload = {
            user: {
                id: user.id,
                username: user.username
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: '1h'});
        response.json({ token });
    } catch (error) {
        console.error('Error logging in: ', error);
        response.status(500).json({ message: "Server Error" });
    }
};
