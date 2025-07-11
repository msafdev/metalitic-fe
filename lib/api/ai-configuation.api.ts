import { api } from "../axios";
import {
  AiSaveCompletedRequest,
  AiStartTrainingRequest,
  GetAiRecommendationFromSampleRequest,
  GetAiRecommendationFromSampleResponse
} from "../types/ai-configuration.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAiRecommendationFromSample(
  body: GetAiRecommendationFromSampleRequest
) {
  const res = await api.post<GetAiRecommendationFromSampleResponse>(
    `${API_URL}/manager/ai-configuration/get-recommendation-from-sample`,
    body,
    {
      withCredentials: true
    }
  );

  return res.data;
}

// TODO === API UNTUK MULAI AI TRAINING
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

// TODO === MASIH STATIK
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
