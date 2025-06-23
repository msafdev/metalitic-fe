import { api } from "../axios";
import { ProfileResponse, Register } from "../types/auth-type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser({
  username,
  password
}: {
  username: string;
  password: string;
}) {
  let res = await fetch(`${API_URL}/manager/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    return res.json();
  }

  res = await fetch(`${API_URL}/superadmin/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error("Login failed for both manager and superadmin");
}

export async function registerUser({ body }: { body: Register }) {
  let res = await fetch(`${API_URL}/manager/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error("Register failed");
}

export async function verifyToken() {
  const res = await fetch(`${API_URL}/check-auth`, {
    method: "GET",
    credentials: "include"
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function getProfile(): Promise<ProfileResponse> {
  const res = await api.get(`${API_URL}/get-profile`, {
    withCredentials: true
  });

  return res.data;
}

export async function logoutUser() {
  const res = await api.post(`${API_URL}/manager/logout`, null, {
    withCredentials: true
  });

  return res.data;
}

export async function deleteUser({ id }: { id: string }) {
  const res = await api.delete(`${API_URL}/manager/user/delete`, {
    withCredentials: true,
    data: { id }
  });

  return res.data;
}
