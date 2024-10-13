import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, Image, HStack, Circle, Code, Link, Fade } from '@chakra-ui/react';
import Technologies from './Technologies';
import MacWindow from './MacWindow';

function DesktopUI() {
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
        <Image src={process.env.PUBLIC_URL + "/tech/folder.png"} alt="My Portfolio" width="64px" />
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
        <Image src={process.env.PUBLIC_URL + "/tech/pdf.png"} alt="View My Resume" width="43.5px" />
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
                src= {process.env.PUBLIC_URL + "/tech/cv.pdf"}
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

export default DesktopUI;
