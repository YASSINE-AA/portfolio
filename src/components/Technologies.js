
import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';


const technologyLogos = {
    'React': 'tech/react-logo.png',
    'Node.js': 'tech/node-logo.png',
    'JavaScript': 'tech/javascript-logo.png',
    'TypeScript': 'tech/typescript-logo.png',
    'Chakra UI': 'tech/chakra-logo.png',
    'GraphQL': 'tech/graphql-logo.png',
    'MongoDB': 'tech/mongodb-logo.png',
    'Docker': 'tech/docker-logo.png',
  };
  
  const technologies = Object.keys(technologyLogos);
  
  
  function Technologies() {
    const [currentTechIndex, setCurrentTechIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentTechIndex((prev) => (prev + 1) % technologies.length);
          setIsVisible(true);
        }, 500);
      }, 3000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <Box textAlign="center" mt={4}>
        <Flex flexDirection="column" alignItems="center">
          <Image 
            src={process.env.PUBLIC_URL + "/" + technologyLogos[technologies[currentTechIndex]]} 
            alt={technologies[currentTechIndex]} 
            height={75} 
            mb={2} 
            transition="transform 0.5s"
            _hover={{ transform: 'scale(1.1)' }} 
            
          />
          <Text fontSize="lg" fontWeight="semibold" color="gray.300">
            {technologies[currentTechIndex]}
          </Text>
        </Flex>
      </Box>
    );
  }
  
export default Technologies;  