import React from 'react';
import { Box, VStack, HStack, Image, Link, Heading, Text, Button , Card, CardBody, CardFooter, Stack } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import DesktopUI from './components/DesktopUI';
import LikeWhatYouSee from './components/LikeWhatYouSee';

function App() {
  return (
    <Box>
      <DesktopUI />
      <LikeWhatYouSee />
    </Box>
  );
}

export default App;
