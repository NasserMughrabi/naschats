import React from "react";
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

const Youtube = () => {
  return (
    <VStack
      flexDir={"column"}
      h="100%"
      w="100%"
      color={"white"}
      fontSize={"4rem"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text fontSize={{base:"2rem", md: "4rem"}}>Paste Youtube Video URL</Text>
      <VStack w={"100%"} px={2} justifyContent={"center"} alignItems={"center"}>
        <Input></Input>
        <Button colorScheme="teal" w={"8rem"}>Start Chat</Button>
      </VStack>
    </VStack>
  );
};

export default Youtube;
