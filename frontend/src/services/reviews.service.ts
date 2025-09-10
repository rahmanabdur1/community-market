import { authApi } from "./api";

export const listReviews = async () => (await authApi.get("/reviews")).data;
export const createReview = async (payload: any) => (await authApi.post(`/reviews`, payload)).data;
export const deleteReview = async (id: string) => (await authApi.delete(`/reviews/${id}`)).data;


