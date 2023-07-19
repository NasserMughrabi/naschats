import React, { useEffect, useRef, useState } from "react";
import { Avatar, Flex, Text, Box } from "@chakra-ui/react";

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
    { from: "computer", isUser: false, text: "Hi, My Name is HoneyChat" },
    { from: "me", isUser: true, text: "Hey there" },
    { from: "me", isUser: true, text: "Myself Ferin Patel" },
    {
      from: "computer",
      isUser: false,
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    },
    { from: "computer", isUser: false, text: "Hi, My Name is HoneyChat" },
    { from: "me", isUser: true, text: "Hey there" },
    { from: "me", isUser: true, text: "Myself Ferin Patel" },
    {
      from: "computer",
      isUser: false,
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    },
  ]);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex flexDir={"column"} h='33rem' px={2} overflowY='scroll' w={"full"}>
      {messages.map((message, index) => (
        <Flex
          key={index}
          flexDir={"column"}
          m='2'
          maxW={"70%"}
          alignSelf={message.isUser ? "flex-end" : "flex-start"}
        >
          <Text
            fontSize='xs'
            fontWeight='bold'
            textAlign={message.isUser ? "right" : "left"}
            color={message.isUser ? "white" : "black"}
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
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;
