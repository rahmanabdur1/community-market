import { api, authApi } from "./api";

export const listListings = async (query?: { q?: string; location?: string }) => (await api.get("/listings", { params: query })).data;
export const getListing = async (id: string) => (await api.get(`/listings/${id}`)).data;
export const checkAvailability = async (id: string, date: string) => (await api.get(`/listings/${id}/availability`, { params: { date } })).data;
export const createListing = async (payload: any) => (await authApi.post(`/listings`, payload)).data;
export const updateListing = async (id: string, payload: any) => (await authApi.put(`/listings/${id}`, payload)).data;
export const approveListing = async (id: string) => (await authApi.patch(`/listings/${id}/approve`, { status: "approved" })).data;
export const featureListing = async (id: string) => (await authApi.patch(`/listings/${id}/feature`)).data;
export const deleteListing = async (id: string) => (await authApi.delete(`/listings/${id}`)).data;


