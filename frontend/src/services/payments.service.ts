import { authApi } from "./api";

export const listPayments = async () => (await authApi.get("/payments")).data;
export const getPayment = async (id: string) => (await authApi.get(`/payments/${id}`)).data;
export const confirmManualPayment = async (payload: any) => (await authApi.post(`/payments/manual`, payload)).data;
export const updatePaymentStatus = async (id: string, status: string) => (await authApi.patch(`/payments/${id}/status`, { status })).data;


