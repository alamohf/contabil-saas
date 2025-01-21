import React, { useState } from 'react';
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
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const EmployeesList = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const employees = [
    {
      id: 1,
      name: "João Silva",
      company: "Tech Solutions Ltda",
      position: "Desenvolvedor Senior",
      department: "TI",
      admission_date: "2023-01-15",
      salary: 8500.00,
      benefits: ["Vale Refeição", "Plano de Saúde", "Vale Transporte"],
      status: "active",
      last_vacation: "2023-07-15",
      next_vacation: "2024-01-15",
    },
    {
      id: 2,
      name: "Maria Santos",
      company: "Café & Sabor Comercial",
      position: "Gerente de Loja",
      department: "Operações",
      admission_date: "2022-08-20",
      salary: 4500.00,
      benefits: ["Vale Alimentação", "Plano Odontológico"],
      status: "active",
      last_vacation: "2023-08-20",
      next_vacation: "2024-08-20",
    },
    {
      id: 3,
      name: "Pedro Oliveira",
      company: "Construções Rápidas SA",
      position: "Engenheiro Civil",
      department: "Projetos",
      admission_date: "2023-03-10",
      salary: 7200.00,
      benefits: ["Vale Refeição", "Plano de Saúde", "Seguro de Vida"],
      status: "active",
      last_vacation: null,
      next_vacation: "2024-03-10",
    },
    {
      id: 4,
      name: "Ana Beatriz",
      company: "Mercado Bom Preço",
      position: "Supervisora",
      department: "Vendas",
      admission_date: "2022-11-05",
      salary: 3800.00,
      benefits: ["Vale Alimentação", "Vale Transporte"],
      status: "active",
      last_vacation: "2023-11-05",
      next_vacation: "2024-11-05",
    },
    {
      id: 5,
      name: "Carlos Eduardo",
      company: "Auto Peças Silva",
      position: "Vendedor Técnico",
      department: "Comercial",
      admission_date: "2023-06-01",
      salary: 3200.00,
      benefits: ["Vale Refeição", "Comissão"],
      status: "active",
      last_vacation: null,
      next_vacation: "2024-06-01",
    },
  ];

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: '240px', width: 'calc(100% - 240px)' }}>
      <Typography variant="h4" gutterBottom>
        Funcionários
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Empresa</TableCell>
                  <TableCell>Cargo</TableCell>
                  <TableCell>Departamento</TableCell>
                  <TableCell>Admissão</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.company}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{formatDate(employee.admission_date)}</TableCell>
                    <TableCell>
                      <Chip
                        label={employee.status === 'active' ? 'Ativo' : 'Inativo'}
                        color={employee.status === 'active' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleViewDetails(employee)}
                      >
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md">
        <DialogTitle>
          Detalhes do Funcionário
        </DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ width: 64, height: 64, mr: 2 }}>
                    {selectedEmployee.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedEmployee.name}</Typography>
                    <Typography color="textSecondary">{selectedEmployee.position}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Empresa"
                        secondary={selectedEmployee.company}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Departamento"
                        secondary={selectedEmployee.department}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Data de Admissão"
                        secondary={formatDate(selectedEmployee.admission_date)}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={6}>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Salário"
                        secondary={formatCurrency(selectedEmployee.salary)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Última Férias"
                        secondary={formatDate(selectedEmployee.last_vacation)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Próximas Férias"
                        secondary={formatDate(selectedEmployee.next_vacation)}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Benefícios
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {selectedEmployee.benefits.map((benefit, index) => (
                      <Chip
                        key={index}
                        label={benefit}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default EmployeesList;
