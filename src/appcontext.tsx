
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from "react";

const AppContext = createContext(null);
interface AppProviderProps {
    children: ReactNode
}
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }:AppProviderProps) => {
  const [activeTab, setActiveTab] = useState('new');
  const [activeBorrowerId, setActiveBorrowerId] = useState('1');

  const contextValue = {
    activeTab,
    setActiveTab,
    activeBorrowerId,
    setActiveBorrowerId
  };
  

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;