import { api } from "../axios";
import { CommonResponse } from "../types/common-type";
import { UserResponse } from "../types/user-type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers() {
  const res = await api.get<UserResponse>(`${API_URL}/manager/users`, {
    withCredentials: true
  });

  return res.data;
}

export async function verifyUser({
  username,
  isVerify
}: {
  username: string;
  isVerify: boolean;
}): Promise<CommonResponse> {
  const res = await api.post<CommonResponse>(
    `${API_URL}/manager/user/verify`,
    {
      username,
      isVerify
    },
    {
      withCredentials: true
    }
  );

  return res.data;
}
