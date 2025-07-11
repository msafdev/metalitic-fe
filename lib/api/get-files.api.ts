import { api } from "../axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getFiles(path: string) {
  const res = await api.get(`${API_URL}/manager/uploaded-sample`, {
    params: {
      path
    },
    withCredentials: true
  });

  return res.data;
}
