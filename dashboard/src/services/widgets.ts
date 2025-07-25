// src/services/widgets.ts
import { fetchWrapper } from './api.ts';
import { type Widget } from '@kubernetes-dashboard/dashboard-shared/types/widget';

export const getWidgets = async function(): Promise<Widget[]> {
  const response = await fetchWrapper("api/dashboard/widgets"); 
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`HTTP Error: ${errorData.message || 'An unknown error occurred'}`)
  }
  return await response.json();
}
