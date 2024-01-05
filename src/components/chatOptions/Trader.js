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

const Trader = () => {
  return (
    <Flex
      flexDir={"column"}
      h='100%'
      w='100%'
      color={"white"}
      fontSize={"4rem"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text fontSize={{base:"2rem", md: "4rem"}}>Talk to a trained trader</Text>
      <Button colorScheme="teal" w={"8rem"}>Start Chat</Button>
    </Flex>
  );
};

export default Trader;
