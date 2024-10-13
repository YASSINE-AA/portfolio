import React from 'react';
import { Box, VStack, HStack, Image, Link, Heading, Text, Button } from '@chakra-ui/react';
import DiagonalHero from './DiagonalHero'; // Import the DiagonalHero component
import Navbar from './Navbar';

function App() {
  return (
    <Box>
      <Navbar />
      {/* Diagonal Split Hero Section */}
      <DiagonalHero />

    </Box>
  );
}

export default App;
