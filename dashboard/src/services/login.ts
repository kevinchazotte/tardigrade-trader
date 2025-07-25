// src/services/widgets.ts
import { fetchWrapper } from './api.ts';

export const postUser = async function(username: string, email: string, password: string) {
  const response = await fetchWrapper("api/authentication/login", {
    method: 'POST',
    body: JSON.stringify({ username, email, password })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`HTTP Error: ${errorData.message || 'An unknown error occurred'}`)
  }
  return response.json();
}
