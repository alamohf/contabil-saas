import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Link
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useClient } from '../context/ClientContext'; // Corrigindo o caminho da importação

const ClientsDetails = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openFeesDialog, setOpenFeesDialog] = useState(false);
  const { setSelectedClient: setGlobalSelectedClient } = useClient();
  const [editingFees, setEditingFees] = useState({
    monthly_fee: 0,
    additional_services: []
  });

  const [clients, setClients] = useState([
    {
      id: 1,
      company_name: "Tech Solutions Ltda",
      cnpj: "12.345.678/0001-01",
      segment: "Tecnologia",
      employees_count: 25,
      active_certificates: ["ISO 9001", "ISO 27001"],
      tax_regime: "Lucro Presumido",
      last_declaration: "2023-11-15",
      pending_documents: ["Folha de Pagamento Dezembro", "DCTF Novembro"],
      monthly_fee: 1500.00,
      additional_services: [
        { description: "Consultoria Tributária", value: 500.00 },
        { description: "Planejamento Fiscal", value: 300.00 }
      ]
    },
    {
      id: 2,
      company_name: "Café & Sabor Comercial",
      cnpj: "23.456.789/0001-02",
      segment: "Alimentação",
      employees_count: 12,
      active_certificates: ["Vigilância Sanitária"],
      tax_regime: "Simples Nacional",
      last_declaration: "2023-11-20",
      pending_documents: ["Inventário 2023"],
      monthly_fee: 900.00,
      additional_services: [
        { description: "Consultoria MEI", value: 200.00 }
      ]
    },
    {
      id: 3,
      company_name: "Construções Rápidas SA",
      cnpj: "34.567.890/0001-03",
      segment: "Construção Civil",
      employees_count: 45,
      active_certificates: ["ISO 14001", "PBQP-H"],
      tax_regime: "Lucro Real",
      last_declaration: "2023-11-10",
      pending_documents: ["GFIP Dezembro", "Certidão Municipal"],
      monthly_fee: 2100.00,
      additional_services: [
        { description: "Auditoria Contábil", value: 800.00 },
        { description: "Consultoria Trabalhista", value: 600.00 }
      ]
    },
    {
      id: 4,
      company_name: "Mercado Bom Preço",
      cnpj: "45.678.901/0001-04",
      segment: "Varejo",
      employees_count: 18,
      active_certificates: ["Vigilância Sanitária"],
      tax_regime: "Simples Nacional",
      last_declaration: "2023-11-18",
      pending_documents: ["Balanço 2023"],
      monthly_fee: 1200.00,
      additional_services: []
    },
    {
      id: 5,
      company_name: "Auto Peças Silva",
      cnpj: "56.789.012/0001-05",
      segment: "Autopeças",
      employees_count: 8,
      active_certificates: ["Certificação Inmetro"],
      tax_regime: "Simples Nacional",
      last_declaration: "2023-11-25",
      pending_documents: ["DAS Dezembro"],
      monthly_fee: 800.00,
      additional_services: [
        { description: "Regularização Fiscal", value: 300.00 }
      ]
    },
  ]);

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setGlobalSelectedClient(client);
    setOpenDialog(true);
  };

  const handleEditFees = (client) => {
    setSelectedClient(client);
    setEditingFees({
      monthly_fee: client.monthly_fee,
      additional_services: [...client.additional_services]
    });
    setOpenFeesDialog(true);
  };

  const handleSaveFees = () => {
    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        return {
          ...client,
          monthly_fee: editingFees.monthly_fee,
          additional_services: editingFees.additional_services
        };
      }
      return client;
    });
    setClients(updatedClients);
    setOpenFeesDialog(false);
  };

  const handleAddService = () => {
    setEditingFees(prev => ({
      ...prev,
      additional_services: [
        ...prev.additional_services,
        { description: '', value: 0 }
      ]
    }));
  };

  const handleRemoveService = (index) => {
    setEditingFees(prev => ({
      ...prev,
      additional_services: prev.additional_services.filter((_, i) => i !== index)
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calculateTotalFees = (client) => {
    const additionalTotal = client.additional_services.reduce((sum, service) => sum + service.value, 0);
    return client.monthly_fee + additionalTotal;
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
                  <TableCell>Segmento</TableCell>
                  <TableCell>Funcionários</TableCell>
                  <TableCell>Regime Tributário</TableCell>
                  <TableCell>Honorários</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.company_name}</TableCell>
                    <TableCell>{client.cnpj}</TableCell>
                    <TableCell>{client.segment}</TableCell>
                    <TableCell>{client.employees_count}</TableCell>
                    <TableCell>
                      <Chip
                        label={client.tax_regime}
                        color={client.tax_regime === 'Simples Nacional' ? 'success' : 'primary'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {formatCurrency(calculateTotalFees(client))}
                      <IconButton
                        size="small"
                        onClick={() => handleEditFees(client)}
                        sx={{ ml: 1 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleViewDetails(client)}
                        sx={{ mr: 1 }}
                      >
                        Detalhes
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        component={RouterLink}
                        to={`/client-dashboard/${client.id}`}
                        color="primary"
                      >
                        Dashboard
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Dialog de Detalhes do Cliente */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md">
        <DialogTitle>
          Detalhes do Cliente - {selectedClient?.company_name}
        </DialogTitle>
        <DialogContent>
          {selectedClient && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Informações Gerais
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">CNPJ</Typography>
                  <Typography variant="body1" gutterBottom>{selectedClient.cnpj}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Segmento</Typography>
                  <Typography variant="body1" gutterBottom>{selectedClient.segment}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Certificações Ativas</Typography>
                  <Box sx={{ mt: 1 }}>
                    {selectedClient.active_certificates.map((cert, index) => (
                      <Chip
                        key={index}
                        label={cert}
                        color="success"
                        size="small"
                        sx={{ mr: 1 }}
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Documentos Pendentes
                  </Typography>
                  <List dense>
                    {selectedClient.pending_documents.map((doc, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={doc} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Edição de Honorários */}
      <Dialog open={openFeesDialog} onClose={() => setOpenFeesDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Honorários - {selectedClient?.company_name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Mensalidade Base
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={editingFees.monthly_fee}
              onChange={(e) => setEditingFees(prev => ({
                ...prev,
                monthly_fee: parseFloat(e.target.value)
              }))}
              sx={{ mb: 3 }}
            />

            <Typography variant="subtitle2" gutterBottom>
              Serviços Adicionais
            </Typography>
            {editingFees.additional_services.map((service, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  label="Descrição"
                  value={service.description}
                  onChange={(e) => {
                    const newServices = [...editingFees.additional_services];
                    newServices[index].description = e.target.value;
                    setEditingFees(prev => ({
                      ...prev,
                      additional_services: newServices
                    }));
                  }}
                />
                <TextField
                  label="Valor"
                  type="number"
                  value={service.value}
                  onChange={(e) => {
                    const newServices = [...editingFees.additional_services];
                    newServices[index].value = parseFloat(e.target.value);
                    setEditingFees(prev => ({
                      ...prev,
                      additional_services: newServices
                    }));
                  }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveService(index)}
                >
                  Remover
                </Button>
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddService}
              sx={{ mt: 2 }}
            >
              Adicionar Serviço
            </Button>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Total: {formatCurrency(
                editingFees.monthly_fee +
                editingFees.additional_services.reduce((sum, service) => sum + service.value, 0)
              )}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFeesDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveFees} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientsDetails;
