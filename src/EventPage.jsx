import React, { useMemo, useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Paper, AppBar, Toolbar, IconButton, Link, CssBaseline, Dialog, Button, Fade, Slide } from '@mui/material';
import { ThemeProvider, createTheme, alpha } from '@mui/material/styles';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { events } from './data/events.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function EventPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const eventIndex = useMemo(() => events.findIndex((e) => e.slug === slug), [slug]);
  const event = eventIndex >= 0 ? events[eventIndex] : undefined;
  const prev = eventIndex >= 0 ? events[(eventIndex - 1 + events.length) % events.length] : undefined;
  const next = eventIndex >= 0 ? events[(eventIndex + 1) % events.length] : undefined;
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const mode = 'dark';
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
            secondary: { main: 'rgb(61, 33, 117)', light: 'rgb(93, 68, 150)', dark: 'rgb(42, 22, 82)', contrastText: '#ffffff' },
            background: { default: '#0B0D11', paper: '#12151B' },
            text: { primary: '#E6E9EE', secondary: '#BAC7D5' },
            divider: '#242A32',
          }),
    },
  }), [mode]);
  useEffect(() => { if (event) document.title = `TMS — ${event.title}`; }, [event]);
  // open lightbox
  const openViewer = (idx = 0) => { setViewerIndex(idx); try { window.history.pushState({ lightbox: true }, ''); } catch {} setViewerOpen(true); };
  const closeViewer = () => {
    if (viewerOpen) {
      try { window.history.back(); } catch { setViewerOpen(false); }
    } else {
      setViewerOpen(false);
    }
  };
  const prevImage = () => setViewerIndex((i) => (i - 1 + (event?.photos?.length || 0)) % (event?.photos?.length || 1));
  const nextImage = () => setViewerIndex((i) => (i + 1) % (event?.photos?.length || 1));
  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeViewer();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewerOpen, event]);
  useEffect(() => {
    if (!viewerOpen) return;
    const onPop = () => setViewerOpen(false);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [viewerOpen]);
  // Freeze background animations when lightbox is open
  useEffect(() => {
    const cls = 'freeze-anim';
    if (viewerOpen) {
      document.body.classList.add(cls);
    } else {
      document.body.classList.remove(cls);
    }
    return () => document.body.classList.remove(cls);
  }, [viewerOpen]);
  // keyboard nav between events when lightbox is closed
  useEffect(() => {
    if (viewerOpen || !prev || !next) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') navigate(`/events/${prev.slug}`);
      if (e.key === 'ArrowRight') navigate(`/events/${next.slug}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewerOpen, prev, next, navigate]);
  if (!event) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" color={mode === 'dark' ? 'secondary' : 'primary'} elevation={2}>
          <Toolbar>
            <IconButton edge="start" color="inherit" component={RouterLink} to="/">
              <ArrowBackIcon />
            </IconButton>
            <IconButton color="inherit" component={RouterLink} to="/" disableRipple disableFocusRipple focusRipple={false} sx={{ p: 0.5, ml: 1, borderRadius: 0, '&:hover': { backgroundColor: 'transparent' }, position: 'relative', width: 48, height: 48 }}>
              <Box component="img" src="/TMS-UPPER.png" alt="TMS Home" onError={(e)=>{ e.currentTarget.src='/TMS-LOGO.png'; }} sx={{ height: { xs: 120, sm: 160 }, width: 'auto', objectFit: 'contain', display: 'block', position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }} />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Link component={RouterLink} to="/" color="inherit" underline="hover">Home</Link>
          </Toolbar>
        </AppBar>
        <Container sx={{ py: 8 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Event not found</Typography>
          <Typography component={RouterLink} to="/" sx={{ color: 'primary.main' }}>Go Home</Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Fade in timeout={300}>
      <Box>
      {/* Breadcrumb JSON-LD for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
            { '@type': 'ListItem', position: 2, name: 'Events', item: '/#events' },
            { '@type': 'ListItem', position: 3, name: event.title, item: `/events/${event.slug}` },
          ],
        })}
      </script>
  <AppBar position="static" color={'secondary'} elevation={2}>
        <Toolbar>
          <IconButton edge="start" color="inherit" component={RouterLink} to="/">
            <ArrowBackIcon />
          </IconButton>
          <IconButton color="inherit" component={RouterLink} to="/" disableRipple disableFocusRipple focusRipple={false} sx={{ p: 0.5, ml: 1, borderRadius: 0, '&:hover': { backgroundColor: 'transparent' }, position: 'relative', width: 48, height: 48 }}>
            <Box component="img" src="/TMS-UPPER.png" alt="TMS Home" onError={(e)=>{ e.currentTarget.src='/TMS-LOGO.png'; }} sx={{ height: { xs: 120, sm: 160 }, width: 'auto', objectFit: 'contain', display: 'block', position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Link component={RouterLink} to="/" color="inherit" underline="hover">Home</Link>
        </Toolbar>
      </AppBar>
  <Box sx={{ width: '100%', background: (t) => {
        const accent = t.palette[t.palette.mode === 'dark' ? 'secondary' : 'primary'].light;
        return `linear-gradient(90deg, ${alpha(accent, 0.12)} 0%, ${t.palette.background.paper} 100%)`;
      }, py: 6 }}>
        <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>{event.date}</Typography>
          <Typography variant="h4" sx={{ color: (t) => t.palette.secondary.main, fontWeight: 'bold' }}>{event.title}</Typography>
        </Box>
        <Fade in timeout={600}><Box sx={{ mb: 2 }}>
          <Box
            component="img"
            src={event.cover}
            alt={`${event.title} cover`}
            loading="lazy"
            decoding="async"
            fetchpriority="high"
            sx={{ width: '100%', height: { xs: 260, md: 420 }, objectFit: 'cover', borderRadius: 3, display: 'block' }}
          />
        </Box></Fade>
        {/* Prev/Next navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button component={RouterLink} to={prev ? `/events/${prev.slug}` : '#'} disabled={!prev}
                  variant="outlined" color={mode === 'dark' ? 'secondary' : 'primary'} startIcon={<ArrowBackIosNewIcon />}>
            Previous
          </Button>
          <Button component={RouterLink} to={next ? `/events/${next.slug}` : '#'} disabled={!next}
                  variant="outlined" color={mode === 'dark' ? 'secondary' : 'primary'} endIcon={<ArrowForwardIosIcon />}>
            Next
          </Button>
        </Box>
  <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {event.photos.map((src, idx) => (
            <Grid key={src} item xs={12} sm={6} md={4} lg={3}>
              <Slide in timeout={400} direction="up">
                <Paper elevation={2} sx={{ p: 1, borderRadius: 3, cursor: 'zoom-in', transition: 'transform .2s, box-shadow .2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }} onClick={() => openViewer(idx)}>
                  <Box
                    component="img"
                    src={src}
                    alt={`${event.title} photo`}
                    loading="lazy"
                    sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 2, display: 'block' }}
                  />
                </Paper>
              </Slide>
            </Grid>
          ))}
        </Grid>
        </Container>
      </Box>
      {/* Lightbox Viewer */}
      {event?.photos?.length > 0 && (
        <Dialog open={viewerOpen} onClose={closeViewer} maxWidth="md" fullWidth PaperProps={{ sx: { bgcolor: 'black' } }}>
          <Box sx={{ position: 'relative', bgcolor: 'black' }}>
            <IconButton onClick={closeViewer} sx={{ position: 'absolute', top: 8, right: 8, color: 'white', zIndex: 2 }}>
              <CloseIcon />
            </IconButton>
            <Box sx={{ width: '100%', height: { xs: 320, md: 520 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box role="img" aria-label="viewer image" sx={{ width: '100%', height: '100%', background: `center/contain no-repeat url("${event.photos[viewerIndex]}")` }} />
            </Box>
            {event.photos.length > 1 && (
              <Box sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', zIndex: 2 }}>
                <IconButton onClick={prevImage} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}>
                  <ChevronLeftIcon />
                </IconButton>
              </Box>
            )}
            {event.photos.length > 1 && (
              <Box sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', zIndex: 2 }}>
                <IconButton onClick={nextImage} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}>
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            )}
            <Box sx={{ position: 'absolute', bottom: 8, left: 16, right: 16, color: 'white', opacity: 0.8, textAlign: 'center', fontSize: 12 }}>
              {viewerIndex + 1} / {event.photos.length}
            </Box>
          </Box>
        </Dialog>
      )}
      <Box sx={{ bgcolor: (t) => t.palette.secondary.dark,
                 color: (t) => t.palette.secondary.contrastText,
                 py: 2, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ opacity: 0.85 }}>
          &copy; {new Date().getFullYear()} Thapar Mathematical Society
        </Typography>
      </Box>
      </Box>
      </Fade>
    </ThemeProvider>
  );
}
