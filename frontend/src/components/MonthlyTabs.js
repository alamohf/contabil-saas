import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Button,
  IconButton,
  Collapse,
  TextField,
  MenuItem,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  LinearProgress,
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Add as AddIcon,
  Upload as UploadIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
  CalendarToday as CalendarTodayIcon,
} from '@mui/icons-material';
import ChangeHistory from './ChangeHistory';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Gera uma lista de anos (5 anos para trás e 1 ano para frente)
const getYearsList = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 1; i++) {
    years.push(i);
  }
  return years;
};

const MonthlyTabs = ({ clientData }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [expandedSection, setExpandedSection] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', type: '' });

  const handleChange = (event, newValue) => {
    setCurrentMonth(newValue);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleActionClick = (type, title) => {
    setDialogContent({ type, title });
    setOpenDialog(true);
  };

  const getMonthStatus = (month, year) => {
    // Simulação de dados - substitua por dados reais da API
    return {
      folha: {
        status: 'Pendente',
        date: '-',
        details: {
          funcionarios: {
            ativos: 5,
            admissoes: 1,
            demissoes: 0,
            ferias: 2
          },
          impostosFolha: {
            funcionario: {
              inss: 'R$ 550,00',
              fgts: 'R$ 400,00',
              ir: 'R$ 220,00'
            },
            empresa: {
              inss: 'R$ 1.100,00',
              fgts: 'R$ 400,00',
              outras_entidades: 'R$ 150,00'
            }
          },
          feriasVencidas: [
            {
              nome: 'João Silva',
              cargo: 'Desenvolvedor',
              vencimento: '15/01/2024',
              diasDisponiveis: 30
            },
            {
              nome: 'Maria Santos',
              cargo: 'Designer',
              vencimento: '20/02/2024',
              diasDisponiveis: 30
            }
          ],
          movimentacoes: {
            demissoes: [
              {
                nome: 'Pedro Oliveira',
                cargo: 'Analista',
                data: '31/01/2024',
                motivo: 'Pedido de demissão',
                status: 'Pendente'
              }
            ],
            ferias: [
              {
                nome: 'João Silva',
                inicio: '01/02/2024',
                fim: '30/02/2024',
                status: 'Agendada'
              }
            ]
          }
        },
        pendingActions: ['Validar cálculos', 'Aprovar férias'],
        changes: [
          {
            id: 3,
            type: 'warning',
            description: 'Férias vencidas',
            status: 'Pendente',
            date: '2024-01-15 09:00',
            time: '09:00',
            user: 'Sistema',
            details: 'João Silva - Férias vencem em 15/01/2024'
          },
          {
            id: 4,
            type: 'info',
            description: 'Férias agendadas',
            status: 'Processado',
            date: '2024-01-14 17:30',
            time: '17:30',
            user: 'Maria Santos',
            details: 'Férias agendadas para 01/02/2024'
          }
        ]
      },
      documentos: {
        status: 'Incompleto',
        date: '-',
        details: {
          recebidos: 15,
          pendentes: 5,
          tipos: ['Férias', 'Rescisão', 'Comprovantes'],
          categorias: {
            ferias: {
              total: 10,
              recebidos: 8,
              pendentes: 2
            },
            rescisao: {
              total: 5,
              recebidos: 3,
              pendentes: 2
            },
            comprovantes: {
              total: 5,
              recebidos: 4,
              pendentes: 1
            }
          },
          ultimosDocumentos: [
            { tipo: 'Aviso de Férias', data: '15/01/2024', status: 'Recebido' },
            { tipo: 'Rescisão', data: '14/01/2024', status: 'Pendente' },
            { tipo: 'Comprovante', data: '13/01/2024', status: 'Recebido' }
          ]
        },
        pendingActions: ['Upload de documentos', 'Validar documentos'],
        changes: [
          {
            id: 6,
            type: 'error',
            description: 'Documentos pendentes',
            status: 'Atrasado',
            date: '2024-01-14 15:00',
            time: '15:00',
            user: 'Sistema',
            details: 'Documentos de rescisão pendentes'
          },
          {
            id: 7,
            type: 'success',
            description: 'Aviso de férias recebido',
            status: 'Processado',
            date: '2024-01-14 10:30',
            time: '10:30',
            user: 'Ana Silva',
            details: 'Aviso de férias do funcionário João Silva'
          }
        ]
      }
    };
  };

  const getStatusColor = (status) => {
    const colors = {
      'Enviado': 'success',
      'Pendente': 'error',
      'Em Processamento': 'warning',
      'Incompleto': 'error',
      'Completo': 'success',
    };
    return colors[status] || 'default';
  };

  const monthStatus = getMonthStatus(currentMonth, selectedYear);

  const renderSectionDetails = (section, data) => {
    if (!data.details) return null;

    return (
      <Box>
        {/* Detalhes existentes */}
        {renderExistingDetails(section, data)}
        
        {/* Histórico de alterações */}
        {data.changes && data.changes.length > 0 && (
          <Box sx={{ mt: 2, px: 2 }}>
            <ChangeHistory changes={data.changes} />
          </Box>
        )}
      </Box>
    );
  };

  const renderExistingDetails = (section, data) => {
    switch (section) {
      case 'folha':
        return (
          <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Resumo da Folha:</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2">Informações Gerais</Typography>
                  <Typography variant="body2">Funcionários Ativos: {data.details.funcionarios.ativos}</Typography>
                  <Typography variant="body2">Admissões: {data.details.funcionarios.admissoes}</Typography>
                  <Typography variant="body2">Demissões: {data.details.funcionarios.demissoes}</Typography>
                  <Typography variant="body2">Em Férias: {data.details.funcionarios.ferias}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2">Impostos da Folha</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Funcionário:</Typography>
                    <Typography variant="body2">INSS: {data.details.impostosFolha.funcionario.inss}</Typography>
                    <Typography variant="body2">FGTS: {data.details.impostosFolha.funcionario.fgts}</Typography>
                    <Typography variant="body2">IR: {data.details.impostosFolha.funcionario.ir}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Empresa:</Typography>
                    <Typography variant="body2">INSS: {data.details.impostosFolha.empresa.inss}</Typography>
                    <Typography variant="body2">FGTS: {data.details.impostosFolha.empresa.fgts}</Typography>
                    <Typography variant="body2">Outras Entidades: {data.details.impostosFolha.empresa.outras_entidades}</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Férias Vencidas ou a Vencer</Typography>
                  <List dense>
                    {data.details.feriasVencidas.map((ferias, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={ferias.nome}
                          secondary={`${ferias.cargo} - Vence em ${ferias.vencimento}`}
                        />
                        <Chip
                          label={`${ferias.diasDisponiveis} dias`}
                          color="warning"
                          size="small"
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Movimentações do Mês</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Demissões:</Typography>
                    <List dense>
                      {data.details.movimentacoes.demissoes.map((demissao, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={demissao.nome}
                            secondary={`${demissao.cargo} - ${demissao.motivo}`}
                          />
                          <Chip
                            label={demissao.status}
                            color={demissao.status === 'Pendente' ? 'warning' : 'success'}
                            size="small"
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Férias:</Typography>
                    <List dense>
                      {data.details.movimentacoes.ferias.map((ferias, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={ferias.nome}
                            secondary={`${ferias.inicio} até ${ferias.fim}`}
                          />
                          <Chip
                            label={ferias.status}
                            color={ferias.status === 'Agendada' ? 'info' : 'success'}
                            size="small"
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );

      case 'documentos':
        return (
          <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Status dos Documentos</Typography>
                  <Grid container spacing={2}>
                    {Object.entries(data.details.categorias).map(([categoria, info]) => (
                      <Grid item xs={12} md={4} key={categoria}>
                        <Box>
                          <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                            {categoria.replace(/([A-Z])/g, ' $1').trim()}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={(info.recebidos / info.total) * 100}
                            sx={{ mt: 1, mb: 1 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {info.recebidos} de {info.total} recebidos
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Últimos Documentos</Typography>
                  <List dense>
                    {data.details.ultimosDocumentos.map((doc, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={doc.tipo}
                          secondary={doc.data}
                        />
                        <Chip
                          label={doc.status}
                          size="small"
                          color={doc.status === 'Recebido' ? 'success' : 'warning'}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  const renderActionButtons = (section, actions) => (
    <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 1 }}>
      {actions.map((action, index) => (
        <Button
          key={index}
          size="small"
          variant="outlined"
          startIcon={action.includes('Upload') ? <UploadIcon /> : <AddIcon />}
          onClick={() => handleActionClick(section, action)}
        >
          {action}
        </Button>
      ))}
    </Stack>
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Seletor de Ano e Mês */}
      <Paper sx={{ mb: 2, p: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <TextField
            select
            label="Ano"
            value={selectedYear}
            onChange={handleYearChange}
            sx={{ width: 100 }}
          >
            {getYearsList().map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="subtitle1">
            <CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            Competência Atual
          </Typography>
        </Stack>

        <Tabs
          value={currentMonth}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              minWidth: 100,
            },
          }}
        >
          {months.map((month, index) => (
            <Tab
              key={index}
              label={month}
              id={`month-tab-${index}`}
              aria-controls={`month-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Conteúdo das Seções */}
      <Paper sx={{ mt: 2 }}>
        <List>
          {Object.entries(monthStatus).map(([section, data], index) => (
            <React.Fragment key={section}>
              <ListItem
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                onClick={() => toggleSection(section)}
              >
                <ListItemText 
                  primary={
                    <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                      {section}
                    </Typography>
                  }
                  secondary={`Última atualização: ${data.date}`}
                />
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={data.status}
                    color={getStatusColor(data.status)}
                    size="small"
                  />
                  <IconButton size="small">
                    {expandedSection === section ? 
                      <KeyboardArrowUpIcon /> : 
                      <KeyboardArrowDownIcon />
                    }
                  </IconButton>
                </Stack>
              </ListItem>

              <Collapse in={expandedSection === section}>
                {renderSectionDetails(section, data)}
                {section === 'folha' && data.pendingActions.includes('Aprovar férias') && (
                  <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => handleActionClick(section, 'Aprovar férias')}
                    >
                      Aprovar férias
                    </Button>
                  </Stack>
                )}
                {section === 'documentos' && data.pendingActions.includes('Upload de documentos') && (
                  <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<UploadIcon />}
                      onClick={() => handleActionClick(section, 'Upload de documentos')}
                    >
                      Upload de documentos
                    </Button>
                  </Stack>
                )}
              </Collapse>

              {index < Object.entries(monthStatus).length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Diálogo de Ação */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{dialogContent.title}</DialogTitle>
        <DialogContent>
          {/* Aqui você pode adicionar o conteúdo específico para cada tipo de ação */}
          <Typography>
            Implementar ação: {dialogContent.title} para {dialogContent.type}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MonthlyTabs;
