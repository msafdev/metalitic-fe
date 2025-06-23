import { api } from "../axios";
import {
  CreateServiceRequesterRequest,
  CreateServiceRequesterResponse,
  GetServiceRequesterResponse
} from "../types/sevice-requester-type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServiceRequester(): Promise<GetServiceRequesterResponse> {
  const res = await api.get<GetServiceRequesterResponse>(
    `${API_URL}/manager/service-requester`,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function createServiceRequester(
  body: CreateServiceRequesterRequest
): Promise<CreateServiceRequesterResponse> {
  const res = await api.post<CreateServiceRequesterResponse>(
    `${API_URL}/manager/service-requester`,
    body,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function deleteServiceRequester(id: string) {
  const res = await api.delete(`${API_URL}/manager/service-requester/${id}`, {
    withCredentials: true
  });

  return res.data;
}
