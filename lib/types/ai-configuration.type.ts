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

export type AiModelUploadImageRequest = {
  type: "fasa" | "crack" | "degradasi";
  imageList: File[];
};

export type AiModelUploadImageResponse = {
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

// "aiRecommendationResult": [
//   {
//     "image": "http://localhost:1945/uploads/20250707_175441_umx7af.png",
//     "penguji": "Samwell Tarley 1",
//     "tanggalUpdate": "2025-01-15T00:00:00.000Z",
//     "mode": "AI",
//     "hasilKlasifikasiAI": "Austenite",
//     "modelAI": "Model AI FASA 12",
//     "confidence": 90.1,
//     "hasilKlasifikasiManual": null,
//     "isAnotated": true,
//     "useRecommendation": true
//   },
//   {
//     "image": "http://localhost:1945/uploads/20250707_175441_slsp4j.png",
//     "penguji": "Samwell Tarley 2",
//     "tanggalUpdate": "2025-01-15T00:00:00.000Z",
//     "mode": "AI",
//     "hasilKlasifikasiAI": "Austenite",
//     "modelAI": "Model AI FASA 12",
//     "confidence": 90.1,
//     "hasilKlasifikasiManual": null,
//     "isAnotated": true,
//     "useRecommendation": true
//   },
//   {
//     "image": "http://localhost:1945/uploads/20250707_175441_7hdyb.png",
//     "penguji": "Samwell Tarley 3",
//     "tanggalUpdate": "2025-01-15T00:00:00.000Z",
//     "mode": "AI",
//     "hasilKlasifikasiAI": "Austenite",
//     "modelAI": "Model AI FASA 12",
//     "confidence": 90.1,
//     "hasilKlasifikasiManual": null,
//     "isAnotated": true,
//     "useRecommendation": true
//   },
//   {
//     "image": "http://localhost:1945/uploads/20250707_175441_hbjiuv.png",
//     "penguji": "Samwell Tarley 4",
//     "tanggalUpdate": "2025-01-15T00:00:00.000Z",
//     "mode": "AI",
//     "hasilKlasifikasiAI": "Austenite",
//     "modelAI": "Model AI FASA 12",
//     "confidence": 90.1,
//     "hasilKlasifikasiManual": null,
//     "isAnotated": true,
//     "useRecommendation": true
//   },
//   {
//     "image": "http://localhost:1945/uploads/20250707_175445_gv2aj.png",
//     "penguji": "Samwell Tarley 5",
//     "tanggalUpdate": "2025-01-15T00:00:00.000Z",
//     "mode": "AI",
//     "hasilKlasifikasiAI": "Austenite",
//     "modelAI": "Model AI FASA 12",
//     "confidence": 90.1,
//     "hasilKlasifikasiManual": null,
//     "isAnotated": true,
//     "useRecommendation": true
//   },
//   {
//     "image": "http://localhost:1945/uploads/20250707_175445_v04a0a.png",
//     "penguji": "Samwell Tarley 6",
//     "tanggalUpdate": "2025-01-15T00:00:00.000Z",
//     "mode": "AI",
//     "hasilKlasifikasiAI": "Austenite",
//     "modelAI": "Model AI FASA 12",
//     "confidence": 90.1,
//     "hasilKlasifikasiManual": null,
//     "isAnotated": true,
//     "useRecommendation": true
//   }
// ],
// "useOlderDatasetImage": true,
// "aiFileModelName": "awgawggawgagwagwgwgagawg"
