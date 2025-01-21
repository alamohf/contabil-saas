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
import QRCode from 'qrcode.react';
import axios from 'axios';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [openPix, setOpenPix] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [pixCode, setPixCode] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/clients/');
        setClients(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClients();
  }, []);

  const handleGeneratePix = async (client) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/clients/${client.id}/pix`);
      setPixCode(response.data.pix_code);
      setSelectedClient(client);
      setOpenPix(true);
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
        Clientes
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

      <Dialog open={openPix} onClose={() => setOpenPix(false)}>
        <DialogTitle>
          PIX para {selectedClient?.company_name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <QRCode value={pixCode} size={256} />
            <Typography variant="body2" color="text.secondary">
              Valor: {selectedClient && formatCurrency(selectedClient.monthly_fee)}
            </Typography>
            <Typography variant="caption" sx={{ mt: 1 }}>
              Código PIX:
            </Typography>
            <Paper
              sx={{
                p: 1,
                backgroundColor: '#f5f5f5',
                width: '100%',
                wordBreak: 'break-all',
              }}
            >
              <Typography variant="body2">{pixCode}</Typography>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPix(false)}>Fechar</Button>
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

export default ClientsList;
