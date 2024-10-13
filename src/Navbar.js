import React from 'react';
import { Box, Flex, Link, Spacer, Button, Text, HStack, Icon, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FaApple } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';


function Navbar() {
  const handleOpenGithub = () => {  
    window.open('https://github.com/YASSINE-AA', '_blank');
    };

  return (
    <Box as="nav" bg="gray.100" padding={1} borderBottom="1px solid" borderColor="gray.300" boxShadow="md" height="40px">
      <Flex alignItems="center" height="100%">
        {/* Left Side with Apple Icon */}
        <HStack spacing={2} ml={2}>
          <Icon as={FaApple} boxSize={4} color="gray.600" _hover={{ color: 'black' }} />
          <Text fontSize="sm" fontWeight="bold" color="gray.600" _hover={{ color: 'black' }}>
            Finder
          </Text>
        </HStack>

        <Spacer />

        <Flex gap={4}>
          <Menu>
            <MenuButton as={Text} color="gray.600" fontSize="sm" fontWeight="medium" cursor="pointer" _hover={{ color: 'black' }}>
              File <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>New Window</MenuItem>
              <MenuItem>Open</MenuItem>
              <MenuItem>Save</MenuItem>
              <MenuItem>Close</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Text} color="gray.600" fontSize="sm" fontWeight="medium" cursor="pointer" _hover={{ color: 'black' }}>
              Edit <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>Undo</MenuItem>
              <MenuItem>Redo</MenuItem>
              <MenuItem>Cut</MenuItem>
              <MenuItem>Copy</MenuItem>
              <MenuItem>Paste</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Text} color="gray.600" fontSize="sm" fontWeight="medium" cursor="pointer" _hover={{ color: 'black' }}>
              View <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>Show All Tabs</MenuItem>
              <MenuItem>Enter Full Screen</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Text} color="gray.600" fontSize="sm" fontWeight="medium" cursor="pointer" _hover={{ color: 'black' }}>
              Go <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>Go to Folder</MenuItem>
              <MenuItem>Back</MenuItem>
              <MenuItem>Forward</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Text} color="gray.600" fontSize="sm" fontWeight="medium" cursor="pointer" _hover={{ color: 'black' }}>
              Help <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>Search Help</MenuItem>
              <MenuItem>About Finder</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

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
