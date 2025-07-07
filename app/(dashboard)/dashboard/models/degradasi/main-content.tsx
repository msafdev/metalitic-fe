import React from "react";
import { useTab } from "../context/tab-context";
import DataAnotationSection from "../components/data-anotation-section";
import DatasetSection from "../components/dataset-section";
import TrainingSection from "../components/training-section";
import { UploadSection } from "../components/upload-section";
import { useAIConfiguration } from "../context/ai-configuration-context";

export default function MainContent() {
  const { activeTab } = useTab();

  return (
    <div className="flex-1 flex flex-col py-4 pt-0 gap-4">
      <div className="space-y-2 px-4">
        <h2 className="text-2xl font-semibold">
          Pengaturan Model AI Klasifikasi Degradasi
        </h2>
      </div>
      <div className="space-y-3.5 p-4">
        {activeTab === "upload" && (
          <UploadSection aiModelClasification="degradasi" />
        )}
        {activeTab === "data-annotation" && (
          <DataAnotationSection aiModelClasification="degradasi" />
        )}
        {activeTab === "dataset" && (
          <DatasetSection aiModelClasification="degradasi" />
        )}
        {activeTab === "training" && (
          <TrainingSection aiModelClasification="degradasi" />
        )}
      </div>
    </div>
  );
}
