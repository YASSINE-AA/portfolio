import React, { useState, useEffect } from 'react';
import { Flex, Text, HStack, Circle } from '@chakra-ui/react';

function MacWindow({ title, content, onClose }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    };
  
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - startPosition.x,
          y: e.clientY - startPosition.y,
        });
      }
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
    };
  
    useEffect(() => {
      if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging]);
  
    return (
      <Flex
        direction="column"
        alignItems="center"
        textAlign="left"
        p={0}
        bg="gray.900"
        borderRadius="lg"
        boxShadow="2xl"
        border="1px solid rgba(0,0,0,0.1)"
        overflow="hidden"
        position="absolute"
        transform={`translate(${position.x}px, ${position.y}px)`}
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <Flex
          width="100%"
          bg="gray.700"
          p={2}
          alignItems="center"
          justifyContent="flex-start"
          borderBottom="1px solid rgba(0,0,0,0.1)"
        >
          <HStack spacing={2} ml={3}>
            <Circle size="12px" bg="red.500" onClick={onClose} style={{ cursor: 'pointer' }} />
            <Circle size="12px" bg="yellow.400" />
            <Circle size="12px" bg="green.500" />
          </HStack>
  
          <Text fontSize="md" ml={4} color="gray.300">{title}</Text>
        </Flex>
  
        <Flex direction="column" color="gray.300" fontFamily="monospace" overflowY="auto">
          {content}
        </Flex>
      </Flex>
    );
  }


export default MacWindow;