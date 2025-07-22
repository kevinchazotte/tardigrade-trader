// api/src/models/authenticationModel.ts
import pool from '../config/db';
import { type User } from '@kubernetes-dashboard/dashboard-shared/types/user';

export const getPossibleMatchingUsers = async (username: string, email: string): Promise<User[]> => {
    const users = await pool.query<User>('SELECT * FROM users WHERE username=$1 OR email=$2', [username, email]);
    return users.rows;
};

export const getExactMatchingUsers = async (username: string, email: string): Promise<User[]> => {
    const users = await pool.query<User>('SELECT * FROM users WHERE username=$1 AND email=$2', [username, email]);
    return users.rows;
};

export const insertUser = async (username: string, email: string, password_hash: string): Promise<User> => {
    const newUser = await pool.query<User>('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username', [username, email, password_hash]);
    return newUser.rows[0];
};
