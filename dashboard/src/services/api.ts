// src/services/api.ts
const BASE_URL = 'http://127.0.0.1:5000/' // development: point to wherever backend is hosted

export const fetchWrapper = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
    const authToken = localStorage.getItem('authToken');
    const fixedHeaders = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    const headers: Headers = new Headers(fixedHeaders);
    if (authToken) {
        headers.append('Authorization', `Bearer ${authToken}`);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: headers
    });

    return response;
};
