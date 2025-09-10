import { authApi } from "./api";

export const listBookings = async () => (await authApi.get("/bookings")).data;
export const getBooking = async (id: string) => (await authApi.get(`/bookings/${id}`)).data;
export const createBooking = async (payload: any) => (await authApi.post(`/bookings`, payload)).data;
export const updateBooking = async (id: string, payload: any) => (await authApi.put(`/bookings/${id}`, payload)).data;
export const confirmBooking = async (id: string) => (await authApi.patch(`/bookings/${id}/confirm`)).data;
export const cancelBooking = async (id: string) => (await authApi.patch(`/bookings/${id}/cancel`)).data;
