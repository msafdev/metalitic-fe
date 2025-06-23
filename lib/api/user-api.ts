import { cookies } from "next/headers";
import { UserResponse } from "../types/user-type";
import { CommonResponse } from "../types/common-type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers(): Promise<UserResponse> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const role = cookieStore.get("role")?.value;

  const res = await fetch(`${API_URL}/manager/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}; role=${role}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data: UserResponse = await res.json();
  return data;
}

export async function verifyUser({
  username,
  isVerify,
}: {
  username: string;
  isVerify: boolean;
}): Promise<CommonResponse> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const role = cookieStore.get("role")?.value;

  const res = await fetch(`${API_URL}/manager/user/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}; role=${role}`,
    },
    body: JSON.stringify({ username, isVerify }),
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error("Failed to verify user");
}
