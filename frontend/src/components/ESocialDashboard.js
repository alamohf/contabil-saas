import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ESocialDashboard = () => {
  const [esocialData, setEsocialData] = useState({
    events: [],
    statistics: {
      total: 0,
      pending: 0,
      processed: 0,
      error: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Substitua pela sua API real
        const response = await axios.get('http://localhost:8000/api/esocial/');
        setEsocialData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do eSocial:', error);
      }
    };

    fetchData();
  }, []);

  const statusData = {
    labels: ['Pendentes', 'Processados', 'Com Erro'],
    datasets: [
      {
        data: [
          esocialData.statistics.pending,
          esocialData.statistics.processed,
          esocialData.statistics.error,
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const eventTypeData = {
    labels: ['S-1000', 'S-1200', 'S-2200', 'S-2300', 'S-2399'],
    datasets: [
      {
        label: 'Eventos por Tipo',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processed':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: '240px', width: 'calc(100% - 240px)' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard eSocial
      </Typography>

      <Grid container spacing={3}>
        {/* Status Cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary">Total de Eventos</Typography>
                  <Typography variant="h4">{esocialData.statistics.total}</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={100} 
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary">Processados</Typography>
                  <Typography variant="h4">{esocialData.statistics.processed}</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(esocialData.statistics.processed / esocialData.statistics.total) * 100} 
                    color="success"
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary">Pendentes</Typography>
                  <Typography variant="h4">{esocialData.statistics.pending}</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(esocialData.statistics.pending / esocialData.statistics.total) * 100} 
                    color="warning"
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Status dos Eventos
            </Typography>
            <Pie data={statusData} options={options} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Eventos por Tipo
            </Typography>
            <Bar data={eventTypeData} options={options} />
          </Paper>
        </Grid>

        {/* Recent Events */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Eventos Recentes
            </Typography>
            <Grid container spacing={2}>
              {esocialData.events.slice(0, 4).map((event, index) => (
                <Grid item xs={12} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="h6">{event.type}</Typography>
                          <Typography color="text.secondary">{event.description}</Typography>
                        </Box>
                        <Chip
                          label={event.status}
                          color={getStatusColor(event.status)}
                          size="small"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ESocialDashboard;
