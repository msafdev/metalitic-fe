import { api } from "../axios";
import { DataTransformers } from "../data-transformer";
import { Register } from "../types/auth-type";
import { CommonResponse } from "../types/common-type";
import {
  DetailUserResponse,
  UpdateuserRequest,
  UserResponse
} from "../types/user-type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers() {
  const res = await api.get<UserResponse>(`${API_URL}/manager/users`, {
    withCredentials: true
  });

  return res.data;
}

export async function getUserDetail(idUser: string) {
  const res = await api.get<DetailUserResponse>(
    `${API_URL}/manager/user/${idUser}`,
    {
      withCredentials: true
    }
  );

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

export async function updateUser({
  id,
  body
}: {
  id: string;
  body: UpdateuserRequest;
}): Promise<CommonResponse> {
  const formData = DataTransformers.objectToFormData(body);

  const res = await api.put(`${API_URL}/manager/user/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    withCredentials: true
  });

  return res.data;
}
