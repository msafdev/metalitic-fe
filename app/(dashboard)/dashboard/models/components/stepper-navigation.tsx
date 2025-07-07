"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload, FileText, Database, Brain, Check } from "lucide-react";
import { useTab } from "../context/tab-context";

const steps = [
  {
    id: "upload",
    label: "Upload",
    icon: Upload,
    description: "Upload your data files"
  },
  {
    id: "data-annotation",
    label: "Data Annotation",
    icon: FileText,
    description: "Annotate and label data"
  },
  {
    id: "dataset",
    label: "Dataset",
    icon: Database,
    description: "Prepare dataset"
  },
  {
    id: "training",
    label: "Training",
    icon: Brain,
    description: "Train your model"
  }
];

export type ActiveStep = "upload" | "data-annotation" | "dataset" | "training";
type Props = {
  initialActiveStep: ActiveStep;
};

export default function StepperNavigation({ initialActiveStep }: Props) {
  const { activeTab, setActiveTab } = useTab();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const currentStepIndex = steps.findIndex((step) => step.id === activeTab);

  const handleStepClick = (stepId: ActiveStep) => {
    setActiveTab(stepId);
  };

  const markStepComplete = () => {
    if (!completedSteps.includes(activeTab)) {
      setCompletedSteps([...completedSteps, activeTab]);
    }

    // Auto advance to next step
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < steps.length) {
      setActiveTab(steps[nextStepIndex].id as ActiveStep);
    }
  };

  return (
    <div className="px-8 py-6 hidden lg:block">
      <div className="max-w-4xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === activeTab;
            const isCompleted = completedSteps.includes(step.id);
            const isClickable = index <= currentStepIndex + 1;

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() =>
                      isClickable && handleStepClick(step.id as ActiveStep)
                    }
                    disabled={!isClickable}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                      isCompleted
                        ? "bg-primary border-primary text-white"
                        : isActive
                        ? "border-primary text-primary"
                        : isClickable
                        ? " border-gray-300 text-gray-400 hover:border-primary"
                        : "bg-gray-100/70 border-gray-200 text-gray-300 cursor-not-allowed"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </button>

                  {/* Step Label */}
                  <div className="mt-2 text-center">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        isActive
                          ? "text-primary"
                          : isCompleted
                          ? "text-primary"
                          : "text-gray-500"
                      )}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 max-w-24">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-4 mt-[-2rem]",
                      completedSteps.includes(step.id)
                        ? "bg-primary"
                        : "bg-gray-200"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
