import React, { createContext, useContext, useState, useEffect } from 'react';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients] = useState([
    { 
      id: 1, 
      company_name: 'Tech Solutions Ltda',
      cnpj: '12.345.678/0001-90',
      regime: 'Simples Nacional'
    },
    { 
      id: 2, 
      company_name: 'Mercado Central',
      cnpj: '23.456.789/0001-01',
      regime: 'Lucro Presumido'
    },
    { 
      id: 3, 
      company_name: 'Construtora Silva',
      cnpj: '34.567.890/0001-12',
      regime: 'Lucro Real'
    },
    { 
      id: 4, 
      company_name: 'Café & Sabor Comercial',
      cnpj: '45.678.901/0001-23',
      regime: 'Simples Nacional'
    }
  ]);

  useEffect(() => {
    console.log('ClientContext initialized');
    console.log('Available clients:', clients);
  }, [clients]);

  const value = {
    selectedClient,
    setSelectedClient,
    clients
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};
