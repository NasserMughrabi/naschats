import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Flex,
  Text,
  Box,
  VStack,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import Footer from "./Footer";

const Messages = () => {
  const [messages, setMessages] = useState([
    { from: "computer", isUser: false, text: "Hi, My Name is HoneyChat" },
    { from: "me", isUser: true, text: "Hey there" },
    { from: "me", isUser: true, text: "Myself Ferin Patel" },
    {
      from: "computer",
      isUser: false,
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    },
    { from: "me", isUser: true, text: "great thank you" },
    { from: "me", isUser: true, text: "what is your name" },
    {
      from: "computer",
      isUser: false,
      text: "My name is Nas how can I help you today?",
    },
    {
      from: "me",
      isUser: true,
      text: "Nice to meet you Nas, my name is fried",
    },
    { from: "me", isUser: true, text: "Can you help me make a great project?" },
    {
      from: "computer",
      isUser: false,
      text: "Ofcourse I can",
    },
    {
      from: "computer",
      isUser: false,
      text: "What kind of project are you working on?",
    },
    {
      from: "me",
      isUser: true,
      text: "I am building an AI product just like you",
    },
  ]);

  // Scroll to the bottom whenever the messages state updates
   const messagesContainerRef = useRef();
   useEffect(() => {
     messagesContainerRef.current.scrollTop =
       messagesContainerRef.current.scrollHeight;
   }, [messages]);

  return (
    <Flex
      ref={messagesContainerRef}
      flexDir={"column"}
      h='100%'
      w='100%'
      px={2}
      overflowY='scroll'
    >
      {messages.map((message, index) => (
        <Flex
          key={index}
          flexDir={"column"}
          m='2'
          // maxW={"70%"}
          alignSelf={message.isUser ? "flex-end" : "flex-start"}
          mb={"3"}
          // mb={index === totalMessages - 1 ? "3" : "0"}
        >
          <Text
            fontSize='xs'
            fontWeight='bold'
            textAlign={message.isUser ? "right" : "left"}
            color={"white"}
          >
            {message.isUser ? "You" : "Nas"}
          </Text>
          <Box
            bg={message.isUser ? "black" : "white"}
            color={message.isUser ? "white" : "black"}
            p='2'
            borderRadius='lg'
            width={"fit-content"}
            maxW={"100%"}
            alignSelf={message.isUser ? "flex-end" : "flex-start"}
            fontSize={"sm"}
          >
            {message.text}
          </Box>
          <Text
            fontSize='xs'
            color='gray.500'
            mt='1'
            textAlign={message.isUser ? "right" : "left"}
          ></Text>
        </Flex>
      ))}
      <Box flex='1' />
    </Flex>
  );
};

export default Messages;
