import {Box, Grid, GridItem, Spacer} from "@chakra-ui/react";
import Options from "../components/chatai/Options"
import Window from "../components/chatai/Window"
import { withProtected } from "../lib/hooks/route";
import Navbar from "../components/main/Navbar"

const Chat = () => {
  return (
    <Box>
      <Navbar />
      <Grid h='100vh' templateRows='repeat(1, 1fr)' templateColumns='repeat(18, 1fr)' paddingTop={"0px"}>
        <GridItem rowSpan={1} colSpan={4} bg='teal.600'>
          <Options />
        </GridItem>
        <GridItem rowSpan={1} colSpan={14} bg='teal.500'>
          <Window />
        </GridItem>
      </Grid>
    </Box>
    
    // <VStack>
      // <Grid h='100vh' templateRows='repeat(1, 1fr)' templateColumns='repeat(18, 1fr)'>
      //   <GridItem rowSpan={1} colSpan={4} bg='teal.600'>
      //     <Options />
      //   </GridItem>
      //   <GridItem rowSpan={1} colSpan={14} bg='teal.500'>
      //     <Window />
      //   </GridItem>
      // </Grid>
    // </VStack>
  );
}

export default withProtected(Chat);