import React, { useMemo } from 'react';
import { Box, Container, Typography, Button, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

export default function ErrorPage() {
  const mode = useMemo(() => {
    try { return localStorage.getItem('tms-mode') || 'dark'; } catch { return 'dark'; }
  }, []);
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: { main: '#6C5CE7', light: '#8E79FF', dark: '#4B3FE0', contrastText: '#ffffff' },
            secondary: { main: '#00C2A8', light: '#4DE1D0', dark: '#009985', contrastText: '#001B18' },
            background: { default: '#F6F4FF', paper: '#ffffff' },
            divider: '#E4E6EF',
          }
        : {
            primary: { main: '#8EA2B8', light: '#AFC0D1', dark: '#6E849C', contrastText: '#0B0D11' },
            secondary: { main: '#22D3EE', light: '#67E8F9', dark: '#0891B2', contrastText: '#001216' },
            background: { default: '#0B0D11', paper: '#12151B' },
            text: { primary: '#E6E9EE', secondary: '#BAC7D5' },
            divider: '#242A32',
          }),
    },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: 'background.default' }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>Oops</Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3 }}>
            We couldn’t find that page.
          </Typography>
          <Button variant="contained" size="large" component={RouterLink} to="/">
            Go to Home
          </Button>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
