import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import { useClient } from '../contexts/ClientContext';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { clients } = useClient();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const deadlines = [
    {
      description: 'Envio eSocial - Folha de Pagamento',
      deadline: '2024-01-07',
      priority: 'high',
      clients: ['Empresa ABC Ltda', 'XYZ Comércio']
    },
    {
      description: 'Fechamento Folha Janeiro',
      deadline: '2024-01-31',
      priority: 'medium',
      clients: ['Todos os clientes']
    },
    {
      description: 'FGTS Competência 13º',
      deadline: '2024-01-07',
      priority: 'high',
      clients: ['Empresa ABC Ltda', 'XYZ Comércio', 'Tech Solutions SA']
    },
    {
      description: 'Declaração RAIS',
      deadline: '2024-01-15',
      priority: 'medium',
      clients: ['Todos os clientes']
    },
    {
      description: 'Entrega DIRF',
      deadline: '2024-01-25',
      priority: 'high',
      clients: ['Empresa ABC Ltda', 'Tech Solutions SA']
    }
  ];

  const generateEsocialData = () => {
    const sampleClients = [
      {
        id: 1,
        company_name: 'Empresa ABC Ltda',
        employees_count: 45,
        status: 'active'
      },
      {
        id: 2,
        company_name: 'XYZ Comércio',
        employees_count: 28,
        status: 'active'
      },
      {
        id: 3,
        company_name: 'Tech Solutions SA',
        employees_count: 67,
        status: 'active'
      },
      {
        id: 4,
        company_name: 'Indústria Nacional Ltda',
        employees_count: 120,
        status: 'active'
      },
      {
        id: 5,
        company_name: 'Serviços Gerais ME',
        employees_count: 15,
        status: 'active'
      }
    ];

    return sampleClients.map(client => {
      const months = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        let status;
        let events = [];
        
        // Definindo diferentes padrões por empresa
        switch(client.id) {
          case 1: // Empresa ABC Ltda - Empresa com eventos regulares
            if (month <= 11) {
              status = 'closed';
              events = [
                { id: 'S-1200', name: 'Remuneração', status: 'completed', date: `2023-${month.toString().padStart(2, '0')}-05` },
                { id: 'S-1210', name: 'Pagamento', status: 'completed', date: `2023-${month.toString().padStart(2, '0')}-05` }
              ];
            } else if (month === 12) {
              status = 'pending_closure';
              events = [
                { id: 'S-1200', name: 'Remuneração', status: 'completed', date: '2023-12-05' },
                { id: 'S-1210', name: 'Pagamento', status: 'completed', date: '2023-12-05' },
                { id: 'S-1299', name: 'Fechamento', status: 'pending', date: null }
              ];
            }
            break;
            
          case 2: // XYZ Comércio - Empresa com alguns atrasos
            if (month <= 10) {
              status = 'closed';
              events = [
                { id: 'S-1200', name: 'Remuneração', status: 'completed', date: `2023-${month.toString().padStart(2, '0')}-07` },
                { id: 'S-1210', name: 'Pagamento', status: 'completed', date: `2023-${month.toString().padStart(2, '0')}-07` }
              ];
            } else if (month === 11) {
              status = 'missing_events';
              events = [
                { id: 'S-1200', name: 'Remuneração', status: 'pending', date: null },
                { id: 'S-1210', name: 'Pagamento', status: 'pending', date: null }
              ];
            } else {
              status = 'future';
              events = [];
            }
            break;
            
          case 3: // Tech Solutions SA - Empresa com muitas movimentações
            if (month <= 11) {
              status = 'closed';
              events = [
                { id: 'S-1200', name: 'Remuneração', status: 'completed', date: `2023-${month.toString().padStart(2, '0')}-05` },
                { id: 'S-1210', name: 'Pagamento', status: 'completed', date: `2023-${month.toString().padStart(2, '0')}-05` },
                { id: 'S-2200', name: 'Admissão', status: 'completed', date: `2023-${month.toString().padStart(2, '0')}-02` },
                { id: 'S-2299', name: 'Desligamento', status: 'completed', date: `2023-${month.toString().padStart(2, '0')}-15` }
              ];
            } else {
              status = 'missing_events';
              events = [
                { id: 'S-1200', name: 'Remuneração', status: 'pending', date: null },
                { id: 'S-1210', name: 'Pagamento', status: 'pending', date: null },
                { id: 'S-2200', name: 'Admissão', status: 'completed', date: '2023-12-02' }
              ];
            }
            break;
            
          case 4: // Indústria Nacional Ltda - Empresa grande com eventos complexos
            if (month <= 10) {
              status = 'closed';
              events = [
                { id: 'S-1200', name: 'Remuneração', status: 'completed', date: `2023-${month.toString().padStart(2, '0')}-05` },
                { id: 'S-1210', name: 'Pagamento', status: 'completed', date: `2023-${month.toString().padStart(2, '0')}-05` },
                { id: 'S-2206', name: 'Alteração Contratual', status: 'completed', date: `2023-${month.toString().padStart(2, '0')}-10` }
              ];
            } else if (month === 11) {
              status = 'pending_closure';
              events = [
                { id: 'S-1200', name: 'Remuneração', status: 'completed', date: '2023-11-05' },
                { id: 'S-1210', name: 'Pagamento', status: 'completed', date: '2023-11-05' },
                { id: 'S-1299', name: 'Fechamento', status: 'pending', date: null }
              ];
            } else {
              status = 'missing_events';
              events = [
                { id: 'S-1200', name: 'Remuneração', status: 'pending', date: null },
                { id: 'S-1210', name: 'Pagamento', status: 'pending', date: null }
              ];
            }
            break;
            
          case 5: // Serviços Gerais ME - Empresa pequena com eventos simples
            if (month <= 11) {
              status = 'closed';
              events = [
                { id: 'S-1200', name: 'Remuneração', status: 'completed', date: `2023-${month.toString().padStart(2, '0')}-05` },
                { id: 'S-1210', name: 'Pagamento', status: 'completed', date: `2023-${month.toString().padStart(2, '0')}-05` }
              ];
            } else {
              status = 'pending_closure';
              events = [
                { id: 'S-1200', name: 'Remuneração', status: 'completed', date: '2023-12-05' },
                { id: 'S-1210', name: 'Pagamento', status: 'completed', date: '2023-12-05' },
                { id: 'S-1299', name: 'Fechamento', status: 'pending', date: null }
              ];
            }
            break;
        }

        return {
          competency: month,
          status,
          events
        };
      });

      return {
        id: client.id,
        company_name: client.company_name,
        employees_count: client.employees_count,
        data: {
          [currentYear]: months
        }
      };
    });
  };

  const esocialData = generateEsocialData();

  const summaryData = {
    totalClients: esocialData.length,
    totalEmployees: esocialData.reduce((total, client) => total + client.employees_count, 0),
    pendingTasks: esocialData.reduce((total, client) => {
      const pendingMonths = client.data[currentYear].filter(status => 
        status.status === 'missing_events' || status.status === 'pending_closure'
      ).length || 0;
      return total + pendingMonths;
    }, 0),
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'closed':
        return theme.palette.success.main;
      case 'pending_closure':
        return theme.palette.warning.main;
      case 'missing_events':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'closed':
        return 'Entregue/Fechada';
      case 'pending_closure':
        return 'Pendente Fechamento';
      case 'missing_events':
        return 'Falta Eventos';
      default:
        return 'Status Desconhecido';
    }
  };

  const getStatusTooltip = (data) => {
    if (data.status === 'missing_events' && data.events.length > 0) {
      return `Eventos Pendentes:\n${data.events.map(event => `${event.id} - ${event.name}`).join('\n')}`;
    }
    return getStatusLabel(data.status);
  };

  const handleYearChange = (event, newValue) => {
    setSelectedYear(newValue);
  };

  const EsocialStatusCard = ({ clientData }) => {
    const yearData = clientData.data[selectedYear] || [];

    return (
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="subtitle1" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: 500
          }}
        >
          {clientData.company_name}
        </Typography>
        <Grid container spacing={1}>
          {yearData.map((competencyData) => (
            <Grid item xs={1} key={competencyData.competency}>
              <Tooltip title={getStatusTooltip(competencyData)} arrow>
                <Box
                  sx={{
                    bgcolor: getStatusColor(competencyData.status),
                    p: { xs: 0.5, sm: 1 },
                    textAlign: 'center',
                    color: 'white',
                    borderRadius: 1,
                    cursor: 'pointer',
                    minHeight: { xs: '24px', sm: '32px' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      opacity: 0.9,
                    },
                  }}
                >
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }
                    }}
                  >
                    {String(competencyData.competency).padStart(2, '0')}
                    {competencyData.status === 'missing_events' && (
                      <Box 
                        component="span" 
                        sx={{ 
                          ml: 0.5,
                          fontSize: { xs: '0.6rem', sm: '0.7rem' }
                        }}
                      >
                        ({competencyData.events.length})
                      </Box>
                    )}
                  </Typography>
                </Box>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        p: { xs: 1, sm: 2, md: 3 },
        height: '100%',
        overflow: 'auto'
      }}
    >
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} sx={{ height: '100%' }}>
        <Grid item xs={12}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
          >
            Dashboard
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ 
            p: { xs: 1, sm: 2 },
            height: '100%',
            overflow: 'auto'
          }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
            >
              Status eSocial por Empresa
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Tabs
                value={selectedYear}
                onChange={handleYearChange}
                variant="scrollable"
                scrollButtons={isMobile ? "auto" : false}
                aria-label="year tabs"
                sx={{ 
                  mb: 2,
                  borderBottom: 1,
                  borderColor: 'divider',
                  '& .MuiTab-root': {
                    minWidth: { xs: '80px', sm: 'auto' },
                    px: { xs: 1, sm: 3 },
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }
                }}
              >
                <Tab label={currentYear} value={currentYear} />
                <Tab label={currentYear - 1} value={currentYear - 1} />
              </Tabs>

              <Box sx={{ 
                mt: 2,
                overflow: 'auto',
                maxHeight: { xs: 'calc(100vh - 400px)', sm: 'calc(100vh - 300px)' }
              }}>
                {esocialData.map((clientData) => (
                  <EsocialStatusCard key={clientData.id} clientData={clientData} />
                ))}
              </Box>

              <Box sx={{ 
                mt: 3,
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 1, sm: 2 }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: { xs: 12, sm: 16 }, 
                    height: { xs: 12, sm: 16 }, 
                    bgcolor: theme.palette.success.main, 
                    borderRadius: 1 
                  }} />
                  <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Entregue/Fechada
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: { xs: 12, sm: 16 }, 
                    height: { xs: 12, sm: 16 }, 
                    bgcolor: theme.palette.warning.main, 
                    borderRadius: 1 
                  }} />
                  <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Pendente Fechamento
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: { xs: 12, sm: 16 }, 
                    height: { xs: 12, sm: 16 }, 
                    bgcolor: theme.palette.error.main, 
                    borderRadius: 1 
                  }} />
                  <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Falta Eventos
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ 
            p: { xs: 1, sm: 2 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BusinessIcon 
                color="primary" 
                sx={{ mr: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }} 
              />
              <Typography 
                variant="h6" 
                sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
              >
                Total de Clientes
              </Typography>
            </Box>
            <Typography 
              variant="h4" 
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
            >
              {summaryData.totalClients}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ 
            p: { xs: 1, sm: 2 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GroupIcon 
                color="primary" 
                sx={{ mr: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }} 
              />
              <Typography 
                variant="h6" 
                sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
              >
                Total de Funcionários
              </Typography>
            </Box>
            <Typography 
              variant="h4" 
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
            >
              {summaryData.totalEmployees}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ 
            p: { xs: 1, sm: 2 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WarningIcon 
                color="error" 
                sx={{ mr: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }} 
              />
              <Typography 
                variant="h6" 
                sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
              >
                Pendências
              </Typography>
            </Box>
            <Typography 
              variant="h4" 
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
            >
              {summaryData.pendingTasks}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ 
            p: { xs: 1, sm: 2 },
            height: '100%',
            overflow: 'auto'
          }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
            >
              Prazos e Pendências
            </Typography>
            <List sx={{ maxHeight: { xs: '200px', sm: '300px' }, overflow: 'auto' }}>
              {deadlines.map((deadline, index) => (
                <ListItem 
                  key={index} 
                  divider={index < deadlines.length - 1}
                  sx={{ 
                    px: { xs: 1, sm: 2 },
                    py: { xs: 1, sm: 1.5 }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        {deadline.description}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        Vencimento: {deadline.deadline}
                      </Typography>
                    }
                  />
                  <Chip
                    label={
                      deadline.priority === 'high' ? 'Urgente' :
                      deadline.priority === 'medium' ? 'Importante' :
                      'Normal'
                    }
                    color={
                      deadline.priority === 'high' ? 'error' :
                      deadline.priority === 'medium' ? 'warning' :
                      'success'
                    }
                    size={isMobile ? "small" : "medium"}
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      height: { xs: '24px', sm: '32px' }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
