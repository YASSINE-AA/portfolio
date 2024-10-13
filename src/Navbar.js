import React from 'react';
import { Box, Flex, Link, Spacer, Button, Text, HStack, Icon, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FaApple } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';

function Navbar({ onAboutClick }) {
  const handleOpenGithub = () => {  
    window.open('https://github.com/YASSINE-AA', '_blank');
  };

  return (
    <Box as="nav" bg="gray.100" padding={1} borderBottom="1px solid" borderColor="gray.300" boxShadow="md" height="40px">
      <Flex alignItems="center" height="100%">
        {/* Left Side with Apple Icon */}
        <HStack spacing={2} ml={2}>
          <Icon as={FaApple} boxSize={4} color="gray.600" _hover={{ color: 'black' }} />

       
          <Text> PortfolioOS</Text>
        </HStack>

        <Spacer />

        <Button
          marginRight={4}
          backgroundColor="gray.200"
          color="black"
          _hover={{ backgroundColor: 'gray.300' }}
          size="xs"
          onClick={handleOpenGithub}
        >
          Github
        </Button>
      </Flex>
    </Box>
  );
}

export default Navbar;
