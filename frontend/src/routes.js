import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ESocialEvents from './components/ESocialEvents';
import ClientsDetails from './components/ClientsDetails';
import EmployeesList from './components/EmployeesList';
import ClientDashboard from './components/ClientDashboard';
import ClientsFinancial from './components/ClientsFinancial';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/esocial" element={<ESocialEvents />} />
      <Route path="/clients/:id" element={<ClientsDetails />} />
      <Route path="/clients/:id/employees" element={<EmployeesList />} />
      <Route path="/clients/:id/dashboard" element={<ClientDashboard />} />
      <Route path="/clients/:id/financial" element={<ClientsFinancial />} />
    </Routes>
  );
};

export default AppRoutes;
