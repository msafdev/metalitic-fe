import { ProfileResponse } from "../types/auth-type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  let res = await fetch(`${API_URL}/manager/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (res.ok) {
    return res.json();
  }

  res = await fetch(`${API_URL}/superadmin/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error("Login failed for both manager and superadmin");
}

export async function verifyToken() {
  const res = await fetch(`${API_URL}/check-auth`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function getProfile(): Promise<ProfileResponse> {
  const res = await fetch(`${API_URL}/get-profile`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  const data: ProfileResponse = await res.json();
  return data;
}

export async function logoutUser() {
  const res = await fetch(`${API_URL}/manager/user/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");
  return res.json();
}
