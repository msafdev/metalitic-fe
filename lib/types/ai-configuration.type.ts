export type AiRecommendationResult = {
  image: string;
  penguji: string;
  tanggalUpdate: string;
  mode: "AI" | "MANUAL";
  hasilKlasifikasiAI: string;
  modelAI: string;
  confidence: number;
  hasilKlasifikasiManual: null | string;
  isAnotated: boolean;
  useRecommendation: boolean;
};

export type GetAiRecommendationFromSampleRequest = {
  type: "fasa" | "crack" | "degradasi";
  imageList: string[];
};

export type GetAiRecommendationFromSampleResponse = {
  status: boolean;
  message: string;
  data: {
    type: "fasa" | "crack" | "degradasi";
    aiRecommendationResult: AiRecommendationResult[];
  };
};

export type AiStartTrainingRequest = {
  aiRecommendationResult: AiRecommendationResult[];
  type: "fasa" | "crack" | "degradasi";
  useOlderDatasetImage: boolean;
  aiFileModelName: string;
};

export type AiSaveCompletedRequest = {
  aiModelName: string;
  aiModelFile: File;
};
