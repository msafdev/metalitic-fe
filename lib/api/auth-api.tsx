const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/api/v1/manager/user/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function verifyToken() {
  const res = await fetch(`${API_URL}/api/v1/manager/user/authenticate`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function getProfile() {
  const res = await fetch(`${API_URL}/api/v1/manager/user/get-profile`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function logoutUser() {
  const res = await fetch(`${API_URL}/api/v1/manager/user/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");
  return res.json();
}
