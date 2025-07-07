import React, { createContext, useContext, useState } from "react";
import { ActiveStep } from "../components/stepper-navigation";

type TabContextType = {
  activeTab: ActiveStep;
  setActiveTab: (tab: ActiveStep) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<ActiveStep>("upload");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = (): TabContextType => {
  const context = useContext(TabContext);
  if (!context) throw new Error("useTab must be used within a TabProvider");
  return context;
};
