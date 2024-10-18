import React, { useState, useRef } from 'react';
import {
    Box,
    Text,
    Heading,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Input,
    Textarea,
    ModalFooter,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import emailjs from 'emailjs-com';

function LikeWhatYouSee() {
    const [isOpen, setIsOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const form = useRef(); // Ref for the form

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        setSuccess(false);
        setError(false);
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_jm3uksp', 'template_7b4knng', form.current, 'aaaRxqsex9ZQLRUfo')
            .then(
                (result) => {
                    console.log('SUCCESS!', result.text);
                    setSuccess(true); 
                    handleClose(); 
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    setError(true); 
                }
            );
    };

    return (
        <>
            <Box py={16} textAlign="center" bg="gray.100" color="black">
                <Heading as="h2" size="xl" mb={4}>
                    Like What You See?
                </Heading>
                <Text fontSize="lg" mb={8}>
                    Let’s collaborate! Feel free to reach out and let's build something amazing together.
                </Text>
                <Button colorScheme="blue" size="lg" onClick={handleOpen}>
                    Contact Me
                </Button>
            </Box>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Contact Me</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {success && (
                            <Alert status="success" mb={4}>
                                <AlertIcon />
                                Message sent successfully!
                            </Alert>
                        )}
                        {error && (
                            <Alert status="error" mb={4}>
                                <AlertIcon />
                                Failed to send the message. Please try again.
                            </Alert>
                        )}

                        <form ref={form} onSubmit={sendEmail}>
                            <Input
                                placeholder="Your Name"
                                name="user_name"
                                mb={4}
                                required
                            />
                            <Input
                                placeholder="Your Email"
                                type="email"
                                name="user_email"
                                mb={4}
                                required
                            />
                            <Textarea
                                placeholder="Your Message"
                                name="message"
                                mb={4}
                                required
                            />
                            <ModalFooter>
                                <Button colorScheme="blue" type="submit">
                                    Send
                                </Button>
                                <Button variant="outline" ml={3} onClick={handleClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default LikeWhatYouSee;
