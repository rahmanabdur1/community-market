import { authApi } from "./api";

export const listTickets = async () => (await authApi.get("/support")).data;
export const getTicket = async (id: string) => (await authApi.get(`/support/${id}`)).data;
export const createTicket = async (payload: any) => (await authApi.post(`/support`, payload)).data;
export const updateTicket = async (id: string, payload: any) => (await authApi.put(`/support/${id}`, payload)).data;
export const updateTicketStatus = async (id: string, status: string) => (await authApi.patch(`/support/${id}/status`, { status })).data;


