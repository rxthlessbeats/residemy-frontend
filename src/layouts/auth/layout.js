import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid, Paper, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { profsInfo } from './profs';
import React, { useEffect, useState } from 'react';
// import { Logo } from 'src/components/logo';
// TODO: Change subtitle text

const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

const preloadAllProfsImages = () => {
  const profs = profsInfo();
  profs.forEach(prof => {
    preloadImage(prof.src);
  });
};

preloadAllProfsImages();


const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const Layout = (props) => {
  const { children } = props;

  const [currentProfIndex, setCurrentProfIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [shuffledProfs, setShuffledProfs] = useState(shuffleArray([...profsInfo()]));

  const nextProf = () => {
    if (currentProfIndex === shuffledProfs.length - 1) {
      // Reshuffle and reset index
      setShuffledProfs(shuffleArray([...profsInfo()]));
      setCurrentProfIndex(0);
    } else {
      // Move to the next index
      setCurrentProfIndex(currentProfIndex + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        nextProf();
        setFade(true);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentProfIndex, shuffledProfs]);

  const currentProf = shuffledProfs[currentProfIndex];

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32
              }}
            >
              {/* <Logo /> */}
              <img src="/assets/logos/logo.png" alt="My Logo" style={{ height: '100%', width: '100%' }} />
            </Box>
          </Box>
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            '& img': {
              maxWidth: '100%'
            },
            minHeight: '100vh',
            overflow: 'auto'
          }}
        >
          <Box margin={3}></Box>
          <Typography
            align="center"
            color="inherit"
            sx={{
              fontSize: '24px',
              lineHeight: '32px',
              mb: 1,
            }}
            variant="h1"
          >
            Welcome to {' '}
            <Box
              component="a"
              sx={{ color: '#15B79E' }}
              target="_blank"
            >
                韌學堂Residemy
            </Box>
          </Typography>
          <Typography
            align="center"
            sx={{ mb: 3 }}
            variant="subtitle1"
          >
            一個創造和學習知識的價值共創平台
          </Typography>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Card 
              sx={{  
                opacity: fade ? 1 : 0,
                transition: 'opacity 1s',
                width: '350px',
                height: '77vh'
              }}>
              <CardMedia
                sx={{
                  width: '100%', 
                  height: '350px'
                }}
                image={currentProf.src}
                title="Prof"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {currentProf.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentProf.description}
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};