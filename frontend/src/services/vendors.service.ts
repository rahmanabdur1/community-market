import { authApi } from "./api";

export const listVendors = async () => (await authApi.get("/vendors")).data;
export const getVendor = async (id: string) => (await authApi.get(`/vendors/${id}`)).data;
export const createVendor = async (payload: any) => (await authApi.post(`/vendors`, payload)).data;
export const updateVendor = async (id: string, payload: any) => (await authApi.put(`/vendors/${id}`, payload)).data;
export const updateVendorStatus = async (id: string, status: string) => (await authApi.patch(`/vendors/${id}/status`, { status })).data;


