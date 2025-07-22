// api/src/models/userModel.ts
import pool from '../config/db';
import { type User } from '@kubernetes-dashboard/dashboard-shared/types/user';

export const getUsers = async (): Promise<User[]> => {
    const result = await pool.query<User>('SELECT * FROM users ORDER BY id ASC');
    return result.rows;
};
