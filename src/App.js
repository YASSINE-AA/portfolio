import React from 'react';
import { Box, VStack, HStack, Image, Link, Heading, Text, Button } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import DesktopUI from './components/DesktopUI';

function App() {
  return (
    <Box>
      <Navbar />
      <DesktopUI />

    </Box>
  );
}

export default App;
