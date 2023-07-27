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
  Skeleton,
} from "@chakra-ui/react";
import Footer from "./Footer";

const Messages = ({messages, isLoading}) => {

  // sort the messages by timestamp
  const sortedMessages = messages.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });

  // Scroll to the bottom whenever the messages state updates
   const messagesContainerRef = useRef();
   useEffect(() => {
     const container = messagesContainerRef.current;
     container.scrollTo({
       top: container.scrollHeight,
       behavior: "smooth",
     });
   }, [sortedMessages, isLoading]);

  return (
    <Flex
      ref={messagesContainerRef}
      flexDir={"column"}
      h='100%'
      w='100%'
      px={2}
      overflowY='scroll'
    >
      {sortedMessages.map((message, index) => (
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
      {isLoading && (
        <Flex flexDir={"column"} m='2' maxW='70%'>
          <Skeleton height='20px' mb='3' />
        </Flex>
      )}
      <Box flex='1' />
    </Flex>
  );
};

export default Messages;
