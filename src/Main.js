import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, Image, HStack, Circle, Code, Link, Fade } from '@chakra-ui/react';

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
          src={technologyLogos[technologies[currentTechIndex]]} 
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

function Main() {
  const [isMainWindowOpen, setIsMainWindowOpen] = useState(false);
  const [isWorkWindowOpen, setIsWorkWindowOpen] = useState(false);
  const [isResumeWindowOpen, setIsResumeWindowOpen] = useState(false);
  const [repos, setRepos] = useState([]);

  const handleViewMyWorkClick = () => {
    setIsWorkWindowOpen(true);
  };

  const handleViewMyResumeClick = () => {
    setIsResumeWindowOpen(true);
  };

  const handleCloseMainWindow = () => {
    setIsMainWindowOpen(false);
  };

  const handleCloseWorkWindow = () => {
    setIsWorkWindowOpen(false);
  };

  const handleCloseResumeWindow = () => {
    setIsResumeWindowOpen(false);
  };

  const handleOpenMainWindow = () => {
    setIsMainWindowOpen(true);
  };

  useEffect(() => {
    fetch('https://api.github.com/users/YASSINE-AA/repos')
    .then(response => response.json())
    .then(data => setRepos(data))
    .catch(error => console.error('Error fetching repos:', error));
  }, []);

  return (
    <Box 
      position="relative" 
      height="96.25vh" 
      overflow="hidden" 
      bgGradient="linear(to-r, blue.600, blue.800)" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      px={6}
    >
      <Flex 
        direction="column" 
        position="absolute" 
        top="20px" 
        left="20px" 
        alignItems="center" 
        cursor="pointer" 
        onClick={handleOpenMainWindow} 
      >
        <Image src="tech/folder.png" alt="My Portfolio" width="64px" />
        <Text color="white" mt={2}>My Portfolio</Text>
      </Flex>

      <Flex 
        direction="column" 
        position="absolute" 
        top="20px" 
        left="130px" 
        alignItems="center" 
        cursor="pointer" 
        onClick={handleViewMyResumeClick} 
      >
        <Image src="tech/pdf.png" alt="View My Resume" width="43.5px" />
        <Text color="white" mt={2}>resume.pdf</Text>
      </Flex>

      {isMainWindowOpen && (
        <MacWindow 
          title="index.js" 
          content={
            <Box p={6} width={'25vw'}>
              <Heading as="h1" size="lg" mb={2} fontWeight="bold" color="green.400">
                // Hi, I'm Yassine!
              </Heading>
              <Text fontSize="md" mb={4} lineHeight={1.6}>
                <Code colorScheme="yellow">Full-Stack Developer</Code> creating scalable and efficient solutions for real-world projects.
              </Text>
              <Link 
                color="white" 
                fontSize="xl" 
                mt={6}
                px={6}
                alignSelf="flex-start"
                transition="all 0.3s"
                fontFamily="monospace"
                onClick={handleViewMyWorkClick}
              >
                
              &gt;&gt; View My Work
              </Link>
            </Box>
          } 
          onClose={handleCloseMainWindow} 
        />
      )}

      {isWorkWindowOpen && (
        <MacWindow 
          title="mywork.js" 
          content={
            <Box p={6} overflow='auto' width="35vw" height="40vh">
              <Heading as="h1" size="lg" mb={4} fontWeight="bold" color="green.400">
                // My Work
              </Heading>
              {repos.map((repo) => (
                <Box key={repo.id} mb={6}>
                  <Text fontSize="xl" color="blue.300" mb={1}>
                    {repo.name}
                  </Text>
                  <Text fontSize="sm" color="gray.300" mb={1}>
                    {repo.description}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    ⭐ {repo.stargazers_count} Stars
                  </Text>
                  <Link href={repo.html_url} isExternal color="blue.400">
                    &gt;&gt; View on GitHub
                  </Link>
                </Box>
              ))}
            </Box>
          } 
          onClose={handleCloseWorkWindow} 
        />
      )}

{isResumeWindowOpen && (
        <MacWindow 
          title="resume.pdf" 
          content={
            <Box overflow="hidden" width= '35vw' height= '70vh'> 
              <iframe
                src="tech/cv.pdf" 
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Resume"
              />
            </Box>
          }
          onClose={handleCloseResumeWindow}
        />
      )}

      <Flex 
        direction="column" 
        alignItems="center" 
        maxW="lg" 
        textAlign="center" 
      >
        <Heading as="h1" size="2xl" mb={4} fontWeight="bold" color="white">
          PortfolioOS
        </Heading>
        <Text fontSize="lg" mb={6} color="gray.200">
          Building intuitive, scalable, and performant web applications.
        </Text>
        <Technologies />
      </Flex>
    </Box>
  );
}

export default Main;
