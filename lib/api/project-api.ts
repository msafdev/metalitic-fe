import { api } from "../axios";
import {
  CreateProjectRequest,
  DetailProjectResponse,
  ProjectResponse
} from "../types/project-type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProjects(): Promise<ProjectResponse> {
  const res = await api.get<ProjectResponse>(`${API_URL}/manager/projects`, {
    withCredentials: true
  });

  return res.data;
}

export async function createProject(body: CreateProjectRequest) {
  const res = await api.post(`${API_URL}/manager/projects`, body, {
    withCredentials: true
  });

  return res.data;
}

export async function getProjectDetail(
  idProject: string
): Promise<DetailProjectResponse> {
  const res = await api.get<DetailProjectResponse>(
    `${API_URL}/manager/projects/${idProject}`,
    {
      withCredentials: true
    }
  );

  return res.data;
}
