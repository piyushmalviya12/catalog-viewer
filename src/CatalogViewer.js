import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { PlayArrow, Pause, NavigateBefore, NavigateNext } from '@mui/icons-material';

const catalogImages = [
  {
    id: 1,
    url: 'https://example.com/img.jpg',
    details: 'Image 1 details',
  },
  {
    id: 2,
    url: 'https://example.com/img.jpg',
    details: 'Image 2 details',
  },
  // Add more images here
];

const CatalogViewer = () => {
  const [currentImage, setCurrentImage] = useState(catalogImages[0]);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isSlideshowActive) {
      intervalId = setInterval(() => {
        showNextImage();
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isSlideshowActive]);

  const showPreviousImage = () => {
    const currentIndex = catalogImages.findIndex((image) => image.id === currentImage.id);
    const previousIndex = (currentIndex - 1 + catalogImages.length) % catalogImages.length;
    setCurrentImage(catalogImages[previousIndex]);
  };

  const showNextImage = () => {
    const currentIndex = catalogImages.findIndex((image) => image.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % catalogImages.length;
    setCurrentImage(catalogImages[nextIndex]);
  };

  const toggleSlideshow = () => {
    setIsSlideshowActive((prevState) => !prevState);
  };

  const selectImage = (image) => {
    setCurrentImage(image);
    setIsSlideshowActive(false);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            <img src={currentImage.url} alt={currentImage.details} style={{ maxWidth: '100%' }} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6">Image Details</Typography>
            <Typography variant="body1">{currentImage.details}</Typography>
          </Box>
          <Box mt={2}>
            <IconButton onClick={showPreviousImage}>
              <NavigateBefore />
            </IconButton>
            {isSlideshowActive ? (
              <IconButton onClick={toggleSlideshow}>
                <Pause />
              </IconButton>
            ) : (
              <IconButton onClick={toggleSlideshow}>
                <PlayArrow />
              </IconButton>
            )}
            <IconButton onClick={showNextImage}>
              <NavigateNext />
            </IconButton>
          </Box>
          <Box mt={2}>
            {catalogImages.map((image) => (
              <IconButton
                key={image.id}
                onClick={() => selectImage(image)}
                style={{ filter: image.id === currentImage.id ? 'none' : 'grayscale(100%)' }}
              >
                
                <img src={image.url} alt={image.details} style={{ width: 40, height: 40 }} />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default CatalogViewer;
  