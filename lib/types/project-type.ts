import {
  ProjectEvaluation,
  ProjectEvaluationStatus
} from "./project-evaluation-type";
import { User } from "./user-type";

export type Project = {
  _id: string;
  idProject: string;
  namaProject: string;
  pemintaJasa: string;
  tanggalOrderMasuk: string;
  penguji: {
    _id: string;
    name: string;
    jabatan: string;
  }[];
  pengujian: ProjectEvaluationSummary[];
  createdAt: string;
  updatedAt: string;
};

export type ProjectEvaluationSummary = {
  id: string;
  projectId: string;
  nama: string;
  status: ProjectEvaluationStatus;
  progress: number;
  missingFields: (keyof ProjectEvaluation)[];
  lokasi: string;
  material: string;
  createdAt: string;
  updatedAt: string;
  lastActive: string;
};

export type ProjectResponse = {
  message: string;
  data: Project[];
};

export type DetailProjectResponse = {
  message: string;
  data: Project;
};

export type CreateProjectRequest = {
  namaProject: string;
  pemintaJasa: string;
  tanggalOrderMasuk: string;
  penguji: string[];
};

export type UpdateProjectRequest = Partial<CreateProjectRequest>;
