import {Box, Grid, GridItem, Spacer} from "@chakra-ui/react";
import Options from "../components/chatai/Options"
import ChatIndex from "../components/chatai/ChatIndex"
import { withProtected } from "../lib/hooks/route";
import Navbar from "../components/chatai/Navbar";

const Chat = () => {

  return (
    <Box>
      <ChatIndex />
    </Box>
  );
}

export default withProtected(Chat);