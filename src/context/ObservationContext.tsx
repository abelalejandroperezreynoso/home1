import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ObservationContextType {
  formData: any;
  updateFormData: (data: any) => void;
  resetFormData: () => void;
}

const ObservationContext = createContext<ObservationContextType | undefined>(undefined);

export function ObservationProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState({});

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetFormData = () => {
    setFormData({});
  };

  return (
    <ObservationContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </ObservationContext.Provider>
  );
}

export function useObservation() {
  const context = useContext(ObservationContext);
  if (context === undefined) {
    throw new Error('useObservation must be used within an ObservationProvider');
  }
  return context;
}