import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Paper,
  Typography,
  useTheme,
  Button,
  ButtonGroup,
  Tooltip
} from '@mui/material';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

const ESOCIAL_STATUS = {
  CLOSED: 'closed',
  PENDING_CLOSURE: 'pending_closure',
  MISSING_EVENTS: 'missing_events'
};

const CompetencyTabs = ({ data, onCompetencyChange }) => {
  const theme = useTheme();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [view, setView] = useState('monthly'); // 'monthly' ou '13th'

  const handleMonthChange = (event, newValue) => {
    setSelectedMonth(newValue);
    onCompetencyChange(newValue, selectedYear, view);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    onCompetencyChange(selectedMonth, event.target.value, view);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    onCompetencyChange(selectedMonth, selectedYear, newView);
  };

  const getCompetencyStatus = (month) => {
    const isSmallBusiness = data?.company_name === "Café & Sabor Comercial";
    
    if (isSmallBusiness) {
      if (month <= 10) return { status: ESOCIAL_STATUS.CLOSED };
      if (month === 11) return { status: ESOCIAL_STATUS.PENDING_CLOSURE };
      return { 
        status: ESOCIAL_STATUS.MISSING_EVENTS,
        missingEvents: ['S-2200 - Admissão', 'S-1200 - Remuneração']
      };
    } else {
      if (month <= 9) return { status: ESOCIAL_STATUS.CLOSED };
      if (month === 10) return { status: ESOCIAL_STATUS.PENDING_CLOSURE };
      return { 
        status: ESOCIAL_STATUS.MISSING_EVENTS,
        missingEvents: ['S-1200 - Remuneração', 'S-1210 - Pagamento']
      };
    }
  };

  const getStatusTooltip = (statusObj) => {
    switch (statusObj.status) {
      case ESOCIAL_STATUS.CLOSED:
        return 'Competência fechada';
      case ESOCIAL_STATUS.PENDING_CLOSURE:
        return 'Pendente fechamento';
      case ESOCIAL_STATUS.MISSING_EVENTS:
        return statusObj.missingEvents ? 
          `Eventos faltantes:\n${statusObj.missingEvents.join('\n')}` :
          'Falta envio de eventos';
      default:
        return 'Status desconhecido';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case ESOCIAL_STATUS.CLOSED:
        return theme.palette.success.main;
      case ESOCIAL_STATUS.PENDING_CLOSURE:
        return theme.palette.warning.main;
      case ESOCIAL_STATUS.MISSING_EVENTS:
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const get13thStatusObject = (status) => ({
    status,
    missingEvents: status === ESOCIAL_STATUS.MISSING_EVENTS ? 
      ['S-1200 - Remuneração 13º', 'S-1210 - Pagamento 13º'] : 
      undefined
  });

  // Calcula os totais do mês ou 13º
  const monthData = view === 'monthly' 
    ? data?.months?.[selectedMonth] 
    : data?.thirteenth_salary?.[selectedMonth < 11 ? 0 : 1] || {
      totalPayroll: 0,
      taxes: {
        inss: 0,
        fgts: 0,
        irrf: 0
      }
    };

  // Calcula valores específicos do 13º
  const calculate13thValues = () => {
    const firstInstallment = data?.thirteenth_salary?.[0] || {
      totalPayroll: 0,
      taxes: { fgts: 0, inss: 0, irrf: 0 }
    };
    const secondInstallment = data?.thirteenth_salary?.[1] || {
      totalPayroll: 0,
      taxes: { fgts: 0, inss: 0, irrf: 0 }
    };

    if (selectedMonth < 11) {
      // Primeira parcela: 50% do salário + FGTS
      return {
        totalPayroll: firstInstallment.totalPayroll,
        taxes: {
          fgts: firstInstallment.totalPayroll * 0.08, // 8% FGTS
          inss: 0, // Sem INSS na primeira parcela
          irrf: 0  // Sem IRRF na primeira parcela
        }
      };
    } else {
      // Segunda parcela: 50% restante - descontos
      return {
        totalPayroll: secondInstallment.totalPayroll - firstInstallment.totalPayroll,
        taxes: {
          fgts: secondInstallment.totalPayroll * 0.08, // 8% FGTS
          inss: secondInstallment.taxes.inss, // INSS total
          irrf: secondInstallment.taxes.irrf  // IRRF total
        }
      };
    }
  };

  const displayData = view === '13th' ? calculate13thValues() : monthData;

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <FormControl size="small">
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              sx={{ minWidth: 100 }}
            >
              {years.map(year => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <ButtonGroup variant="outlined" size="small">
            <Button
              onClick={() => handleViewChange('monthly')}
              variant={view === 'monthly' ? 'contained' : 'outlined'}
            >
              Mensal
            </Button>
            <Button
              onClick={() => handleViewChange('13th')}
              variant={view === '13th' ? 'contained' : 'outlined'}
            >
              13º Salário
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      {view === 'monthly' ? (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={selectedMonth}
            onChange={handleMonthChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-scrollButtons.Mui-disabled': {
                opacity: 0.3,
              },
            }}
          >
            {months.map((month, index) => {
              const statusObj = getCompetencyStatus(index + 1);
              return (
                <Tab
                  key={month}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Tooltip 
                        title={getStatusTooltip(statusObj)} 
                        arrow 
                        placement="top"
                        componentsProps={{
                          tooltip: {
                            sx: {
                              whiteSpace: 'pre-line',
                              maxWidth: 'none',
                              bgcolor: statusObj.status === ESOCIAL_STATUS.MISSING_EVENTS ? 
                                theme.palette.error.dark : undefined
                            }
                          }
                        }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: getStatusColor(statusObj.status),
                          }}
                        />
                      </Tooltip>
                      {month}
                    </Box>
                  }
                  value={index}
                  sx={{
                    minWidth: 'auto',
                    px: 2,
                    '&.Mui-selected': {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              );
            })}
          </Tabs>
        </Box>
      ) : (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={selectedMonth < 11 ? 0 : 1}
            onChange={(e, value) => setSelectedMonth(value === 0 ? 10 : 11)}
            variant="standard"
            sx={{
              '& .MuiTabs-scrollButtons.Mui-disabled': {
                opacity: 0.3,
              },
            }}
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tooltip 
                    title={getStatusTooltip(get13thStatusObject(ESOCIAL_STATUS.PENDING_CLOSURE))} 
                    arrow
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: getStatusColor(ESOCIAL_STATUS.PENDING_CLOSURE),
                      }}
                    />
                  </Tooltip>
                  1ª Parcela (Novembro)
                </Box>
              }
              value={0}
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tooltip 
                    title={getStatusTooltip(get13thStatusObject(ESOCIAL_STATUS.MISSING_EVENTS))} 
                    arrow
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: getStatusColor(ESOCIAL_STATUS.MISSING_EVENTS),
                      }}
                    />
                  </Tooltip>
                  2ª Parcela (Dezembro)
                </Box>
              }
              value={1}
            />
          </Tabs>
        </Box>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {view === 'monthly' 
                ? `Folha de Pagamento - ${months[selectedMonth]}/${selectedYear}`
                : `13º Salário - ${selectedMonth < 11 ? '1ª Parcela' : '2ª Parcela'}/${selectedYear}`}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  {view === '13th' && selectedMonth >= 11 ? 'Valor Final (com descontos)' : 'Total da Folha'}
                </Typography>
                <Typography variant="h5">
                  R$ {displayData.totalPayroll.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Typography>
                {view === '13th' && selectedMonth >= 11 && (
                  <Typography variant="caption" color="text.secondary">
                    Valor deduzido da 1ª parcela
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Impostos e Encargos
            </Typography>
            <Grid container spacing={2}>
              {(view !== '13th' || selectedMonth >= 11) && (
                <Grid item xs={4}>
                  <Typography variant="subtitle2">INSS</Typography>
                  <Typography variant="h6" color="error.main">
                    R$ {displayData.taxes.inss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography variant="subtitle2">FGTS</Typography>
                <Typography variant="h6" color="warning.main">
                  R$ {displayData.taxes.fgts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Typography>
                {view === '13th' && selectedMonth < 11 && (
                  <Typography variant="caption" color="text.secondary">
                    8% sobre a 1ª parcela
                  </Typography>
                )}
              </Grid>
              {(view !== '13th' || selectedMonth >= 11) && (
                <Grid item xs={4}>
                  <Typography variant="subtitle2">IRRF</Typography>
                  <Typography variant="h6" color="info.main">
                    R$ {displayData.taxes.irrf.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompetencyTabs;
