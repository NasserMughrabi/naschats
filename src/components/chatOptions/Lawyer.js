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

const Lawyer = () => {
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
      Upload legal documents
    </Flex>
  );
};

export default Lawyer;
