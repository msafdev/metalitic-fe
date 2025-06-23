import { api } from "../axios";
import {
  CreateProjectEvaluationRequest,
  CreateProjectEvaluationResponse,
  GetProjectEvaluationDetailResponse,
  UpdateProjectEvaluationRequest
} from "../types/project-evaluation-type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProjectEvaluationById(
  id: string
): Promise<GetProjectEvaluationDetailResponse> {
  const res = await api.get<GetProjectEvaluationDetailResponse>(
    `${API_URL}/manager/projects/evaluation/${id}`,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function createProjectEvaluation(
  body: CreateProjectEvaluationRequest
): Promise<CreateProjectEvaluationResponse> {
  const res = await api.post<CreateProjectEvaluationResponse>(
    `${API_URL}/manager/projects/evaluation`,
    body,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function updateProjectEvaluation({
  id,
  body
}: {
  id: string;
  body: UpdateProjectEvaluationRequest;
}) {
  const res = await api.put(
    `${API_URL}/manager/projects/evaluation/${id}`,
    body,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function deleteProjectEvaluation(id: string) {
  const res = await api.delete(`${API_URL}/manager/projects/evaluation/${id}`, {
    withCredentials: true
  });

  return res.data;
}
