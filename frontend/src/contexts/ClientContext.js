import React, { createContext, useContext, useState } from 'react';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  // Dados mockados para teste
  const [clients] = useState([
    {
      id: 1,
      company_name: 'Tech Solutions',
      employees_count: 45,
      esocial_status: Array(12).fill({ status: 'closed' })
    },
    {
      id: 2,
      company_name: 'Café & Sabor Comercial',
      employees_count: 15,
      esocial_status: Array(12).fill({ status: 'closed' })
    },
    {
      id: 3,
      company_name: 'Construtora Silva',
      employees_count: 78,
      esocial_status: Array(12).fill({ status: 'closed' })
    },
    {
      id: 4,
      company_name: 'Mercado Central',
      employees_count: 32,
      esocial_status: Array(12).fill({ status: 'closed' })
    },
    {
      id: 5,
      company_name: 'Farmácia Saúde',
      employees_count: 12,
      esocial_status: Array(12).fill({ status: 'closed' })
    }
  ]);

  return (
    <ClientContext.Provider value={{ clients }}>
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
