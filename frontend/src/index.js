import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './index.css';
import App from './App';
import { ClientProvider } from './context/ClientContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ClientProvider>
          <CssBaseline />
          <App />
        </ClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
