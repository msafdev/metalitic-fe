// app/context/ai-configuration-context.tsx
"use client";

import { AiRecommendationResult } from "@/lib/types/ai-configuration.type";
import { AiModelClasification } from "@/lib/types/common-type";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react";

type AIMode = "AI" | "MANUAL";

type AIConfiguration = {
  imageList: Set<string>;
  aiRecommendationResult: (AiRecommendationResult & {
    useRecommendation: boolean;
  })[];
  useOlderDatasetImage: boolean;
  aiFileModelName: string;
  type: AiModelClasification;
};

const defaultConfig: AIConfiguration = {
  imageList: new Set(),
  aiRecommendationResult: [],
  useOlderDatasetImage: true,
  aiFileModelName: "",
  type: "fasa"
};

type AIConfigurationContextType = {
  config: AIConfiguration;
  setConfig: (value: Partial<AIConfiguration>) => void;
};

const AIConfigurationContext = createContext<
  AIConfigurationContextType | undefined
>(undefined);

export const AIConfigurationProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [config, setConfigState] = useState<AIConfiguration>(defaultConfig);

  const setConfig = (value: Partial<AIConfiguration>) => {
    setConfigState((prev) => ({
      ...prev,
      ...value
    }));
  };

  return (
    <AIConfigurationContext.Provider value={{ config, setConfig }}>
      {children}
    </AIConfigurationContext.Provider>
  );
};

export const useAIConfiguration = () => {
  const context = useContext(AIConfigurationContext);
  if (!context) {
    throw new Error(
      "useAIConfiguration must be used within an AIConfigurationProvider"
    );
  }
  return context;
};
