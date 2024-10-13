import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, Button, Image, HStack, Circle, Code, Link } from '@chakra-ui/react';

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

        {/* Title */}
        <Text fontSize="md" ml={4} color="gray.300">{title}</Text>
      </Flex>

      {/* Content */}
      <Flex direction="column" color="gray.300" fontFamily="monospace" overflowY="auto">
        {content}
      </Flex>
    </Flex>
  );
}

function Hero() {
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
    const exampleRepos = [
        {
          id: 1,
          name: "Portfolio-Website",
          description: "A personal portfolio website built using React and Chakra UI.",
          stargazers_count: 150,
          html_url: "https://github.com/YASSINE-AA/Portfolio-Website"
        },
        {
          id: 2,
          name: "E-Commerce-Platform",
          description: "A full-stack e-commerce platform using Node.js, Express, and MongoDB.",
          stargazers_count: 200,
          html_url: "https://github.com/YASSINE-AA/E-Commerce-Platform"
        },
        {
          id: 3,
          name: "Weather-App",
          description: "A weather forecasting app built with JavaScript and OpenWeather API.",
          stargazers_count: 75,
          html_url: "https://github.com/YASSINE-AA/Weather-App"
        },
        {
          id: 4,
          name: "Blog-Platform",
          description: "A blogging platform with Markdown support, using GraphQL and TypeScript.",
          stargazers_count: 100,
          html_url: "https://github.com/YASSINE-AA/Blog-Platform"
        },
        {
          id: 5,
          name: "Dockerized-Microservices",
          description: "A set of microservices running in Docker containers for scalable applications.",
          stargazers_count: 220,
          html_url: "https://github.com/YASSINE-AA/Dockerized-Microservices"
        },
        {
          id: 6,
          name: "Task-Manager-API",
          description: "A RESTful API for task management built using Node.js and Express.",
          stargazers_count: 180,
          html_url: "https://github.com/YASSINE-AA/Task-Manager-API"
        },
        {
          id: 7,
          name: "Crypto-Tracker",
          description: "A cryptocurrency tracker built with React and CoinGecko API.",
          stargazers_count: 140,
          html_url: "https://github.com/YASSINE-AA/Crypto-Tracker"
        },
        {
          id: 8,
          name: "Fitness-App",
          description: "A fitness app for tracking workouts, using React Native and Firebase.",
          stargazers_count: 210,
          html_url: "https://github.com/YASSINE-AA/Fitness-App"
        },
        {
          id: 9,
          name: "Chat-Application",
          description: "A real-time chat application built with WebSocket and Node.js.",
          stargazers_count: 95,
          html_url: "https://github.com/YASSINE-AA/Chat-Application"
        },
        {
          id: 10,
          name: "Machine-Learning-Algorithms",
          description: "Implementation of common machine learning algorithms in Python.",
          stargazers_count: 300,
          html_url: "https://github.com/YASSINE-AA/Machine-Learning-Algorithms"
        },
        {
          id: 11,
          name: "Personal-Budgeting-App",
          description: "A budgeting app for tracking expenses, built using React and Redux.",
          stargazers_count: 130,
          html_url: "https://github.com/YASSINE-AA/Personal-Budgeting-App"
        },
        {
          id: 12,
          name: "Stock-Market-Dashboard",
          description: "A dashboard for stock market analysis using React and Chart.js.",
          stargazers_count: 175,
          html_url: "https://github.com/YASSINE-AA/Stock-Market-Dashboard"
        },
        {
          id: 13,
          name: "Online-Booking-System",
          description: "An online booking system for appointments built using Ruby on Rails.",
          stargazers_count: 90,
          html_url: "https://github.com/YASSINE-AA/Online-Booking-System"
        },
        {
          id: 14,
          name: "Social-Network-App",
          description: "A social networking platform with posts, likes, and comments functionality.",
          stargazers_count: 250,
          html_url: "https://github.com/YASSINE-AA/Social-Network-App"
        },
        {
          id: 15,
          name: "IoT-Home-Automation",
          description: "A home automation system using IoT devices controlled via a web interface.",
          stargazers_count: 275,
          html_url: "https://github.com/YASSINE-AA/IoT-Home-Automation"
        },
        {
          id: 16,
          name: "Travel-Planning-App",
          description: "An app for planning trips and managing itineraries, built with Flutter.",
          stargazers_count: 115,
          html_url: "https://github.com/YASSINE-AA/Travel-Planning-App"
        },
        {
          id: 17,
          name: "Video-Streaming-Service",
          description: "A video streaming platform built using Node.js, Express, and MongoDB.",
          stargazers_count: 320,
          html_url: "https://github.com/YASSINE-AA/Video-Streaming-Service"
        },
        {
          id: 18,
          name: "AI-Image-Classification",
          description: "An AI-based image classification system using TensorFlow.",
          stargazers_count: 340,
          html_url: "https://github.com/YASSINE-AA/AI-Image-Classification"
        },
        {
          id: 19,
          name: "Job-Portal",
          description: "A job portal website where users can post and apply for jobs.",
          stargazers_count: 180,
          html_url: "https://github.com/YASSINE-AA/Job-Portal"
        },
        {
          id: 20,
          name: "Recipe-Finder-App",
          description: "A recipe discovery app using Spoonacular API, built with React Native.",
          stargazers_count: 125,
          html_url: "https://github.com/YASSINE-AA/Recipe-Finder-App"
        }
      ];
      
    setRepos(exampleRepos);
    /*
fetch('https://api.github.com/users/YASSINE-AA/repos')
      .then(response => response.json())
      .then(data => setRepos(data))
      .catch(error => console.error('Error fetching repos:', error));
    */
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
            <Box p={6}>
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
                _hover={{ bg: 'blue.700', transform: 'scale(1.05)' }}
                transition="all 0.3s"
                fontFamily="monospace"
                onClick={handleViewMyWorkClick}
              >
                &gt; &gt; View My Work
              </Link>
            </Box>
          }
          onClose={handleCloseMainWindow}
        />
      )}

      {isWorkWindowOpen && (
        <MacWindow 
          title="my-work.js" 
          content={
            <Box p={6} overflow={'auto'} height="40vh" width="100%">
              {repos.length > 0 ? (
                repos.map((repo) => (
                  <Box key={repo.id} mb={4}>
                    <Heading as="h3" size="md" color="blue.400">
                      {repo.name}
                    </Heading>
                    <Text fontSize="sm" color="gray.300">
                      {repo.description || 'No description available.'}
                    </Text>
                    <Text fontSize="sm" color="green.400">
                      ⭐ {repo.stargazers_count} Stars
                    </Text>
                  </Box>
                ))
              ) : (
                <Text>Loading repositories...</Text>
              )}
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
    </Box>
  );
}

export default Hero;
