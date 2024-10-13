import React from 'react';
import { Box, VStack, HStack, Image, Link, Heading, Text, Button } from '@chakra-ui/react';
import Main from './Main'; 
import Navbar from './Navbar';

function App() {
  return (
    <Box>
      <Navbar />
      <Main />

    </Box>
  );
}

export default App;
