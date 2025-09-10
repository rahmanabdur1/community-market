import { authApi } from "./api";

export const listUsers = async () => {
  const { data } = await authApi.get("/users");
  return data;
};

export const getUser = async (id: string) => {
  const { data } = await authApi.get(`/users/${id}`);
  return data;
};

export const updateUser = async (id: string, payload: any) => {
  const { data } = await authApi.put(`/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await authApi.delete(`/users/${id}`);
  return data;
};


