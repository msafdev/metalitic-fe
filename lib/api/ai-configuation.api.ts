import { api } from "../axios";
import {
  AiModelUploadImageRequest,
  AiModelUploadImageResponse,
  AiSaveCompletedRequest,
  AiStartTrainingRequest
} from "../types/ai-configuration.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function aiModelUploadImage(body: AiModelUploadImageRequest) {
  const formDataBody = new FormData();

  formDataBody.append("type", body.type);
  body.imageList.forEach((file) => {
    formDataBody.append("imageList", file); // TANPA [0], [1], dst
  });

  const res = await api.post<AiModelUploadImageResponse>(
    `${API_URL}/manager/ai-configuration/upload-image`,
    formDataBody,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    }
  );

  return res.data;
}
export async function aiStartTraining(body: AiStartTrainingRequest) {
  const res = await api.post(
    `${API_URL}/manager/ai-configuration/start-training`,
    body,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function saveAiModel(body: AiStartTrainingRequest) {
  const res = await api.post(
    `${API_URL}/manager/ai-configuration/save-model`,
    body,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function saveAiCompletedModel(body: AiSaveCompletedRequest) {
  const res = await api.post(
    `${API_URL}/manager/ai-configuration/save-completed-model`,
    body,
    {
      withCredentials: true
    }
  );

  return res.data;
}
