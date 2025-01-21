import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  Collapse,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemButton,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useClient } from '../context/ClientContext';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [clientsOpen, setClientsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedClient, clients } = useClient();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isClientDashboard = location.pathname.includes('/clients/') && location.pathname.includes('/dashboard');

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    {
      text: 'Clientes',
      icon: <PeopleIcon />,
      hasSubmenu: true,
      onClick: () => setClientsOpen(!clientsOpen),
    },
    { text: 'Documentos', icon: <DescriptionIcon />, path: '/documents' },
  ];

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              backgroundColor: '#00695c',
              color: 'white',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: open ? 'space-between' : 'center',
              padding: '8px',
              backgroundColor: '#004d40',
              minHeight: '64px',
            }}
          >
            {open && (
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, ml: 2, color: 'white' }}>
                ContabilSaaS
              </Typography>
            )}
            <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />

          {isClientDashboard && selectedClient && (
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon fontSize="small" />
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{
                    opacity: open ? 1 : 0,
                    transition: 'opacity 0.2s',
                    color: 'white',
                  }}
                >
                  {selectedClient.company_name}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  opacity: open ? 0.7 : 0,
                  transition: 'opacity 0.2s',
                  color: 'white',
                }}
              >
                Dashboard Individual
              </Typography>
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
            </Box>
          )}

          <List>
            {menuItems.map((item) => (
              <React.Fragment key={item.text}>
                <ListItem
                  button
                  component={item.hasSubmenu ? 'div' : Link}
                  to={item.path}
                  onClick={item.onClick}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: '#00897b',
                    },
                    ...(location.pathname === item.path && {
                      backgroundColor: '#00695c',
                    }),
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      transition: 'opacity 0.2s',
                    }}
                  />
                  {item.hasSubmenu && open && (
                    <>{clientsOpen ? <ExpandLess /> : <ExpandMore />}</>
                  )}
                </ListItem>
                {item.hasSubmenu && (
                  <Collapse in={clientsOpen && open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {clients.map((client) => (
                        <ListItemButton
                          key={client.id}
                          sx={{
                            pl: 4,
                            '&:hover': {
                              backgroundColor: '#00897b',
                            },
                          }}
                          component={Link}
                          to={`/clients/${client.id}/dashboard`}
                        >
                          <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                            <BusinessIcon />
                          </ListItemIcon>
                          <ListItemText primary={client.company_name} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', mt: 'auto' }} />
          <List>
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: '#00897b',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                primary="Sair"
                sx={{
                  opacity: open ? 1 : 0,
                  transition: 'opacity 0.2s',
                }}
              />
            </ListItem>
          </List>
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: open ? 240 : 65,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? 240 : 65,
              boxSizing: 'border-box',
              backgroundColor: '#00695c',
              color: 'white',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: open ? 'space-between' : 'center',
              padding: '8px',
              backgroundColor: '#004d40',
              minHeight: '64px',
            }}
          >
            {open && (
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, ml: 2, color: 'white' }}>
                ContabilSaaS
              </Typography>
            )}
            <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />

          {isClientDashboard && selectedClient && (
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon fontSize="small" />
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{
                    opacity: open ? 1 : 0,
                    transition: 'opacity 0.2s',
                    color: 'white',
                  }}
                >
                  {selectedClient.company_name}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  opacity: open ? 0.7 : 0,
                  transition: 'opacity 0.2s',
                  color: 'white',
                }}
              >
                Dashboard Individual
              </Typography>
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
            </Box>
          )}

          <List>
            {menuItems.map((item) => (
              <React.Fragment key={item.text}>
                <ListItem
                  button
                  component={item.hasSubmenu ? 'div' : Link}
                  to={item.path}
                  onClick={item.onClick}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: '#00897b',
                    },
                    ...(location.pathname === item.path && {
                      backgroundColor: '#00695c',
                    }),
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      transition: 'opacity 0.2s',
                    }}
                  />
                  {item.hasSubmenu && open && (
                    <>{clientsOpen ? <ExpandLess /> : <ExpandMore />}</>
                  )}
                </ListItem>
                {item.hasSubmenu && (
                  <Collapse in={clientsOpen && open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {clients.map((client) => (
                        <ListItemButton
                          key={client.id}
                          sx={{
                            pl: 4,
                            '&:hover': {
                              backgroundColor: '#00897b',
                            },
                          }}
                          component={Link}
                          to={`/clients/${client.id}/dashboard`}
                        >
                          <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                            <BusinessIcon />
                          </ListItemIcon>
                          <ListItemText primary={client.company_name} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', mt: 'auto' }} />
          <List>
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: '#00897b',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                primary="Sair"
                sx={{
                  opacity: open ? 1 : 0,
                  transition: 'opacity 0.2s',
                }}
              />
            </ListItem>
          </List>
        </Drawer>
      )}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            left: 0,
            top: 0,
            margin: 1,
            display: { sm: 'none' },
            zIndex: 1000,
            backgroundColor: '#004d40',
            '&:hover': {
              backgroundColor: '#00695c',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </>
  );
};

export default Sidebar;
