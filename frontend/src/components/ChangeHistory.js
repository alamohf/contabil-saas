import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const getIconByType = (type) => {
  switch (type.toLowerCase()) {
    case 'success':
      return <CheckCircleIcon color="success" />;
    case 'error':
      return <ErrorIcon color="error" />;
    case 'warning':
      return <WarningIcon color="warning" />;
    default:
      return <InfoIcon color="info" />;
  }
};

const getChipColor = (status) => {
  switch (status.toLowerCase()) {
    case 'concluído':
    case 'enviado':
      return 'success';
    case 'pendente':
      return 'warning';
    case 'erro':
      return 'error';
    default:
      return 'default';
  }
};

const ChangeHistory = ({ changes }) => {
  // Agrupa alterações por data
  const groupedChanges = changes.reduce((acc, change) => {
    const date = change.date.split(' ')[0]; // Pega só a data, sem a hora
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(change);
    return acc;
  }, {});

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Histórico de Alterações
      </Typography>
      
      {Object.entries(groupedChanges).map(([date, dateChanges], dateIndex) => (
        <Paper key={date} sx={{ mb: 2, overflow: 'hidden' }}>
          <Box sx={{ bgcolor: 'grey.100', px: 2, py: 1 }}>
            <Typography variant="subtitle2">
              {new Date(date).toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Typography>
          </Box>
          <List dense>
            {dateChanges.map((change, index) => (
              <React.Fragment key={change.id}>
                <ListItem
                  sx={{
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon>
                    {getIconByType(change.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1">
                          {change.description}
                        </Typography>
                        <Chip
                          label={change.status}
                          size="small"
                          color={getChipColor(change.status)}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary" component="span">
                          {change.time} - {change.user}
                        </Typography>
                        {change.details && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ mt: 0.5, display: 'block' }}
                          >
                            {change.details}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {index < dateChanges.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ))}
    </Box>
  );
};

export default ChangeHistory;
