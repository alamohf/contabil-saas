// Componente de login removido
// import React, { useState } from 'react';
// import {
//   Container,
//   Paper,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   useTheme,
//   useMediaQuery,
//   Alert,
//   CircularProgress,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   // const [email, setEmail] = useState('');
//   // const [password, setPassword] = useState('');
//   // const [error, setError] = useState('');
//   // const [loading, setLoading] = useState(false);
//   // const navigate = useNavigate();
//   // const theme = useTheme();
//   // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setError('');
//   //   setLoading(true);

//   //   try {
//   //     const formData = new URLSearchParams();
//   //     formData.append('username', email);
//   //     formData.append('password', password);

//   //     const response = await fetch('http://localhost:8000/token', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/x-www-form-urlencoded',
//   //       },
//   //       body: formData,
//   //     });

//   //     const data = await response.json();

//   //     if (response.ok) {
//   //       localStorage.setItem('token', data.access_token);
//   //       navigate('/');
//   //     } else {
//   //       setError(data.detail || 'Erro ao fazer login');
//   //     }
//   //   } catch (err) {
//   //     console.error('Erro:', err);
//   //     setError('Erro ao conectar ao servidor');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           minHeight: '100vh',
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             padding: theme.spacing(4),
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             width: '100%',
//             maxWidth: isMobile ? '100%' : '400px',
//           }}
//         >
//           <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
//             ContabilSaaS
//           </Typography>
//           <Typography component="h2" variant="h6" sx={{ mb: 3 }}>
//             Login do Escritório
//           </Typography>

//           {/* {error && (
//             <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
//               {error}
//             </Alert>
//           )} */}

//           {/* <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={loading}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Senha"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               disabled={loading}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={24} /> : 'Entrar'}
//             </Button>
//           </Box> */}
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default Login;
