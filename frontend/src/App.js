import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ClientProvider } from './contexts/ClientContext';
import theme from './theme';
import AppRoutes from './routes';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClientProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </ClientProvider>
    </ThemeProvider>
  );
}

export default App;
