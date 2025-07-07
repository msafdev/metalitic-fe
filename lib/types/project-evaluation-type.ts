export type ProjectEvaluationStatus =
  | "DRAFT"
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED";

export type ProjectEvaluation = {
  _id: string;
  id: string;
  projectId: string;
  project: {
    _id: string;
    idProject: string;
    namaProject: string;
    pemintaJasa: string;
    tanggalOrderMasuk: string;
    penguji: string[];
  };
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
  isAnalyzed: boolean;
  missingFields: (keyof ProjectEvaluation)[];
};

type IgnoredKeys =
  | "_id"
  | "id"
  | "projectId"
  | "project"
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

export type GetAiModelsListResponse = {
  status: boolean;
  message: string;
  data: {
    fasa: string[];
    crack: string[];
    degradasi: string[];
  };
};

export type GetAiClasificationListResponse = {
  status: boolean;
  message: string;
  data: {
    fasa: string[];
    crack: string[];
    degradasi: string[];
  };
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

export type UpdateProjectEvaluationResponse = {
  message: string;
  data: {
    _id: string;
    id: string;
    projectId: string;
    nama: string;
    status: string;
    listGambarStrukturMikro: string[];
    createdAt: string;
    updatedAt: string;
    aiModelCrack: string;
    aiModelDegradasi: string;
    aiModelFasa: string;
    area: string;
    etsa: string;
    gritSandWhell: string;
    kamera: string;
    lokasi: string;
    material: string;
    merkMikroskop: string;
    perbesaranMikroskop: string;
    posisi: string;
    tanggal: string;
    isAnalyzed: boolean;
    gambarKomponent1: string;
    gambarKomponent2: string;
  };
};

export type AnalyzedResultRequest = {
  projectEvaluationId: string;
  projectId: string;
  nama: string;
  listGambarStrukturMikro: string[];
  aiModelCrack: string;
  aiModelDegradasi: string;
  aiModelFasa: string;
  area: string;
  etsa: string;
  gritSandWhell: string;
  kamera: string;
  lokasi: string;
  material: string;
  merkMikroskop: string;
  perbesaranMikroskop: string;
  posisi: string;
  tanggal: string;
  gambarKomponent1: string;
  gambarKomponent2: string;
};

export type AnalyzedResultResponse = {
  status: boolean;
  message: string;
  data: AnalyzedResult;
};

export type UpdateAnalyzedResultRequest = {
  type: "fasa" | "crack" | "degradasi"; // fasa | crack | degradasi
  mode: "AI" | "MANUAL"; // AI | MANUAL
  hasilKlasifikasiManual: string | null;
  modelAnalyzedResultId: string; // hasilAnalisa[index]._id
};

export type AnalyzedResult = {
  _id: string;
  projectEvaluationId: string;
  projectId: string;
  nama: string;
  status: string;
  progress: number;
  detail: AnalyzedResultDetail;
  hasilAnalisa: ModelAnalyzedResult[];
  kesimpulan: Conclusion;
  penguji: string[];
  pemeriksa: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Conclusion = {
  strukturMikro: string;
  fiturMikroskopik: string;
  damageClass: string;
  hardness: string;
  rekomendasi: string;
};

export type ModelAnalyzedResult = {
  image: string;
  fasa: ModelResult;
  crack: ModelResult;
  degradasi: ModelResult;
  _id: string;
};

export type ModelResult = {
  image: string;
  penguji: string;
  tanggalUpdate: string;
  mode: "AI" | "MANUAL";
  hasilKlasifikasiAI: string;
  modelAI: string;
  confidence: number;
  hasilKlasifikasiManual: null | string;
};

type AnalyzedResultDetail = {
  pemintaJasa: string;
  tanggalOrderMasuk: string;
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
};

export const missingFieldMapping: Record<MissingFieldKey, string> = {
  tanggal: "Tanggal belum ditentukan",
  lokasi: "Lokasi belum ditentukan",
  area: "Area belum ditentukan",
  posisi: "Posisi belum ditentukan",
  material: "Material belum ditentukan",
  gritSandWhell: "Grit Sand Whell belum ditentukan",
  etsa: "ETSA belum ditentukan",
  kamera: "Kamera belum ditentukan",
  merkMikroskop: "Merk Mikrosop belum ditentukan",
  perbesaranMikroskop: "Perbesaran Mikroskop belum ditentukan",
  gambarKomponent1: "Gambar Komponent 1 belum diupload",
  gambarKomponent2: "Gambar Komponent 2 belum diupload",
  listGambarStrukturMikro: "Struktur Mikro belum diupload",
  aiModelFasa: "AI Model Fasa belum ditentukan",
  aiModelCrack: "AI Model Crack belum ditentukan",
  aiModelDegradasi: "AI Model Degradasi belum ditentukan",
  isAnalyzed: "Pengujian belum di-analisa"
};
