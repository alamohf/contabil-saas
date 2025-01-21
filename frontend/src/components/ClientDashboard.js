import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  Divider,
  Tooltip,
  useTheme,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import { useClient } from '../context/ClientContext';
import CompetencyTabs from './CompetencyTabs';

const generateMonthlyData = (baseValue, variation = 0.1) => {
  return Array.from({ length: 12 }, (_, i) => {
    const monthValue = baseValue * (1 + (Math.random() * 2 - 1) * variation);
    return {
      totalPayroll: monthValue,
      taxes: {
        inss: monthValue * 0.20, // 20% INSS
        fgts: monthValue * 0.08, // 8% FGTS
        irrf: monthValue * 0.15, // 15% IRRF (exemplo)
      }
    };
  });
};

const generateThirteenthData = (baseValue) => {
  return [
    {
      // Primeira parcela (50% sem impostos)
      totalPayroll: baseValue * 0.5,
      taxes: {
        inss: 0,
        fgts: 0,
        irrf: 0
      }
    },
    {
      // Segunda parcela (50% com impostos)
      totalPayroll: baseValue * 0.5,
      taxes: {
        inss: baseValue * 0.5 * 0.20, // 20% INSS
        fgts: baseValue * 0.08, // 8% FGTS (sobre o total)
        irrf: baseValue * 0.5 * 0.15, // 15% IRRF
      }
    }
  ];
};

