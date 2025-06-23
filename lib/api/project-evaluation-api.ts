import { api } from "../axios";
import { DataTransformers } from "../data-transformer";
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

  const res = await api.put(
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

export async function deleteProjectEvaluation(id: string) {
  const res = await api.delete(`${API_URL}/manager/projects/evaluation/${id}`, {
    withCredentials: true
  });

  return res.data;
}
