import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AadharData {
  name: string;
  aadharNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  photo: string;
  age: number;
}

interface Verification {
  id: string;
  timestamp: Date;
  status: 'verified' | 'failed' | 'pending';
  aadharData: AadharData;
  processingTime: number;
}

interface VerificationContextType {
  verifications: Verification[];
  addVerification: (verification: Verification) => void;
  clearVerifications: () => void;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
};

interface VerificationProviderProps {
  children: ReactNode;
}

export const VerificationProvider: React.FC<VerificationProviderProps> = ({ children }) => {
  const [verifications, setVerifications] = useState<Verification[]>([]);

  const addVerification = (verification: Verification) => {
    setVerifications(prev => [...prev, verification]);
  };

  const clearVerifications = () => {
    setVerifications([]);
  };

  return (
    <VerificationContext.Provider value={{
      verifications,
      addVerification,
      clearVerifications
    }}>
      {children}
    </VerificationContext.Provider>
  );
};