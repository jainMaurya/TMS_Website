import React, { useMemo, useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Paper, AppBar, Toolbar, IconButton, Link, CssBaseline, Dialog, Button, Fade, Slide, useMediaQuery } from '@mui/material';
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
  // Media queries for responsive adjustments
  const isXs = useMediaQuery('(max-width:420px)');
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
        <AppBar position="sticky" color={mode === 'dark' ? 'secondary' : 'primary'} elevation={2}
          sx={{ backdropFilter: 'blur(6px)', backgroundColor: (t) => alpha(t.palette.secondary.main, 0.92) }}>
          <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 2 }, gap: 1 }}>
            <IconButton edge="start" color="inherit" component={RouterLink} to="/">
              <ArrowBackIcon />
            </IconButton>
            <Box component={RouterLink} to="/" aria-label="Home" sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', lineHeight: 0, height: { xs: 44, sm: 56 }, mr: { xs: 1, sm: 2 } }}>
              <Box component="img" src="/TMS-UPPER.png" onError={(e)=>{ e.currentTarget.src='/TMS-LOGO.png'; }} alt="TMS Logo" sx={{ height: { xs: 44, sm: 56 }, width: 'auto', objectFit: 'contain', display: 'block', pointerEvents: 'none' }} />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Link component={RouterLink} to="/" color="inherit" underline="hover" sx={{ display: { xs: 'none', sm: 'inline-flex' }, fontSize: 14, letterSpacing: 0.5 }}>Home</Link>
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
  <AppBar position="sticky" color={'secondary'} elevation={2} sx={{ backdropFilter: 'blur(6px)', backgroundColor: (t) => alpha(t.palette.secondary.main, 0.92) }}>
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 2 }, gap: 1 }}>
          <IconButton edge="start" color="inherit" component={RouterLink} to="/" aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
          <Box component={RouterLink} to="/" aria-label="Home" sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', lineHeight: 0, height: { xs: 44, sm: 56 }, mr: { xs: 1, sm: 2 } }}>
            <Box component="img" src="/TMS-UPPER.png" onError={(e)=>{ e.currentTarget.src='/TMS-LOGO.png'; }} alt="TMS Logo" sx={{ height: { xs: 44, sm: 56 }, width: 'auto', objectFit: 'contain', display: 'block', pointerEvents: 'none' }} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Link component={RouterLink} to="/" color="inherit" underline="hover" sx={{ display: { xs: 'none', sm: 'inline-flex' }, fontSize: 14, letterSpacing: 0.5 }}>Home</Link>
        </Toolbar>
      </AppBar>
  <Box sx={{ width: '100%', background: (t) => {
        const accent = t.palette.secondary.light;
        return `linear-gradient(115deg, ${alpha(accent, 0.12)} 0%, ${t.palette.background.paper} 100%)`;
      }, pt: { xs: 4, sm: 6 }, pb: { xs: 4, sm: 6 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 2 } }}>
          <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: 10, letterSpacing: 1 }}>{event.date}</Typography>
            <Typography variant="h4" sx={{ mt: 0.5, fontSize: { xs: 24, sm: 34 }, color: (t) => t.palette.secondary.main, fontWeight: 700, lineHeight: 1.15 }}>{event.title}</Typography>
          </Box>
          <Fade in timeout={500}>
            <Box sx={{ mb: { xs: 2.5, sm: 4 } }}>
              <Box
                component="img"
                src={event.cover}
                alt={`${event.title} cover`}
                loading="eager"
                decoding="async"
                fetchpriority="high"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 1100px"
                sx={{ width: '100%', height: { xs: 210, sm: 320, md: 420 }, objectFit: 'cover', borderRadius: 3, display: 'block', boxShadow: (t) => `0 4px 24px -6px ${alpha(t.palette.secondary.main,0.4)}` }}
              />
            </Box>
          </Fade>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'space-between', mb: { xs: 3, sm: 4 } }}>
            <Button component={RouterLink} to={prev ? `/events/${prev.slug}` : '#'} disabled={!prev} variant="outlined" color={mode === 'dark' ? 'secondary' : 'primary'} startIcon={<ArrowBackIosNewIcon />} size={isXs ? 'small' : 'medium'} sx={{ flexShrink: 0 }}>Previous</Button>
            <Button component={RouterLink} to={next ? `/events/${next.slug}` : '#'} disabled={!next} variant="outlined" color={mode === 'dark' ? 'secondary' : 'primary'} endIcon={<ArrowForwardIosIcon />} size={isXs ? 'small' : 'medium'} sx={{ flexShrink: 0 }}>Next</Button>
          </Box>
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
            {event.photos.map((src, idx) => (
              <Grid key={src} item xs={6} sm={4} md={3}>
                <Slide in timeout={350 + idx * 30} direction="up">
                  <Paper elevation={2} onClick={() => openViewer(idx)} sx={{ cursor: 'zoom-in', p: 0.75, borderRadius: 3, backgroundColor: 'background.paper', transition: 'transform .25s, box-shadow .25s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
                    <Box component="img" src={src} alt={`${event.title} photo ${idx + 1}`} loading="lazy" decoding="async" sizes="(max-width:600px) 50vw, (max-width:900px) 33vw, (max-width:1200px) 25vw, 22vw" style={{ aspectRatio: '4 / 3' }} sx={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', borderRadius: 2 }} />
                  </Paper>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Lightbox Viewer */}
      {event?.photos?.length > 0 && (
        <Dialog
          open={viewerOpen}
          onClose={closeViewer}
          fullWidth
          maxWidth="md"
          PaperProps={{ sx: { bgcolor: 'black', borderRadius: { xs: 0, sm: 2 }, m: 0 } }}
        >
          <Box sx={{ position: 'relative' }}>
            <IconButton onClick={closeViewer} aria-label="Close viewer" sx={{ position: 'absolute', top: 6, right: 6, color: 'white', zIndex: 2 }}>
              <CloseIcon />
            </IconButton>
            <Box sx={{ width: '100%', height: { xs: 'calc(100dvh - 56px)', sm: 540 }, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 1, sm: 2 } }}>
              <Box component="img" src={event.photos[viewerIndex]} alt={`Photo ${viewerIndex + 1} of ${event.title}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>
            {event.photos.length > 1 && (
              <IconButton onClick={prevImage} aria-label="Previous image" sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(255,255,255,0.12)', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }}>
                <ChevronLeftIcon />
              </IconButton>
            )}
            {event.photos.length > 1 && (
              <IconButton onClick={nextImage} aria-label="Next image" sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(255,255,255,0.12)', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }}>
                <ChevronRightIcon />
              </IconButton>
            )}
            <Box sx={{ position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center', color: 'white', fontSize: 12, letterSpacing: 1, opacity: 0.75 }}>
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
