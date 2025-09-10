import { authApi } from "./api";

export const listPosts = async () => (await authApi.get("/posts")).data;
export const getPost = async (id: string) => (await authApi.get(`/posts/${id}`)).data;
export const createPost = async (payload: any) => (await authApi.post(`/posts`, payload)).data;
export const approvePost = async (id: string) => (await authApi.patch(`/posts/${id}/approve`, { status: "approved" })).data;
export const deletePost = async (id: string) => (await authApi.delete(`/posts/${id}`)).data;


