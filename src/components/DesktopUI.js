import React, { useEffect, useState } from 'react';
import {
  Icon,
  Box,
  Image,
  Flex,
  Heading,
  Text,
  IconButton,
  HStack,
  Link,
  VStack,
  Code,
  useBreakpointValue,
  Button,
} from '@chakra-ui/react';
import { FiHome, FiFileText, FiUser, FiGithub, FiDownload } from 'react-icons/fi';
import { FaBatteryFull, FaWifi, FaSignal } from 'react-icons/fa';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import Technologies from './Technologies';
import MacWindow from './MacWindow';
import Navbar from './Navbar';

function ResponsiveUI() {
  const [activeTab, setActiveTab] = useState('home');
  const [repos, setRepos] = useState([]);
  const [activeRepoIndex, setActiveRepoIndex] = useState(0);
  const [readmeContent, setReadmeContent] = useState('');
  const [isMainWindowOpen, setIsMainWindowOpen] = useState(false);
  const [isWorkWindowOpen, setIsWorkWindowOpen] = useState(false);
  const [isResumeWindowOpen, setIsResumeWindowOpen] = useState(false);
  
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/YASSINE-AA/repos');
        const data = await response.json();
        console.log(data);
        setRepos(data);
        if (data.length > 0) {
          fetchReadme(data[0].name, data[0].description);
        }
      } catch (error) {
        console.error('Error fetching repos:', error);
      }
    };
    fetchRepos();
  }, []);

  const fetchReadme = async (repoName, repoDescription) => {
    try {
      
      const response = await fetch(`https://raw.githubusercontent.com/YASSINE-AA/${repoName}/main/README.md`);
      
      let data = null;
      if((await response).status === 200){
        // Show README
        data = await response.text();
      } else {
        // Show project description if README is not available
        if(repoDescription == null) data = `# No Description :(`;
        else data = `<b> Description: </b> <br/>${repoDescription}`; 
      }

      setReadmeContent(data);
    } catch (error) {
      console.error('Error fetching README:', error);
    }
  };

  const handleNextRepo = () => {
    let nextIndex = (activeRepoIndex + 1) % repos.length;
    setActiveRepoIndex(nextIndex);
    if(repos[nextIndex].name == "YASSINE-AA") 
    {
      nextIndex++;
      setActiveRepoIndex(nextIndex);
    }
    fetchReadme(repos[nextIndex].name, repos[nextIndex].description);
  };

  const handlePrevRepo = () => {
    let prevIndex = (activeRepoIndex - 1 + repos.length) % repos.length;
    setActiveRepoIndex(prevIndex);
    if(repos[prevIndex].name == "YASSINE-AA") 
    {
      prevIndex--;
      setActiveRepoIndex(prevIndex);
    }
    fetchReadme(repos[prevIndex].name, repos[prevIndex].description);
  };

  const handleDownloadSource = () => {
    window.open(`https://github.com/YASSINE-AA/${repos[activeRepoIndex].name}/archive/refs/heads/${repos[activeRepoIndex].default_branch}.zip`, '_blank');
  };

  const renderMobileContent = () => (
    <Flex direction="column" height="100vh" bg="gray.900" color="white">
      <Flex direction="row" justifyContent="space-between" alignItems="center" bg="gray.800" p={2} position="sticky" top={0} zIndex={10}>
        <HStack spacing={4}>
          <FaSignal />
          <FaWifi />
        </HStack>
        <Text>{new Date().toLocaleString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', hour12: false })}</Text>
        <HStack spacing={2}>
          <FaBatteryFull />
        </HStack>
      </Flex>

      <Box flex="1" p={4} overflow="hidden">
        {activeTab === 'home' && (
          <Flex direction="column" height="100vh" justifyContent="center" alignItems="center" p={8}>
            <Heading as="h1" size="lg" fontWeight="bold" color="green.400">
              // Hi, I'm Yassine!
            </Heading>
            <Text fontSize="md" color="gray.300" mt={2}>
              <b>Full-Stack Developer</b> creating scalable and efficient solutions for real-world projects.
            </Text>
            <Technologies />
          </Flex>
        )}

        {activeTab === 'work' && (
          <Box p={4} overflowY="auto" height="100%" overflowX="hidden">
            <Heading as="h2" size="lg" fontWeight="bold" color="green.400" mb={4}>
              // My Work
            </Heading>
            <VStack spacing={4}>
              <Heading size="md" color="blue.300">{repos[activeRepoIndex]?.name}</Heading>
              <Box p={4} bg="gray.800" borderRadius="md" width="100%">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readmeContent}</ReactMarkdown>
              </Box>
              <HStack>
                <Button onClick={handlePrevRepo} isDisabled={repos.length === 0}>Previous</Button>
                <Button onClick={handleNextRepo} isDisabled={repos.length === 0}>Next</Button>
              </HStack>
              <Button
                      leftIcon={<FiGithub />}
                      colorScheme="gray"
                      onClick={() => window.open(repos[activeRepoIndex]?.html_url, '_blank')}
                    >
                      View on GitHub
                    </Button>
                    <Button rightIcon={<FiDownload />} colorScheme='blue' variant='outline'>
  Download
  </Button>
            </VStack>
          </Box>
        )}

        {activeTab === 'resume' && (
         <Box overflow="hidden" height="100vh" width="100vw">
         <iframe
           src={`${process.env.PUBLIC_URL}/tech/cv.pdf`}
           style={{ width: '100%', height: '100%', border: 'none' }}
           title="Resume"
         />
       </Box>
       
        )}
      </Box>

      <Flex direction="row" justifyContent="space-around" alignItems="center" bg="gray.800" p={2} position="sticky" bottom={0} zIndex={10}>
        <IconButton icon={<FiHome />} aria-label="Home" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} variant="ghost" colorScheme="teal" />
        <IconButton icon={<FiFileText />} aria-label="Work" isActive={activeTab === 'work'} onClick={() => setActiveTab('work')} variant="ghost" colorScheme="teal" />
        <IconButton icon={<FiUser />} aria-label="Resume" isActive={activeTab === 'resume'} onClick={() => setActiveTab('resume')} variant="ghost" colorScheme="teal" />
      </Flex>
    </Flex>
  );

  const renderDesktopContent = () => {
    const handleViewMyWorkClick = () => setIsWorkWindowOpen(true);
    const handleViewMyResumeClick = () => setIsResumeWindowOpen(true);
    const handleCloseMainWindow = () => setIsMainWindowOpen(false);
    const handleCloseWorkWindow = () => setIsWorkWindowOpen(false);
    const handleCloseResumeWindow = () => setIsResumeWindowOpen(false);
    const handleOpenMainWindow = () => setIsMainWindowOpen(true);

    return (
      <>
        <Navbar />
        <Box position="relative" height="96.25vh" overflow="hidden" bgGradient="linear(to-r, blue.600, blue.800)" display="flex" alignItems="center" justifyContent="center" px={6}>
          <Flex direction="column" position="absolute" top="20px" left="20px" alignItems="center" cursor="pointer" onClick={handleOpenMainWindow}>
            <Image src={`${process.env.PUBLIC_URL}/tech/folder.png`} alt="My Portfolio" width="64px" />
            <Text color="white" mt={2}>My Portfolio</Text>
          </Flex>

          <Flex direction="column" position="absolute" top="20px" left="130px" alignItems="center" cursor="pointer" onClick={handleViewMyResumeClick}>
            <Image src={`${process.env.PUBLIC_URL}/tech/pdf.png`} alt="View My Resume" width="43.5px" />
            <Text color="white" mt={2}>resume.pdf</Text>
          </Flex>
          <Flex direction="column" height="100vh" justifyContent="center" alignItems="center" p={8}>
            <Heading as="h1" size="lg" fontWeight="bold" color="green.400">
              // Welcome to PortfolioOS
            </Heading>
            <Text fontSize="md" color="gray.300" mt={2}>
           Creating scalable and efficient solutions for real-world projects.
            </Text>
            <Technologies />
          </Flex>
          {isMainWindowOpen && (
            <MacWindow
              title="index.js"
              content={
                <Box p={6} width="25vw">
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
                <Box p={6} overflow="auto" width={'37vw'} height={'55vh'} overflowX={'hidden'}>
                  <Heading as="h1" size="lg" mb={4} fontWeight="bold" color="green.400">
                    // My Work
                  </Heading>
                  <Flex justifyContent="space-between" alignContent="center" alignItems="center">

                    <HStack><Button onClick={handlePrevRepo} isDisabled={repos.length === 0}>Previous</Button>
                    <Button onClick={handleNextRepo} isDisabled={repos.length === 0}>Next</Button>
                    
                    <Button rightIcon={<FiDownload />} onClick={handleDownloadSource} colorScheme='blue' variant='outline'>
  Download Source
  </Button>
                    </HStack>
                    
                    <Button
                      leftIcon={<FiGithub />}
                      colorScheme="gray"
                      onClick={() => window.open(repos[activeRepoIndex]?.html_url, '_blank')}
                    >
                      View on GitHub
                    </Button>
   
                  </Flex>
                 
                  <VStack spacing={4} mt={4}>
                    <Heading size="md" color="blue.300">{repos[activeRepoIndex]?.name}</Heading>
                    <Box p={4} bg="gray.800" borderRadius="md" width="100%">
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readmeContent}</ReactMarkdown>
                    </Box>
                  </VStack>
                </Box>
              }
              onClose={handleCloseWorkWindow}
            />
          )}

          {isResumeWindowOpen && (
            <MacWindow
              title="resume.pdf"
              content={
                <iframe
                  src={`${process.env.PUBLIC_URL}/tech/cv.pdf`}
                  style={{ width: '35vw', height: '65vh', border: 'none' }}
                  title="Resume"
                />
              }
              onClose={handleCloseResumeWindow}
            />
          )}
        </Box>
      </>
    );
  };

  return isMobile ? renderMobileContent() : renderDesktopContent();
}

export default ResponsiveUI;
