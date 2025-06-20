const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers() {
  const res = await fetch(`${API_URL}/api/v1/manager/users`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}
