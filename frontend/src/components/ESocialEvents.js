import React from 'react';
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
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Alert,
  AlertTitle,
} from '@mui/material';

const ESocialEvents = () => {
  const events = [
    {
      id: 1,
      company: "Tech Solutions Ltda",
      event_type: "S-2200",
      description: "Admissão de Trabalhador",
      status: "success",
      date: "2023-12-15",
      details: "Admissão João Silva - Desenvolvedor Senior",
    },
    {
      id: 2,
      company: "Café & Sabor Comercial",
      event_type: "S-1200",
      description: "Remuneração do Trabalhador",
      status: "pending",
      date: "2023-12-16",
      details: "Folha de Pagamento Dezembro/2023",
    },
    {
      id: 3,
      company: "Construções Rápidas SA",
      event_type: "S-2299",
      description: "Desligamento",
      status: "success",
      date: "2023-12-14",
      details: "Desligamento Maria Santos - Engenheira",
    },
    {
      id: 4,
      company: "Mercado Bom Preço",
      event_type: "S-1210",
      description: "Pagamento de Rendimentos",
      status: "error",
      date: "2023-12-17",
      details: "Erro no processamento da folha",
    },
    {
      id: 5,
      company: "Auto Peças Silva",
      event_type: "S-2206",
      description: "Alteração Contratual",
      status: "success",
      date: "2023-12-15",
      details: "Alteração de cargo - Pedro Oliveira",
    },
  ];

  const statistics = {
    total: events.length,
    success: events.filter(e => e.status === 'success').length,
    pending: events.filter(e => e.status === 'pending').length,
    error: events.filter(e => e.status === 'error').length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'pending':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const deadlines = [
    {
      event: "S-1200",
      description: "Remuneração do Trabalhador",
      deadline: "Dia 07 do mês seguinte",
      status: "warning",
      daysLeft: 5,
      details: "Envio da folha de pagamento mensal",
    },
    {
      event: "S-2200",
      description: "Cadastramento Inicial/Admissão",
      deadline: "Dia anterior ao início das atividades",
      status: "info",
      daysLeft: null,
      details: "Cadastro de novos funcionários",
    },
    {
      event: "S-2299",
      description: "Desligamento",
      deadline: "Até 10 dias após o desligamento",
      status: "info",
      daysLeft: null,
      details: "Informar desligamentos de funcionários",
    },
    {
      event: "S-1210",
      description: "Pagamentos de Rendimentos",
      deadline: "Dia 07 do mês seguinte",
      status: "warning",
      daysLeft: 5,
      details: "Informar pagamentos realizados",
    },
  ];

  const upcomingDeadlines = [
    {
      company: "Tech Solutions Ltda",
      event: "S-1200",
      description: "Folha de Pagamento Dezembro/2023",
      deadline: "07/01/2024",
      daysLeft: 20,
      status: "upcoming"
    },
    {
      company: "Café & Sabor Comercial",
      event: "S-1200",
      description: "Folha de Pagamento Dezembro/2023",
      deadline: "07/01/2024",
      daysLeft: 20,
      status: "upcoming"
    },
    {
      company: "Construções Rápidas SA",
      event: "S-2299",
      description: "Desligamento Maria Santos",
      deadline: "24/12/2023",
      daysLeft: 2,
      status: "urgent"
    },
  ];

  const getAlertSeverity = (daysLeft) => {
    if (daysLeft <= 3) return 'error';
    if (daysLeft <= 7) return 'warning';
    return 'info';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: '240px', width: 'calc(100% - 240px)' }}>
      <Typography variant="h4" gutterBottom>
        eSocial - Eventos
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total de Eventos
              </Typography>
              <Typography variant="h5">
                {statistics.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: 'success.light' }}>
            <CardContent>
              <Typography color="white" gutterBottom>
                Processados
              </Typography>
              <Typography variant="h5" color="white">
                {statistics.success}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: 'warning.light' }}>
            <CardContent>
              <Typography color="white" gutterBottom>
                Pendentes
              </Typography>
              <Typography variant="h5" color="white">
                {statistics.pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: 'error.light' }}>
            <CardContent>
              <Typography color="white" gutterBottom>
                Erros
              </Typography>
              <Typography variant="h5" color="white">
                {statistics.error}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Alertas de Prazo
            </Typography>
            <Grid container spacing={2}>
              {upcomingDeadlines.map((deadline, index) => (
                <Grid item xs={12} key={index}>
                  <Alert 
                    severity={getAlertSeverity(deadline.daysLeft)}
                    sx={{ '& .MuiAlert-message': { width: '100%' } }}
                  >
                    <AlertTitle>{deadline.company}</AlertTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle2">
                          {deadline.event} - {deadline.description}
                        </Typography>
                        <Typography variant="body2">
                          Prazo: {deadline.deadline}
                        </Typography>
                      </Box>
                      <Chip 
                        label={`${deadline.daysLeft} dias restantes`}
                        color={getAlertSeverity(deadline.daysLeft)}
                        size="small"
                      />
                    </Box>
                  </Alert>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Prazos de Envio - eSocial
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Evento</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Prazo</TableCell>
                    <TableCell>Detalhes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deadlines.map((deadline, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {deadline.event}
                        </Typography>
                      </TableCell>
                      <TableCell>{deadline.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={deadline.deadline}
                          color={deadline.status}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{deadline.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Últimos Eventos
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Empresa</TableCell>
                    <TableCell>Evento</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>{event.company}</TableCell>
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          {event.event_type}
                        </Typography>
                        {event.description}
                      </TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={event.status}
                          color={getStatusColor(event.status)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Histórico de Eventos
            </Typography>
            <List>
              {events.map((event) => (
                <ListItem key={event.id} divider>
                  <ListItemIcon>
                    <Avatar sx={{ 
                      bgcolor: event.status === 'success' ? 'success.main' : 
                               event.status === 'pending' ? 'warning.main' : 'error.main',
                      width: 32,
                      height: 32
                    }}>
                      {event.event_type.split('-')[1].charAt(0)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2">
                          {event.company}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {event.date}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary">
                          {event.event_type} - {event.description}
                        </Typography>
                        <Typography variant="caption">
                          {event.details}
                        </Typography>
                      </>
                    }
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

export default ESocialEvents;
