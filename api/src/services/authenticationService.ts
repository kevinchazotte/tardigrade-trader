// api/src/services/dashboardService.ts
import * as authenticationModel from '../models/authenticationModel';
import { type User } from '@kubernetes-dashboard/dashboard-shared/types/user';

export const getPossibleMatchingUsers = async (username: string, email: string): Promise<User[]> => {
    try {
        return await authenticationModel.getPossibleMatchingUsers(username, email);
    } catch (error) {
        console.error('Error getting matching user: ', error);
        throw new Error('Error getting matching users');
    }
};

export const getExactMatchingUsers = async (username: string, email: string): Promise<User[]> => {
    try {
        return await authenticationModel.getExactMatchingUsers(username, email);
    } catch (error) {
        console.error('Error getting matching user: ', error);
        throw new Error('Error getting matching users');
    }
};

export const insertUser = async (username: string, email: string, password_hash: string): Promise<User> => {
    try {
        return await authenticationModel.insertUser(username, email, password_hash);
    } catch (error) {
        console.error('Error creating user: ', error);
        throw new Error('Error creating user');
    }
};
