import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";
import { VStack, Divider, Flex } from "@chakra-ui/react";

const Window = () => {
  return (
    <VStack padding={2}>
      <Messages />
      <Footer />
    </VStack>
  );
};

export default Window;
