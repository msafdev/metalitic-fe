import { api } from "../axios";
import {
  AnalyzedResultRequest,
  AnalyzedResultResponse,
  CreateProjectEvaluationRequest,
  CreateProjectEvaluationResponse,
  CreateReportProjectEvaluationRequest,
  GetAiClasificationListResponse,
  GetAiModelsListResponse,
  GetProjectEvaluationDetailResponse,
  UpdateAnalyzedResultRequest,
  UpdateProjectEvaluationRequest,
  UpdateProjectEvaluationResponse
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

export async function getAiModelsList(): Promise<GetAiModelsListResponse> {
  const res = await api.get<GetAiModelsListResponse>(
    `${API_URL}/manager/projects/evaluation/ai-model-list`,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function getAiClasificationList(): Promise<GetAiClasificationListResponse> {
  const res = await api.get<GetAiClasificationListResponse>(
    `${API_URL}/manager/projects/evaluation/ai-clasification-list`,
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
  const formDataBody = new FormData();

  formDataBody.append("id", body.id);
  formDataBody.append("projectId", body.projectId);
  formDataBody.append("nama", body.nama);
  formDataBody.append("tanggal", body.tanggal);
  formDataBody.append("lokasi", body.lokasi);
  formDataBody.append("area", body.area);
  formDataBody.append("posisi", body.posisi);
  formDataBody.append("material", body.material);
  formDataBody.append("gritSandWhell", body.gritSandWhell);
  formDataBody.append("etsa", body.etsa);
  formDataBody.append("kamera", body.kamera);
  formDataBody.append("merkMikroskop", body.merkMikroskop);
  formDataBody.append("perbesaranMikroskop", body.perbesaranMikroskop);
  formDataBody.append("gambarKomponent1", body.gambarKomponent1);
  formDataBody.append("gambarKomponent2", body.gambarKomponent2);
  body.listGambarStrukturMikro.forEach((file) => {
    formDataBody.append("listGambarStrukturMikro", file); // TANPA [0], [1], dst
  });
  formDataBody.append("aiModelFasa", body.aiModelFasa);
  formDataBody.append("aiModelCrack", body.aiModelCrack);
  formDataBody.append("aiModelDegradasi", body.aiModelDegradasi);

  const res = await api.put<UpdateProjectEvaluationResponse>(
    `${API_URL}/manager/projects/evaluation/${id}`,
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

export async function analyzeProjectEvaluation({
  id,
  body
}: {
  id: string;
  body: AnalyzedResultRequest;
}) {
  const res = await api.post(
    `${API_URL}/manager/projects/evaluation/${id}/analyze-with-ai`,
    body,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function getAnalyzedResult(projectEvaluationId: string) {
  const res = await api.get<AnalyzedResultResponse>(
    `${API_URL}/manager/projects/evaluation/${projectEvaluationId}/analyzed-result`,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function updateAnalyzedResult({
  id,
  body
}: {
  id: string;
  body: UpdateAnalyzedResultRequest;
}) {
  const res = await api.put<AnalyzedResultResponse>(
    `${API_URL}/manager/projects/evaluation/${id}/analyzed-result`,
    body,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function createReportProjectEvaluation({
  id,
  body
}: {
  id: string;
  body: CreateReportProjectEvaluationRequest;
}) {
  const res = await api.post(
    `${API_URL}/manager/projects/evaluation/${id}/create-report`,
    body,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function updateProjectEvaluationStatusToPending(id: string) {
  const res = await api.put(
    `${API_URL}/manager/projects/evaluation/${id}/status/pending`,
    {},
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function updateProjectEvaluationStatusToProcessing(id: string) {
  const res = await api.put(
    `${API_URL}/manager/projects/evaluation/${id}/status/processing`,
    {},
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

export async function deleteProjectEvaluationImageComponent1(
  projectEvaluationId: string
) {
  const res = await api.delete(
    `${API_URL}/manager/projects/evaluation/${projectEvaluationId}/image-component-1`,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function deleteProjectEvaluationImageComponent2(
  projectEvaluationId: string
) {
  const res = await api.delete(
    `${API_URL}/manager/projects/evaluation/${projectEvaluationId}/image-component-2`,
    {
      withCredentials: true
    }
  );

  return res.data;
}

export async function deleteProjectEvaluationImageListMicroStructure(
  projectEvaluationId: string
) {
  const res = await api.delete(
    `${API_URL}/manager/projects/evaluation/${projectEvaluationId}/image-list-micro-structure`,
    {
      withCredentials: true
    }
  );

  return res.data;
}
