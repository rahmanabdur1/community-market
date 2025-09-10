import { authApi } from "./api";

export const getAnalytics = async (params?: { type?: string; startDate?: string; endDate?: string }) => (await authApi.get("/analytics", { params })).data;


