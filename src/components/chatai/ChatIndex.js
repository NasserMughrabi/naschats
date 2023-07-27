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
  const [openSide, setOpenSide] = useState(false);
  useEffect(() => {
    // Add the 'no-scroll' class to the body when the component mounts
    document.body.classList.add("no-scroll");

    // Remove the 'no-scroll' class from the body when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
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
    // <Box bg='teal.500'>
    //   <Navbar openSide={openSide} setOpenSide={setOpenSide} />
    //   <Sidebar openSide={openSide} />
    //   <Messages />
    // </Box>
  );
};

export default ChatIndex;

// const Chat = () => {
//   return (
//     // <Navbar />
//     <Grid
//       h='100vh'
//       templateRows='repeat(1, 1fr)'
//       templateColumns='repeat(18, 1fr)'
//       paddingTop={"0px"}
//     >
//       <GridItem rowSpan={1} colSpan={4} bg='teal.600'>
//         <Options />
//       </GridItem>
//       <GridItem rowSpan={1} colSpan={14} bg='teal.500'>
//         {/* <Window /> */}
//       </GridItem>
//     </Grid>
//     // <VStack padding={2}>
//     //   <Messages />
//     //   <Footer />
//     // </VStack>
//   );
// };
