import { authApi } from "./api";

export const listItems = async () => (await authApi.get("/marketplace")).data;
export const getItem = async (id: string) => (await authApi.get(`/marketplace/${id}`)).data;
export const createItem = async (payload: any) => (await authApi.post(`/marketplace`, payload)).data;
export const updateItem = async (id: string, payload: any) => (await authApi.put(`/marketplace/${id}`, payload)).data;
export const approveItem = async (id: string) => (await authApi.patch(`/marketplace/${id}/approve`, { status: "approved" })).data;
export const featureItem = async (id: string) => (await authApi.patch(`/marketplace/${id}/feature`)).data;
export const deleteItem = async (id: string) => (await authApi.delete(`/marketplace/${id}`)).data;