const ClientDashboard = () => {
  console.log('ClientDashboard renderizado');
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompetency, setSelectedCompetency] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    view: 'monthly'
  });
  const { setSelectedClient, clients } = useClient();

  useEffect(() => {
    console.log('ClientDashboard useEffect - id:', id);
    const fetchClientData = () => {
      console.log('Iniciando fetchClientData');
      console.log('clients:', clients);
      
      if (!clients || clients.length === 0) {
        console.log('Sem clientes disponíveis');
        setError('Nenhum cliente disponível');
        setLoading(false);
        return;
      }

      const foundClient = clients.find(c => c.id === Number(id));
      
      if (!foundClient) {
        console.log('Cliente não encontrado:', id);
        console.log('Clientes disponíveis:', clients);
        setError('Cliente não encontrado');
        setLoading(false);
        return;
      }

      console.log('Cliente encontrado:', foundClient);
      
      // Define o valor base da folha baseado no cliente
      const basePayroll = foundClient.company_name === "Café & Sabor Comercial"
        ? 15000.00 // 7 funcionários com média de ~R$2.142 cada
        : 85000.00; // Outros clientes mantêm o valor original
      
      // Gera dados mensais mockados
      const monthlyData = generateMonthlyData(basePayroll);
      
      // Gera dados do 13º salário
      const thirteenthData = generateThirteenthData(basePayroll);
      
      // Adiciona dados mock específicos para cada cliente
      const mockData = {
        ...foundClient,
        address: foundClient.company_name === "Café & Sabor Comercial"
          ? "Rua do Café, 123 - Centro/SP"
          : "Av. Tecnologia, 1000 - São Paulo/SP",
        contact: {
          email: foundClient.company_name === "Café & Sabor Comercial"
            ? "contato@cafesabor.com.br"
            : "contato@empresa.com",
          phone: foundClient.company_name === "Café & Sabor Comercial"
            ? "(11) 5555-6666"
            : "(11) 3333-4444",
          responsible: foundClient.company_name === "Café & Sabor Comercial"
            ? "Maria Café"
            : "João Silva",
        },
        quick_info: {
          employees_count: foundClient.company_name === "Café & Sabor Comercial" ? 7 : 25,
          active_certifications: foundClient.company_name === "Café & Sabor Comercial"
            ? ["Selo Alimento Seguro", "ISO 22000"]
            : ["ISO 9001", "ISO 27001"],
          tax_regime: foundClient.regime,
          payroll: {
            current: basePayroll,
            previous: basePayroll * 0.97,
            variation: 3.66
          }
        },
        months: monthlyData,
        thirteenth_salary: thirteenthData,
        upcoming_deadlines: foundClient.company_name === "Café & Sabor Comercial"
          ? [
              { date: '2023-12-20', description: 'Envio DCTF', type: 'urgent' },
              { date: '2023-12-25', description: 'Fechamento Folha', type: 'normal' },
              { date: '2023-12-28', description: 'Alvará Vigilância Sanitária', type: 'urgent' },
            ]
          : [
              { date: '2023-12-20', description: 'Envio DCTF', type: 'urgent' },
              { date: '2023-12-25', description: 'Fechamento Folha', type: 'normal' },
              { date: '2023-12-31', description: 'Inventário Anual', type: 'normal' },
            ],
        employees: {
          departments: foundClient.company_name === "Café & Sabor Comercial"
            ? [
                { name: 'Cozinha', count: 3 },
                { name: 'Atendimento', count: 3 },
                { name: 'Administrativo', count: 1 },
              ]
            : [
                { name: 'TI', count: 10 },
                { name: 'Administrativo', count: 8 },
                { name: 'Comercial', count: 7 },
              ],
          recent_changes: foundClient.company_name === "Café & Sabor Comercial"
            ? [
                { type: 'Admissão', name: 'Pedro Costa', date: '2023-12-15', department: 'Cozinha' },
                { type: 'Férias', name: 'Ana Paula', date: '2023-12-20', department: 'Atendimento' },
                { type: 'Alteração Salarial', name: 'Carlos Eduardo', date: '2023-12-01', department: 'Administrativo' },
              ]
            : [
                { type: 'Admissão', name: 'Maria Silva', date: '2023-12-15', department: 'TI' },
                { type: 'Férias', name: 'José Santos', date: '2023-12-20', department: 'Comercial' },
                { type: 'Alteração Salarial', name: 'Ana Oliveira', date: '2023-12-01', department: 'Administrativo' },
              ],
        },
        annual_summary: {
          total_payroll: basePayroll * 13, // 12 meses + 13º
          total_taxes: {
            inss: (basePayroll * 12 * 0.20) + (basePayroll * 0.5 * 0.20), // 12 meses + 2ª parcela do 13º
            fgts: (basePayroll * 12 * 0.08) + (basePayroll * 0.08), // 12 meses + 13º completo
            irrf: (basePayroll * 12 * 0.15) + (basePayroll * 0.5 * 0.15), // 12 meses + 2ª parcela do 13º
          }
        }
      };

      console.log('Dados mockados:', mockData);
      setClient(mockData);
      setSelectedClient(mockData);
      setLoading(false);
    };

    fetchClientData();
  }, [id, setSelectedClient, clients]);

  const handleCompetencyChange = (month, year, view) => {
    setSelectedCompetency({ month, year, view });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!client) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Nenhum dado do cliente disponível.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Cabeçalho */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              {client.company_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {client.address}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Contato
              </Typography>
              <Typography variant="body2">
                Responsável: {client.contact.responsible}
              </Typography>
              <Typography variant="body2">
                Email: {client.contact.email}
              </Typography>
              <Typography variant="body2">
                Telefone: {client.contact.phone}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Informações Rápidas */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Informações Gerais
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Funcionários</Typography>
                <Typography variant="h6">{client.quick_info.employees_count}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Regime Tributário</Typography>
                <Typography variant="h6">{client.quick_info.tax_regime}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Certificações Ativas</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {client.quick_info.active_certifications.map((cert, index) => (
                    <Chip key={index} label={cert} size="small" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Prazos e Pendências */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Prazos e Pendências
            </Typography>
            <List>
              {client.upcoming_deadlines.map((deadline, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={deadline.description}
                      secondary={`Vencimento: ${deadline.date}`}
                      primaryTypographyProps={{
                        color: deadline.type === 'urgent' ? 'error' : 'inherit',
                      }}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Competency Tabs */}
        <Grid item xs={12}>
          <CompetencyTabs
            data={client}
            onCompetencyChange={handleCompetencyChange}
          />
        </Grid>

        {/* Departamentos */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Departamentos
            </Typography>
            <List>
              {client.employees.departments.map((dept, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={dept.name}
                      secondary={`${dept.count} funcionários`}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Alterações Recentes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Alterações Recentes
            </Typography>
            <List>
              {client.employees.recent_changes.map((change, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={`${change.type} - ${change.name}`}
                      secondary={`${change.date} - ${change.department}`}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientDashboard;
