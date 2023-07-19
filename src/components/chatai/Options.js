import React from 'react'
import {
  Button,
  Center,
  StackDivider,
  VStack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { SiMessenger } from "react-icons/si";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faBalanceScale,
  faPersonChalkboard,
} from "@fortawesome/free-solid-svg-icons";

const Options = () => {
  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      align='stretch'
      padding={2}
    >
      <Tooltip label='Enter Youtube video URL and chat with it!'>
        <Button
          bg='white'
          w={"full"}
          maxW={"md"}
          variant={"outline"}
          leftIcon={
            <FontAwesomeIcon icon={faYoutube} style={{ color: "#ff0000" }} />
          }
        >
          <Center>
            <Text>Chat with Youtube video</Text>
          </Center>
        </Button>
      </Tooltip>

      <Tooltip label='Debate a well trained debater!'>
        <Button
          bg='white'
          w={"full"}
          maxW={"md"}
          variant={"outline"}
          leftIcon={
            <FontAwesomeIcon
              icon={faBalanceScale}
              style={{ color: "#e5b415" }}
            />
          }
        >
          <Center>
            <Text>Debate with AI Debater</Text>
          </Center>
        </Button>
      </Tooltip>

      <Tooltip label='Upload class curriculum and learn better!'>
        <Button
          bg='white'
          w={"full"}
          maxW={"md"}
          variant={"outline"}
          leftIcon={
            <FontAwesomeIcon
              icon={faPersonChalkboard}
              style={{ color: "#2b65ca" }}
            />
          }
        >
          <Center>
            <Text>Learn with AI Teacher</Text>
          </Center>
        </Button>
      </Tooltip>

      <Button
        bg='white'
        w={"full"}
        maxW={"md"}
        variant={"outline"}
        leftIcon={<FcGoogle />}
      >
        <Center>
          <Text>Continue with Google</Text>
        </Center>
      </Button>

      <Button
        w={"full"}
        maxW={"md"}
        colorScheme={"messenger"}
        leftIcon={<SiMessenger />}
      >
        <Center>
          <Text>Connect to Messenger</Text>
        </Center>
      </Button>
    </VStack>
  );
}

export default Options