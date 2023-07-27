import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";
import Options from "./Options";
import Sidebar from "./Sidebar";
import { VStack, Divider, Flex, Grid, GridItem, Box } from "@chakra-ui/react";
import Bars from "./Bars";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const ChatIndex = () => {
  return (
    <Grid
      h='100vh'
      templateRows='repeat(12, 1fr)'
      templateColumns='repeat(12, 1fr)'
    >
      <GridItem rowSpan={1} colSpan={12}>
        <Navbar openSide={openSide} setOpenSide={setOpenSide} />
      </GridItem>
      <GridItem rowSpan={11} colSpan={12} bg='#0f3c4c'>
        <Flex h={{ base: "86%", md: "100%" }} gridRow='span 11'>
          <Sidebar openSide={openSide} />
          <Flex flexDir={'column'} w={"100vw"}>
            <Messages />
            <Footer />
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ChatIndex;
