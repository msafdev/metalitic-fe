import { api } from "@/lib/axios";
import { Profile } from "@/types/auth.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser({ username, password }: { username: string; password: string }) {
  const res = await api.post(
    `${API_URL}/manager/login`,
    { username, password },
    {
      withCredentials: true,
    }
  );

  return res.data;
}

export async function verifyToken() {
  const res = await api.get(`${API_URL}/manager/authenticate`, {
    withCredentials: true,
  });

  return res.data;
}

export async function getProfile() {
  const res = await api.get<{
    message: Profile;
  }>(`${API_URL}/manager/get-profile`, {
    withCredentials: true,
  });

  return res.data;
}

export async function logoutUser() {
  const res = await api.post(
    `${API_URL}/manager/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  return res.data;
}
