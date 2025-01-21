import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import axios from 'axios';

const ClientsFinancial = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      company_name: "Tech Solutions Ltda",
      cnpj: "12.345.678/0001-01",
      monthly_fee: 1500.00,
      payment_day: 10,
      status: "active"
    },
    {
      id: 2,
      company_name: "Café & Sabor Comercial",
      cnpj: "23.456.789/0001-02",
      monthly_fee: 900.00,
      payment_day: 15,
      status: "active"
    },
    {
      id: 3,
      company_name: "Construções Rápidas SA",
      cnpj: "34.567.890/0001-03",
      monthly_fee: 2100.00,
      payment_day: 5,
      status: "active"
    },
    {
      id: 4,
      company_name: "Mercado Bom Preço",
      cnpj: "45.678.901/0001-04",
      monthly_fee: 1200.00,
      payment_day: 20,
      status: "active"
    },
    {
      id: 5,
      company_name: "Auto Peças Silva",
      cnpj: "56.789.012/0001-05",
      monthly_fee: 800.00,
      payment_day: 25,
      status: "active"
    }
  ]);
  const [openPixDialog, setOpenPixDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [pixCode, setPixCode] = useState('');

  const handleGeneratePix = async (client) => {
    try {
      // Simulando a geração do código PIX
      const pixCode = `00020126330014BR.GOV.BCB.PIX0111${client.cnpj}5204000053039865802BR5913${client.company_name}6008BRASILIA62070503***6304E2CA`;
      setPixCode(pixCode);
      setSelectedClient(client);
      setOpenPixDialog(true);
    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: '240px', width: 'calc(100% - 240px)' }}>
      <Typography variant="h4" gutterBottom>
        Financeiro - Clientes
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Empresa</TableCell>
                  <TableCell>CNPJ</TableCell>
                  <TableCell>Mensalidade</TableCell>
                  <TableCell>Dia Vencimento</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.company_name}</TableCell>
                    <TableCell>{client.cnpj}</TableCell>
                    <TableCell>{formatCurrency(client.monthly_fee)}</TableCell>
                    <TableCell>Dia {client.payment_day}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor: client.status === 'active' ? 'success.light' : 'error.light',
                          color: 'white',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          display: 'inline-block',
                        }}
                      >
                        {client.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleGeneratePix(client)}
                      >
                        Gerar PIX
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Dialog open={openPixDialog} onClose={() => setOpenPixDialog(false)}>
        <DialogTitle>
          Pagamento PIX - {selectedClient?.company_name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Valor: {selectedClient && formatCurrency(selectedClient.monthly_fee)}
            </Typography>
            <Box
              component="img"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${pixCode}`}
              alt="QR Code PIX"
              sx={{ mt: 2, mb: 2 }}
            />
            <Typography variant="subtitle2" gutterBottom>
              Código PIX Copia e Cola:
            </Typography>
            <Paper
              sx={{
                p: 1,
                backgroundColor: '#f5f5f5',
                wordBreak: 'break-all',
              }}
            >
              <Typography variant="body2">
                {pixCode}
              </Typography>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPixDialog(false)}>Fechar</Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(pixCode);
            }}
            color="primary"
          >
            Copiar Código
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientsFinancial;
