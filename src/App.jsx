import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Paper, Grid, Link, Card, CardContent, CardActions, Tabs, Tab, Fade, Avatar, Dialog, CssBaseline, Fab, Zoom, TextField, Slide, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// removed theme toggle icons
import { ThemeProvider, createTheme, alpha } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InstagramIcon from '@mui/icons-material/Instagram';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';
import { events as sharedEvents } from './data/events.js';

// Theme is created dynamically based on mode (light/dark)

function App() {
  // Dark theme is default and fixed
  const mode = 'dark';
  const [fadeIn, setFadeIn] = useState(false);
  const [section, setSection] = useState('home');
  const [galleryYear, setGalleryYear] = useState('2023-24');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState([]);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [eventsYear, setEventsYear] = useState('All');
  const [eventsQuery, setEventsQuery] = useState('');

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
            // Dark mode tuned: neutral primary, custom purple secondary (rgb(61, 33, 117))
            primary: { main: '#8EA2B8', light: '#AFC0D1', dark: '#6E849C', contrastText: '#0B0D11' },
            secondary: { main: 'rgb(61, 33, 117)', light: 'rgb(93, 68, 150)', dark: 'rgb(42, 22, 82)', contrastText: '#ffffff' },
            background: { default: '#0B0D11', paper: '#12151B' },
            text: { primary: '#E6E9EE', secondary: '#BAC7D5' },
            divider: '#242A32',
          }),
    },
    typography: {
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      h4: { fontWeight: 800, letterSpacing: 0.5 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiButton: { styleOverrides: { root: { borderRadius: 12 } } },
      MuiPaper: { styleOverrides: { root: { borderRadius: 14, backgroundImage: 'none' } } },
      MuiCard: { styleOverrides: { root: { borderRadius: 14, backgroundImage: 'none' } } },
      MuiTabs: { styleOverrides: { indicator: { height: 3, borderRadius: 3 } } },
      MuiTab: { styleOverrides: { root: { fontWeight: 600 } } },
      MuiAppBar: { styleOverrides: { colorPrimary: { backgroundImage: 'none' }, colorSecondary: { backgroundImage: 'none' } } },
      MuiLink: { styleOverrides: { root: { color: undefined } } },
    },
  }), [mode]);

  // Micro-interactions: Reveal on scroll
  const Reveal = ({ children, direction = 'up', threshold = 0.05, rootMargin = '0px 0px -10% 0px', delayMs = 0, distance = 24, sx }) => {
    const [inView, setInView] = useState(false);
    const ref = React.useRef(null);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        },
        { threshold, rootMargin }
      );
      io.observe(el);
      return () => io.disconnect();
    }, [threshold, rootMargin]);
    const offset = typeof distance === 'number' ? `${distance}px` : distance;
    const initialTransform = direction === 'up'
      ? `translate3d(0, ${offset}, 0)`
      : direction === 'down'
      ? `translate3d(0, -${offset}, 0)`
      : direction === 'left'
      ? `translate3d(${offset}, 0, 0)`
      : `translate3d(-${offset}, 0, 0)`;
    return (
      <Box
        ref={ref}
        sx={[{
          willChange: 'transform, opacity',
          transform: inView ? 'none' : initialTransform,
          opacity: inView ? 1 : 0,
          transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease',
          transitionDelay: inView ? `${delayMs}ms` : '0ms',
        }, sx]}
      >
        {children}
      </Box>
    );
  };

  // ... (removed Counter; no longer needed after removing stats band)

  useEffect(() => {
    // Update theme-color meta for better PWA status bar color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#0B0D11');
    // Preload hero logo for faster first paint
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'image';
    preload.href = '/TMS-LOGO.png';
    document.head.appendChild(preload);
    return () => {
      try { document.head.removeChild(preload); } catch {}
    };
  }, []);

  const galleryData = {
    '2017-18': [
      '/gallery/2017-18/1.png','/gallery/2017-18/2.png','/gallery/2017-18/3.png','/gallery/2017-18/4.png','/gallery/2017-18/5.png','/gallery/2017-18/6.png','/gallery/2017-18/7.png'
    ],
    '2018-19': [
      '/gallery/2018-19/1.jpg','/gallery/2018-19/2.jpg','/gallery/2018-19/3.jpg','/gallery/2018-19/4.jpg','/gallery/2018-19/5.jpg','/gallery/2018-19/6.jpg','/gallery/2018-19/7.jpg','/gallery/2018-19/8.jpg','/gallery/2018-19/9.jpg','/gallery/2018-19/10.jpg','/gallery/2018-19/11.jpg','/gallery/2018-19/12.jpg','/gallery/2018-19/13.jpg','/gallery/2018-19/14.jpg','/gallery/2018-19/15.jpg','/gallery/2018-19/16.jpg','/gallery/2018-19/17.jpg','/gallery/2018-19/18.png'
    ],
    '2019-20': [
      '/gallery/2019-20/EmbeddedImage1.jpg','/gallery/2019-20/EmbeddedImage2.jpg','/gallery/2019-20/EmbeddedImage3.jpg','/gallery/2019-20/EmbeddedImage4.jpg','/gallery/2019-20/EmbeddedImage5.jpg','/gallery/2019-20/EmbeddedImage6.jpg','/gallery/2019-20/EmbeddedImage7.jpg','/gallery/2019-20/EmbeddedImage8.jpg'
    ],
    '2023-24': [
      '/gallery/2023-24/Group photo.png','/gallery/2023-24/idk (2).png','/gallery/2023-24/idk.png','/gallery/2023-24/IMG-20240309-WA0014.jpg','/gallery/2023-24/IMG-20240309-WA0017.jpg','/gallery/2023-24/IMG-20240309-WA0033.jpg','/gallery/2023-24/IMG-20240309-WA0035.jpg','/gallery/2023-24/IMG-20240616-WA0003.jpg','/gallery/2023-24/IMG-20240616-WA0004.jpg','/gallery/2023-24/IMG-20240616-WA0012.jpg','/gallery/2023-24/IMG20240901182413.jpg','/gallery/2023-24/IMG20240901212929.jpg','/gallery/2023-24/Screenshot 2024-06-03 101633.png','/gallery/2023-24/Screenshot 2024-06-04 130122.png','/gallery/2023-24/Screenshot 2024-09-12 210618.png','/gallery/2023-24/WhatsApp Image 2024-11-10 at 20.18.48_47bc9512.jpg','/gallery/2023-24/WhatsApp Image 2024-11-10 at 20.18.53_fe1df9be.jpg'
    ],
  };

  

  // use shared events data (single source of truth)
  const eventsData = sharedEvents.map(e => ({
    ...e,
    summary:
      e.slug === 'shoonya-5-0'
        ? 'Flagship event with activities, open mic, and guest lectures—vibrant platform for learning, expression, and connection.'
        : e.slug === 'research-paper-presentation-2023-24'
        ? 'Collaborative research presentations with feedback from peers and professors; improved communication skills.'
        : e.slug === 'society-fair-2024'
        ? 'Introduced freshers to TMS; hosted fun games with prizes—making math enjoyable for everyone.'
        : e.slug === 'shoonya-4-0'
        ? 'Lamp lighting, welcome speeches, guest lectures, open mic, prizes, and valedictory.'
        : e.slug === 'movie-screening-2023'
        ? 'The Man Who Knew Infinity—Ramanujan’s extraordinary journey and the beauty of numbers.'
        : e.slug === 'shoonya-3-0-2023'
        ? 'History of Mathematics, quizzes, puzzles, treasure hunt, and guest lecture—fun meets learning.'
        : '',
  }));

  // ... (removed derived stats; stats band deleted per request)

  const openViewer = (images, index = 0) => {
    setViewerImages(images);
    setViewerIndex(index);
    try { window.history.pushState({ lightbox: true }, ''); } catch {}
    setViewerOpen(true);
  };
  const closeViewer = () => {
    if (viewerOpen) {
      try { window.history.back(); } catch { setViewerOpen(false); }
    } else {
      setViewerOpen(false);
    }
  };
  // Close viewer on browser back (popstate) without leaving the current section
  useEffect(() => {
    if (!viewerOpen) return;
    const onPop = () => {
      setViewerOpen(false);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [viewerOpen]);
  const prevImage = () => setViewerIndex((i) => (i - 1 + viewerImages.length) % viewerImages.length);
  const nextImage = () => setViewerIndex((i) => (i + 1) % viewerImages.length);
  // Keyboard navigation for gallery lightbox
  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeViewer();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewerOpen, viewerImages.length]);
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // When lightbox is open, freeze background animations/transitions to avoid re-animating content
  useEffect(() => {
    const cls = 'freeze-anim';
    if (viewerOpen) {
      document.body.classList.add(cls);
    } else {
      document.body.classList.remove(cls);
    }
    return () => document.body.classList.remove(cls);
  }, [viewerOpen]);

  // Hero parallax (mouse-based, throttled via rAF) with reduced-motion safety
  const heroRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const pointerRef = React.useRef({ x: 0.5, y: 0.5 });
  const applyParallax = () => {
    rafRef.current = 0;
    const el = heroRef.current;
    if (!el) return;
    const px = (pointerRef.current.x - 0.5) * 2; // -1..1
    const py = (pointerRef.current.y - 0.5) * 2;
    el.style.setProperty('--px', px.toFixed(3));
    el.style.setProperty('--py', py.toFixed(3));
  };
  const onHeroMouseMove = (e) => {
    // Respect prefers-reduced-motion
    if (viewerOpen) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)),
    };
    if (!rafRef.current) rafRef.current = requestAnimationFrame(applyParallax);
  };
  const onHeroMouseLeave = () => {
    pointerRef.current = { x: 0.5, y: 0.5 };
    if (!rafRef.current) rafRef.current = requestAnimationFrame(applyParallax);
  };
  // Sync section with URL hash so footer links and shareable links work
  useEffect(() => {
    const fromHash = (h) => {
      const key = (h || '').replace('#', '').toLowerCase();
  return ['home', 'events', 'gallery', 'team'].includes(key) ? key : 'home';
    };
    const applyHash = () => setSection(fromHash(window.location.hash));
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);
  useEffect(() => {
    const targetHash = `#${section}`;
    // Update URL without triggering native scroll or hashchange event
    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, '', targetHash);
    }
    // Smoothly scroll page top for cleaner page transition instead of jumping to anchors
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    // Update document title
    const cap = section.charAt(0).toUpperCase() + section.slice(1);
    document.title = `TMS — ${cap}`;
  }, [section]);
  const handleNavChange = (event, newValue) => {
    setSection(newValue);
  };
  // Derive event years for filter
  const eventYears = useMemo(() => {
    const ys = new Set();
    eventsData.forEach(e => {
      const m = e.date && e.date.match(/(\d{4})/);
      if (m && m[1]) ys.add(m[1]);
    });
    return Array.from(ys).sort((a,b) => Number(b) - Number(a));
  }, [eventsData]);
  const filteredEvents = useMemo(() => {
    let list = eventsYear === 'All' ? eventsData : eventsData.filter(e => e.date && e.date.includes(eventsYear));
    const q = eventsQuery.trim().toLowerCase();
    if (q) list = list.filter(e => e.title.toLowerCase().includes(q));
    return list;
  }, [eventsData, eventsYear, eventsQuery]);
  return (
    <ThemeProvider theme={theme}>
  <CssBaseline />
      {/* Skip to content for keyboard users */}
      <Box component="a" href="#home" sx={{ position: 'absolute', left: -9999, top: 0, bgcolor: 'secondary.main', color: 'secondary.contrastText', p: 1, borderRadius: 1, '&:focus': { left: 16, top: 16, zIndex: 2000 } }}>
        Skip to content
      </Box>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
        {/* Navigation Bar */}
  <AppBar position="static" color={'secondary'} elevation={2}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <IconButton aria-label="Go to home" color="inherit" onClick={() => setSection('home')} component={RouterLink} to="/" sx={{ p: 0.5, mr: 1 }}>
                <Avatar src="/TMS-LOGO.png" alt="TMS Home" sx={{ width: 36, height: 36, bgcolor: 'white' }} />
              </IconButton>
            </Box>
            <Tabs value={section} onChange={handleNavChange} textColor="inherit" indicatorColor="secondary" sx={{ fontWeight: 'bold' }}>
              <Tab label="Home" value="home" />
              <Tab label="Events" value="events" />
              <Tab label="Gallery" value="gallery" />
              <Tab label="Team" value="team" />
            </Tabs>
            <Box sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
              <Box component="img" src="/TMS-UPPER.png" alt="TMS" sx={{ height: 28, display: 'block' }} />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Home Section with Hero and About */}
        <Fade in={section === 'home'} timeout={600} unmountOnExit>
          <Box>
            <Box id="home" ref={heroRef} onMouseMove={onHeroMouseMove} onMouseLeave={onHeroMouseLeave} sx={{
              width: '100%',
              minHeight: { xs: 520, md: 720 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 6,
              position: 'relative',
              overflow: 'hidden',
              backgroundImage: `radial-gradient(1000px 600px at -20% -20%, rgba(61,33,117,0.5), rgba(0,0,0,0)),
                                radial-gradient(800px 500px at 120% 0%, rgba(61,33,117,0.35), rgba(0,0,0,0)),
                                conic-gradient(from 210deg at 50% 50%, rgba(61,33,117,0.9), #0B0D11 30%, rgba(61,33,117,0.85) 60%, #0B0D11 100%)`,
              backgroundBlendMode: 'screen, screen, normal',
              // CSS vars for parallax
              '--px': 0,
              '--py': 0,
            }}>
              <Box sx={{
                position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.8,
                background: 'linear-gradient(-45deg, rgba(61,33,117,0.75), rgba(11,13,17,1), rgba(61,33,117,0.75), rgba(11,13,17,1))',
                backgroundSize: '200% 200%',
                animation: 'gradientMove 16s ease infinite',
                '@keyframes gradientMove': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                },
                '@media (prefers-reduced-motion: reduce)': { animation: 'none' }
              }} />
              {/* Subtle animated grid overlay */}
              <Box sx={{
                position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.12,
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px, 80px 80px',
                transform: 'translateZ(0)',
                animation: 'gridFloat 18s linear infinite',
                '@keyframes gridFloat': {
                  '0%': { backgroundPosition: '0px 0px, 0px 0px' },
                  '50%': { backgroundPosition: '40px 40px, 40px 40px' },
                  '100%': { backgroundPosition: '0px 0px, 0px 0px' }
                }
              }} />
              <Box sx={{
                position: 'absolute', inset: '-10%', pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.35,
                background: 'conic-gradient(from 0deg at 50% 50%, rgba(61,33,117,0.9), rgba(61,33,117,0) 25%, rgba(61,33,117,0.8) 50%, rgba(61,33,117,0) 75%, rgba(61,33,117,0.9))',
                animation: 'spinConic 40s linear infinite',
                '@keyframes spinConic': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' }
                },
                '@media (prefers-reduced-motion: reduce)': { animation: 'none' }
              }} />
              {/* Floating purple blobs for a wilder look */}
              <Box sx={{
                position: 'absolute', width: '60vmax', height: '60vmax', top: '-10vmax', left: '-10vmax',
                background: 'radial-gradient(circle at 50% 50%, rgba(61,33,117,0.6), rgba(61,33,117,0) 60%)',
                filter: 'blur(80px)', opacity: 0.65, mixBlendMode: 'screen',
                animation: 'float1 24s ease-in-out infinite',
                transform: 'translate3d(calc(var(--px) * 12px), calc(var(--py) * 8px), 0)',
                '@keyframes float1': {
                  '0%': { transform: 'translate3d(0,0,0) scale(1)' },
                  '50%': { transform: 'translate3d(10vw,5vh,0) scale(1.15)' },
                  '100%': { transform: 'translate3d(0,0,0) scale(1)' }
                },
                '@media (prefers-reduced-motion: reduce)': { animation: 'none', transform: 'none' }
              }} />
              <Box sx={{
                position: 'absolute', width: '55vmax', height: '55vmax', bottom: '-15vmax', right: '-15vmax',
                background: 'radial-gradient(circle at 50% 50%, rgba(93,68,150,0.55), rgba(61,33,117,0) 60%)',
                filter: 'blur(90px)', opacity: 0.6, mixBlendMode: 'screen',
                animation: 'float2 28s ease-in-out infinite',
                transform: 'translate3d(calc(var(--px) * -10px), calc(var(--py) * -6px), 0)',
                '@keyframes float2': {
                  '0%': { transform: 'translate3d(0,0,0) scale(1)' },
                  '50%': { transform: 'translate3d(-8vw,-6vh,0) scale(1.2)' },
                  '100%': { transform: 'translate3d(0,0,0) scale(1)' }
                },
                '@media (prefers-reduced-motion: reduce)': { animation: 'none', transform: 'none' }
              }} />
              {/* Vignette for depth */}
              <Box sx={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)'
              }} />
              <Container maxWidth="md" sx={{ zIndex: 1, py: { xs: 6, md: 10 } }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', mb: 2 }}>
                  <Reveal delayMs={0} distance={18}>
                    <Avatar src="/TMS-LOGO.png" alt="Thapar Mathematical Society logo" imgProps={{ decoding: 'async', fetchpriority: 'high' }} sx={{ width: 128, height: 128, mr: { md: 3, xs: 0 }, mb: { xs: 2, md: 0 }, bgcolor: 'white', border: (t) => `3px solid ${t.palette[t.palette.mode === 'dark' ? 'secondary' : 'primary'].main}`, boxShadow: 2 }} />
                  </Reveal>
                  <Reveal delayMs={80} distance={18}>
                    <Typography variant="h2" sx={{ fontFamily: '"Space Grotesk", Inter, Roboto, Arial, sans-serif', fontWeight: 700, color: 'common.white', letterSpacing: 0.5, lineHeight: 1.05, textShadow: '0 4px 18px rgba(0,0,0,0.45)' }}>Thapar Mathematical Society</Typography>
                  </Reveal>
                </Box>
                <Reveal delayMs={150} distance={14}>
                  <Typography variant="h6" sx={{ color: 'common.white', mb: 2, textShadow: '0 2px 10px rgba(0,0,0,0.35)' }}>
                    Thapar Institute of Engineering & Technology, Patiala
                  </Typography>
                </Reveal>
                <Reveal delayMs={220} distance={14}>
                  <Typography variant="body1" sx={{ color: (t) => alpha(t.palette.common.white, 0.9), fontSize: { xs: 16, md: 18 } }}>
                    Welcome to the official website of TMS! We foster mathematical curiosity, organize events, and connect enthusiasts across campus.
                  </Typography>
                </Reveal>
              </Container>
            </Box>
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Reveal>
              <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 4, background: (t) => {
                const accent = t.palette[t.palette.mode === 'dark' ? 'secondary' : 'primary'].light;
                return `linear-gradient(90deg, ${t.palette.background.paper} 60%, ${alpha(accent, 0.18)} 100%)`;
              }, boxShadow: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: (t) => t.palette.mode === 'dark' ? t.palette.secondary.main : t.palette.primary.main, mb: 2 }}>About</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, fontSize: { xs: 15, md: 17 } }}>
                  A Thapar Mathematical Society is a community of individuals passionate about mathematics, including students, educators, researchers, and professionals. The primary aim is to foster a deeper understanding and appreciation of mathematics through various activities and initiatives. This has been a family of us all for long where we can grow and get flourished under top leaders in Mathematics.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, fontSize: { xs: 15, md: 17 } }}>
                  A chance to attend workshops and seminars of esteemed guests along with an opportunity for research projects and some fun events is never ending. These events provide members with opportunities to learn about new mathematical theories, techniques, and applications from experts in the field. This does provide the members a competitive platform too, for developing problem-solving skills and fostering a spirit of healthy competition. The immense support and collaborations on research projects, allowing members to explore advanced mathematical concepts and contribute to academic research along with a platform to connect with like - minded individuals and share ideas.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: 15, md: 17 } }}>
                  Membership in a Mathematical Society provides individuals with valuable resources and support, helping them to develop their mathematical skills, stay informed about advancements in the field, and connect with a network of peers and professionals.
                </Typography>
              </Paper>
              </Reveal>
            </Container>

  {/* Speakers & Guests removed per request */}
          </Box>
        </Fade>
        {/* Gallery Section */}
        <Fade in={section === 'gallery'} timeout={600} unmountOnExit>
          <Box>
      <Box id="gallery" sx={{ width: '100%', background: (t) => {
              const accent = t.palette[t.palette.mode === 'dark' ? 'secondary' : 'primary'].light;
              return `linear-gradient(90deg, ${t.palette.background.paper} 60%, ${alpha(accent, 0.16)} 100%)`;
            }, py: 6, mb: 4 }}>
  <Container maxWidth="xl">
                <Typography variant="h4" gutterBottom sx={{ color: (t) => t.palette.mode === 'dark' ? t.palette.secondary.main : t.palette.primary.main, mb: 2, fontWeight: 'bold', letterSpacing: 1 }}>Gallery</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                  {Object.keys(galleryData).map((year) => (
                    <Button key={year} size="small" variant={galleryYear === year ? 'contained' : 'outlined'} onClick={() => setGalleryYear(year)} sx={{ borderRadius: 2.5, px: 1.8, py: 0.6, fontWeight: 600 }}>
                      {year}
                    </Button>
                  ))}
                </Box>
                {/* Smart Gallery: Masonry using CSS columns */}
        <Reveal>
        {galleryYear === '2017-18' ? (
          // Special grid layout for 2017-18 to keep structure neat and balanced
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 1.5 }}>
            {galleryData[galleryYear]?.map((src, idx) => (
              <Reveal key={src} delayMs={idx * 40}>
                <Paper elevation={1} onClick={() => openViewer(galleryData[galleryYear], idx)}
                  sx={{ p: 0.5, cursor: 'zoom-in', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, transition: 'box-shadow 0.2s, transform 0.18s', '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' } }}>
                  <Box component="img" src={src} alt="gallery image" loading="lazy" decoding="async"
                       sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 1.5, display: 'block' }} />
                </Paper>
              </Reveal>
            ))}
          </Box>
        ) : (
          <Box sx={{ columnCount: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }, columnGap: { xs: 10, sm: 12, md: 12 } }}>
            {galleryData[galleryYear]?.map((src, idx) => (
              <Reveal key={src} delayMs={idx * 40}>
                <Paper elevation={1} onClick={() => openViewer(galleryData[galleryYear], idx)}
                  sx={{ display: 'inline-block', width: '100%', mb: 1, p: 0.5, cursor: 'zoom-in', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, transition: 'box-shadow 0.2s, transform 0.18s', breakInside: 'avoid', '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' } }}>
                  <Box component="img" src={src} alt="gallery image" loading="lazy" decoding="async" sx={{ width: '100%', height: 'auto', borderRadius: 1.5, display: 'block' }} />
                </Paper>
              </Reveal>
            ))}
          </Box>
        )}
        </Reveal>
              </Container>
            </Box>
          </Box>
        </Fade>
        {/* Team Section */}
        <Fade in={section === 'team'} timeout={600} unmountOnExit>
          <Box>
            <Box id="team" sx={{ width: '100%', background: (t) => {
              const accent = t.palette[t.palette.mode === 'dark' ? 'secondary' : 'primary'].light;
              return `linear-gradient(90deg, ${alpha(accent, 0.16)} 0%, ${t.palette.background.paper} 100%)`;
            }, py: 6, mb: 4 }}>
              <Container maxWidth="lg">
                <Reveal>
                <Typography variant="h4" gutterBottom sx={{ color: (t) => t.palette.mode === 'dark' ? t.palette.secondary.main : t.palette.primary.main, mb: 3, fontWeight: 'bold', letterSpacing: 1 }}>Our Team</Typography>
                </Reveal>
                {/* Overall Leadership */}
                <Reveal>
                <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 4 }}>
                  <Grid container spacing={3}>
                    {[
                      { name: 'Dr. Kavita', role: 'President — Thapar Mathematical Society', subtitle: 'Associate Professor, School of Mathematics', photo: '/team/kavita mam (President).png' },
                      { name: 'Dr. Yashpreet Kaur', role: 'Vice President — Thapar Mathematical Society', subtitle: 'Assistant Professor, School of Mathematics', photo: '/team/Yashpreet mam (Vice President).jpg' },
                    ].map(p => (
                      <Grid key={p.name} item xs={12} md={6}>
                        <Paper elevation={1} sx={{ p: 2.5, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2.5 }}>
                          <Box component="img" src={p.photo} alt={p.name} loading="lazy"
                               sx={{ width: 124, height: 124, borderRadius: 2, objectFit: 'cover', display: 'block' }} />
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: (t) => t.palette.mode === 'dark' ? t.palette.secondary.main : t.palette.primary.main }}>{p.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{p.role}</Typography>
                            <Typography variant="body2" color="text.secondary">{p.subtitle}</Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
                </Reveal>

                {/* Session 2025–26 */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Session 2025–26</Typography>
                {/* 2025–26: Row 1 — GEN SEC, FIN SEC, JOINT SEC */}
                <Reveal><Box sx={{
                  display: 'grid',
                  gap: 4,
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                  mb: 6,
                }}>
                  {[
                    { role: 'General Secretary', name: 'Taranpreet Kaur', email: 'tkaur_msc24@thapar.edu', photo: '/team/2025-26/Gen Sec.jpg' },
                    { role: 'Finance Secretary', name: 'Dwiz Kamboj', email: 'dkamboj_msc24@thapar.edu', photo: '/team/2025-26/Finance Sec.jpg' },
                    { role: 'Joint Secretary', name: 'Harshita', email: 'hharshita_be23@thapar.edu', photo: '/team/2025-26/Joint Sec.jpg' },
                  ].map((m) => (
                    <Paper key={`${m.role}-${m.name}`} elevation={2}
                      sx={{ p: 2.5, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column',
                           border: (t) => `1px solid ${t.palette.divider}`,
                           transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease',
                           '&:hover': (t) => ({ transform: 'translateY(-4px)', boxShadow: 6, borderColor: t.palette[t.palette.mode === 'dark' ? 'secondary' : 'primary'].main }) }}>
          <Box component="img" src={m.photo} alt={m.name} loading="lazy" decoding="async"
            sx={{ width: '100%', aspectRatio: '4 / 5', mb: 1.5, objectFit: 'cover', objectPosition: '50% 20%', borderRadius: 2 }} />
                      <Box sx={{ minHeight: 108 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: (t) => t.palette.mode === 'dark' ? t.palette.secondary.main : t.palette.primary.main }}>{m.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{m.role}</Typography>
                        <Typography variant="body2" color="text.secondary">{m.email}</Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box></Reveal>

                {/* 2025–26: Row 2 — Innovation & Strategy, Outreach (keep 3-2-4; make 2-card photos smaller/aligned) */}
                <Reveal><Box sx={{
                  display: 'grid',
                  gap: 4,
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  justifyItems: { xs: 'stretch', sm: 'center' },
                  mb: 6,
                }}>
                  {[
                    { role: 'Innovations and Strategy Chair', name: 'Subham  Kumar Beura', email: 'sbeura_be22@thapar.edu', photo: '/team/2025-26/Inno & Strategy.jpg' },
                    { role: 'Outreach Chair', name: 'Janvi Soni', email: 'jsoni_msc24@thapar.edu', photo: '/team/2025-26/Outreach.jpg' },
                  ].map((m) => (
                    <Paper key={`${m.role}-${m.name}`} elevation={2}
                      sx={{ p: 2.5, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column',
                           width: '100%', maxWidth: { sm: 420, md: 380, lg: 380 }, mx: 'auto',
                           border: (t) => `1px solid ${t.palette.divider}`,
                           transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease',
                           '&:hover': (t) => ({ transform: 'translateY(-4px)', boxShadow: 6, borderColor: t.palette[t.palette.mode === 'dark' ? 'secondary' : 'primary'].main }) }}>
          <Box component="img" src={m.photo} alt={m.name} loading="lazy" decoding="async"
            sx={{ width: '100%', aspectRatio: '4 / 5', mb: 1.5, objectFit: 'cover', objectPosition: '50% 20%', borderRadius: 2 }} />
                      <Box sx={{ minHeight: 108 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: (t) => t.palette.mode === 'dark' ? t.palette.secondary.main : t.palette.primary.main }}>{m.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{m.role}</Typography>
                        <Typography variant="body2" color="text.secondary">{m.email}</Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box></Reveal>

                {/* 2025–26: Row 3 — Media & Creativity, Event (both), Content */}
                <Reveal><Box sx={{
                  display: 'grid',
                  gap: 4,
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                  mb: 6,
                }}>
                  {[
                    { role: 'Media and Creativity Head', name: 'Sarang', email: 'ssarang_be24@thapar.edu', photo: '/team/2025-26/Media & Creativity.jpg' },
                    { role: 'Event Management Head', name: 'Maurya Jain', email: 'mjain2_be23@thapar.edu', photo: '/team/2025-26/Event 1.jpg' },
                    { role: 'Event Management Head', name: 'Aryan Khurana', email: 'akhurana_be24@thapar.edu', photo: '/team/2025-26/Event 2.png' },
                    { role: 'Content Head', name: 'Manthan Jain', email: 'mjain1_be23@thapar.edu', photo: '/team/2025-26/Content.jpg' },
                  ].map((m) => (
                    <Paper key={`${m.role}-${m.name}`} elevation={2}
                      sx={{ p: 2.5, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column',
                           border: (t) => `1px solid ${t.palette.divider}`,
                           transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease',
                           '&:hover': (t) => ({ transform: 'translateY(-4px)', boxShadow: 6, borderColor: t.palette[t.palette.mode === 'dark' ? 'secondary' : 'primary'].main }) }}>
          <Box component="img" src={m.photo} alt={m.name} loading="lazy" decoding="async"
            sx={{ width: '100%', aspectRatio: '4 / 5', mb: 1.5, objectFit: 'cover', objectPosition: '50% 20%', borderRadius: 2 }} />
                      <Box sx={{ minHeight: 108 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: (t) => t.palette.mode === 'dark' ? t.palette.secondary.main : t.palette.primary.main }}>{m.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{m.role}</Typography>
                        <Typography variant="body2" color="text.secondary">{m.email}</Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box></Reveal>

                {/* Session 2024–25 */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Session 2024–25</Typography>
                {/* 2024–25: 3-4 pattern */}
                <Box sx={{
                  display: 'grid',
                  gap: 4,
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                  mb: 6,
                }}>
                  {[
                    { role: 'General Secretary', name: 'Digvijay', email: 'ddigvijay_msc23@thapar.edu', photo: '/team/2024-25/Gen Sec.jpg' },
                    { role: 'Finance Secretary', name: 'Harika', email: 'hharika_msc23@thapar.edu', photo: '/team/2024-25/Finance Sec.jpg' },
                    { role: 'Joint Secretary', name: 'Bhavya Jain', email: 'bjain_msc23@thapar.edu', photo: '/team/2024-25/Joint Sec.jpg' },
                  ].map((m) => (
                    <Paper key={`${m.role}-${m.name}`} elevation={2}
                      sx={{ p: 2.5, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column',
                           border: (t) => `1px solid ${t.palette.divider}`,
                           transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease',
                           '&:hover': (t) => ({ transform: 'translateY(-4px)', boxShadow: 6, borderColor: t.palette[t.palette.mode === 'dark' ? 'secondary' : 'primary'].main }) }}>
          <Box component="img" src={m.photo} alt={m.name} loading="lazy"
            sx={{ width: '100%', aspectRatio: '4 / 5', mb: 1.5, objectFit: 'cover', objectPosition: '50% 20%', borderRadius: 2 }} />
                      <Box sx={{ minHeight: 108 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: (t) => t.palette.mode === 'dark' ? t.palette.secondary.main : t.palette.primary.main }}>{m.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{m.role}</Typography>
                        <Typography variant="body2" color="text.secondary">{m.email}</Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>

                <Box sx={{
                  display: 'grid',
                  gap: 4,
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                  mb: 6,
                }}>
                  {[
                    { role: 'Media and Creativity Head', name: 'Yachit Guliani', email: 'yguliani_be22@thapar.edu', photo: '/team/2024-25/Media & Creativity.jpg' },
                    { role: 'Event Management Head', name: 'Harshita', email: 'hharshita_be23@thapar.edu', photo: '/team/2024-25/Event 1.jpg' },
                    { role: 'Event Management Head', name: 'Aditi Ahuja', email: 'aahuja_msc23@thapar.edu', photo: '/team/2024-25/Event 2.jpg' },
                    { role: 'Content Head', name: 'Vaishali Garg', email: 'vgarg6_be22@thapar.edu', photo: '/team/2024-25/Content.jpg' },
                  ].map((m) => (
                    <Paper key={`${m.role}-${m.name}`} elevation={2}
                      sx={{ p: 2.5, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column',
                           transition: 'transform .2s ease, box-shadow .2s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
          <Box component="img" src={m.photo} alt={m.name} loading="lazy"
            sx={{ width: '100%', aspectRatio: '4 / 5', mb: 1.5, objectFit: 'cover', objectPosition: '50% 20%', borderRadius: 2 }} />
                      <Box sx={{ minHeight: 108 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{m.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{m.role}</Typography>
                        <Typography variant="body2" color="text.secondary">{m.email}</Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>

                {/* Session 2023–24 */}
                <Reveal><Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Session 2023–24</Typography></Reveal>
                <Box sx={{
                  display: 'grid',
                  gap: 4,
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                  mb: 6,
                }}>
                  {[
                    { role: 'General Secretary', name: 'Pallavi', email: 'ppallavi_msc22@thapar.edu', photo: '/team/2023-24/Gen Sec.jpg' },
                    { role: 'Finance Secretary', name: 'Sanju', email: 'sjoon_msc22@thapar.edu', photo: '/team/2023-24/Finance Sec.png' },
                    { role: 'Media Head', name: 'Tanish Bhatia', email: 'tbhatia1_be@thapar.edu', photo: '/team/2023-24/Media Head.png' },
                  ].map((m) => (
                    <Paper key={`${m.role}-${m.name}`} elevation={2}
                      sx={{ p: 2.5, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column',
                           border: (t) => `1px solid ${t.palette.divider}`,
                           transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease',
                           '&:hover': (t) => ({ transform: 'translateY(-4px)', boxShadow: 6, borderColor: t.palette[t.palette.mode === 'dark' ? 'secondary' : 'primary'].main }) }}>
                      <Box component="img" src={m.photo} alt={m.name} loading="lazy" decoding="async"
                           sx={{ width: '100%', aspectRatio: '4 / 5', mb: 1.5, objectFit: 'cover', objectPosition: '50% 20%', borderRadius: 2 }} />
                      <Box sx={{ minHeight: 108 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: (t) => t.palette.mode === 'dark' ? t.palette.secondary.main : t.palette.primary.main }}>{m.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{m.role}</Typography>
                        <Typography variant="body2" color="text.secondary">{m.email}</Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Container>
            </Box>
          </Box>
        </Fade>
  {/* Contact section removed as requested */}

        {/* About Section */}
        <Fade in={section === 'about'} timeout={600} unmountOnExit>
          <Container maxWidth="md" id="about">
            <Paper elevation={3} sx={{ p: 4, mb: 4, opacity: fadeIn ? 1 : 0, transform: fadeIn ? 'translateY(0)' : 'translateY(40px)', transition: 'opacity 1s 0.2s, transform 1s 0.2s' }}>
            <Typography variant="h4" gutterBottom>About</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Thapar Mathematical Society is a vibrant community at Thapar Institute of Engineering & Technology, uniting students, educators, researchers, and professionals passionate about mathematics. Our mission is to foster a deeper understanding and appreciation of mathematics through workshops, seminars, research projects, and fun events. Join us to connect, learn, and grow with top leaders in mathematics!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Membership provides valuable resources, support, and a network of peers and professionals.
            </Typography>
          </Paper>
        </Container>

        {/* Events Section with cards */}
        </Fade>
        <Fade in={section === 'events'} timeout={600} unmountOnExit>
          <Box sx={{ width: '100%', background: (t) => {
            const accent = t.palette[t.palette.mode === 'dark' ? 'secondary' : 'primary'].light;
            return `linear-gradient(90deg, ${alpha(accent, 0.16)} 0%, ${t.palette.background.paper} 100%)`;
          }, py: 2, mb: 2 }}>
            <Container maxWidth="lg" id="events">
              <Typography variant="h4" gutterBottom sx={{ color: (t) => t.palette.mode === 'dark' ? t.palette.secondary.main : t.palette.primary.main, mb: 2, fontWeight: 'bold', letterSpacing: 1 }}>Events</Typography>
              {/* Year filter + search */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3, alignItems: 'center' }}>
                <Button size="small" variant={eventsYear === 'All' ? 'contained' : 'outlined'} onClick={() => setEventsYear('All')} sx={{ borderRadius: 2.5, px: 1.8, py: 0.6, fontWeight: 600 }}>All</Button>
                {eventYears.map((y) => (
                  <Button key={y} size="small" variant={eventsYear === y ? 'contained' : 'outlined'} onClick={() => setEventsYear(y)} sx={{ borderRadius: 2.5, px: 1.8, py: 0.6, fontWeight: 600 }}>{y}</Button>
                ))}
                <Box sx={{ ml: 'auto', minWidth: { xs: '100%', sm: 260 } }}>
                  <TextField size="small" fullWidth value={eventsQuery} onChange={(e) => setEventsQuery(e.target.value)}
                    placeholder="Search events..." aria-label="Search events"
                    InputProps={{ sx: { borderRadius: 3 } }} />
                </Box>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
                {filteredEvents.map((ev, idx) => (
                  <Box key={ev.slug}>
                    <Reveal delayMs={idx * 70}>
          <Card elevation={3} sx={{ height: '100%', borderRadius: 4, display: 'flex', flexDirection: 'column',
                      border: (t) => `1px solid ${t.palette.divider}`,
                      transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.2s', '&:hover': (t) => ({ transform: 'translateY(-4px)', boxShadow: 6, borderColor: t.palette[t.palette.mode === 'dark' ? 'secondary' : 'primary'].main }), bgcolor: 'background.paper' }}>
                      <Box sx={{ position: 'relative', width: '100%', pt: '56.25%', borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: 'hidden' }}>
                        <Box component="img" src={ev.cover} alt={`${ev.title} cover`} loading="lazy" decoding="async"
                             sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="overline" sx={{ color: 'text.secondary' }}>{ev.date}</Typography>
                        <Typography variant="h6" gutterBottom sx={{ color: (t) => t.palette.mode === 'dark' ? t.palette.secondary.main : t.palette.primary.main, fontWeight: 'bold' }}>{ev.title}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{ev.summary}</Typography>
                      </CardContent>
                      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
                        <Button size="small" component={RouterLink} to={`/events/${ev.slug}`} color={'secondary'} variant={'outlined'}
                          sx={{ px: 2.25, py: 0.9, borderRadius: 2.5, fontWeight: 600 }}>
                          View Photos
                        </Button>
                      </CardActions>
                    </Card>
                    </Reveal>
                  </Box>
                ))}
              </Box>
            </Container>
          </Box>
        </Fade>

        {/* Get Involved Section */}
        <Fade in={section === 'get-involved'} timeout={600} unmountOnExit>
          <Container maxWidth="md" id="get-involved">
            <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center', opacity: fadeIn ? 1 : 0, transform: fadeIn ? 'translateY(0)' : 'translateY(40px)', transition: 'opacity 1s 0.6s, transform 1s 0.6s' }}>
              <Typography variant="h4" gutterBottom>Get Involved</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Ready to join our society or want to know more? Connect with us and become a part of our mathematical family!
              </Typography>
              <Button variant="contained" color={mode === 'dark' ? 'secondary' : 'primary'} href="https://linktr.ee/mathematical_soc" target="_blank">
                Join Us
              </Button>
            </Paper>
          </Container>
        </Fade>

    {/* Footer with social icons */}
  <Box sx={{ bgcolor: 'rgb(61, 33, 117)', color: 'common.white', mt: 6, pt: 3, pb: 2, px: { xs: 2, md: 8 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="space-between" alignItems="center">
              <Grid item xs={12} md={4} sx={{ mb: { xs: 2, md: 0 } }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1, mb: 1 }}>Thapar Mathematical Society</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Thapar Institute of Engineering & Technology<br />Patiala, Punjab, India
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Email: <Link href="mailto:mathematical_soc@thapar.edu" color="inherit" underline="hover">mathematical_soc@thapar.edu</Link>
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'center' }, mb: { xs: 2, md: 0 } }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Quick Links</Typography>
                <Box>
                  <Link href="#home" color="inherit" underline="hover" sx={{ mr: 2 }}>Home</Link>
                  <Link href="#events" color="inherit" underline="hover" sx={{ mr: 2 }}>Events</Link>
                  <Link href="#gallery" color="inherit" underline="hover" sx={{ mr: 2 }}>Gallery</Link>
                  <Link href="#team" color="inherit" underline="hover" sx={{ mr: 2 }}>Team</Link>
                  {/* Contact removed */}
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Connect</Typography>
                <Box>
                  <IconButton href="https://www.instagram.com/tms_tiet/" title="Instagram" aria-label="Instagram" target="_blank" sx={{ color: 'inherit', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.2)', color: 'secondary.main' }, mr: 1 }}><InstagramIcon /></IconButton>
                  <IconButton href="https://linktr.ee/mathematical_soc" title="All Links (Linktree)" aria-label="Linktree" target="_blank" sx={{ color: 'inherit', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.2)', color: 'secondary.main' } }}><LinkIcon /></IconButton>
                  <IconButton href="mailto:mathematical_soc@thapar.edu" title="Email" aria-label="Email" sx={{ color: 'inherit', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.2)', color: 'secondary.main' } }}><EmailIcon /></IconButton>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', mt: 4, pt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                &copy; {new Date().getFullYear()} Thapar Mathematical Society. All rights reserved.
              </Typography>
            </Box>
          </Container>
        {/* Lightbox Viewer */}
        <Dialog open={viewerOpen} onClose={closeViewer} maxWidth="md" fullWidth PaperProps={{ sx: { bgcolor: 'black' } }}>
          <Box sx={{ position: 'relative', bgcolor: 'black' }}>
            <IconButton onClick={closeViewer} sx={{ position: 'absolute', top: 8, right: 8, color: 'white', zIndex: 2 }}>
              <CloseIcon />
            </IconButton>
            {viewerImages.length > 0 && (
              <Box sx={{ width: '100%', height: { xs: 320, md: 520 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box role="img" aria-label="viewer image" sx={{ width: '100%', height: '100%', background: `center/contain no-repeat url("${viewerImages[viewerIndex]}")` }} />
              </Box>
            )}
            {viewerImages.length > 1 && (
              <Box sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', zIndex: 2 }}>
                <IconButton onClick={prevImage} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}>
                  <ChevronLeftIcon />
                </IconButton>
              </Box>
            )}
            {viewerImages.length > 1 && (
              <Box sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', zIndex: 2 }}>
                <IconButton onClick={nextImage} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}>
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            )}
            {viewerImages.length > 0 && (
              <Box sx={{ position: 'absolute', bottom: 8, left: 16, right: 16, color: 'white', opacity: 0.8, textAlign: 'center', fontSize: 12 }}>
                {viewerIndex + 1} / {viewerImages.length}
              </Box>
            )}
          </Box>
        </Dialog>
      </Box>
      {/* Scroll to top FAB */}
      <ScrollTopFab />
      {/* close outer wrapper */}
      </Box>
    </ThemeProvider>
  );
}

function ScrollTopFab() {
  const [show, setShow] = useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <Zoom in={show}>
      <Fab color="secondary" size="medium" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           sx={{ position: 'fixed', bottom: 24, right: 24, boxShadow: 4 }} aria-label="Scroll to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}

export default App;
