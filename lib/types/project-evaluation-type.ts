export type ProjectEvaluationStatus =
  | "DRAFT"
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED";

export type ProjectEvaluation = {
  _id: string;
  id: string;
  projectId: string;
  nama: string;
  status: ProjectEvaluationStatus;
  tanggal: string;
  lokasi: string;
  area: string;
  posisi: string;
  material: string;
  gritSandWhell: string;
  etsa: string;
  kamera: string;
  merkMikroskop: string;
  perbesaranMikroskop: string;
  gambarKomponent1: string;
  gambarKomponent2: string;
  listGambarStrukturMikro: string[];
  aiModelFasa: string;
  aiModelCrack: string;
  aiModelDegradasi: string;
  progress: number;
  missingFields: (keyof ProjectEvaluation)[];
};

type IgnoredKeys =
  | "_id"
  | "id"
  | "projectId"
  | "nama"
  | "status"
  | "progress"
  | "missingFields";
export type MissingFieldKey = Exclude<keyof ProjectEvaluation, IgnoredKeys>;

export type GetProjectEvaluationDetailResponse = {
  status: boolean;
  message: string;
  data: ProjectEvaluation;
};

export type CreateProjectEvaluationRequest = {
  id: string;
  projectId: string;
  nama: string;
};

export type CreateProjectEvaluationResponse = {
  status: boolean;
  message: string;
  data: ProjectEvaluation;
};

export type UpdateProjectEvaluationRequest = {
  id: string;
  projectId: string;
  nama: string;
  tanggal: string;
  lokasi: string;
  area: string;
  posisi: string;
  material: string;
  gritSandWhell: string;
  etsa: string;
  kamera: string;
  merkMikroskop: string;
  perbesaranMikroskop: string;
  gambarKomponent1: File;
  gambarKomponent2: File;
  listGambarStrukturMikro: File[];
  aiModelFasa: string;
  aiModelCrack: string;
  aiModelDegradasi: string;
};
