// dashboard-shared/types/user.ts
export interface User {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    name: string;
    metric: number;
}
