import { api } from "../axios";
import { GetUsersResponse } from "../types/user-type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers() {
  const res = await api.get<GetUsersResponse>(`${API_URL}/manager/users`, {
    withCredentials: true
  });

  return res.data;
}
