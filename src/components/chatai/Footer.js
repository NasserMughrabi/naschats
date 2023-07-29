import React from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Textarea,
  IconButton,
  css,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import MicButton from "./MicButton";

const Footer = ({ handleSend, handleInputChange }) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
    handleInputChange(event);
  };

  // Change input height as text gets bigger
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "10px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    if (textareaRef.current && value === "") {
      textareaRef.current.style.height = "10px"; // Reset height to minHeight
    }
  }, [value]);

  return (
    <Flex px={"4"} paddingTop={"0px"} mt={"10"} alignItems='center'>
      <Box
        overflow={"inherit"}
        position={"relative"}
        width={"100vw"}
        bg={"lightgreen"}
        mb={"3"}
        w={"100%"}
      >
        <Flex
          justifyContent='space-between'
          alignItems='center'
          position={"absolute"}
          bottom={"0"}
          width={"100%"}
        >
          <MicButton handleSend={handleSend} setValue={setValue}/>
          <Textarea
            ref={textareaRef}
            value={value}
            bg='#01212E'
            placeholder='Send a message'
            _placeholder={{ color: "grey" }}
            color={"white"}
            minHeight={10}
            maxHeight={200}
            resize='none'
            border='none'
            borderRadius='none'
            _focus={{
              border: "1px solid #01212E",
            }}
            width='calc(100% - 60px)'
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
                setValue("");
              }
            }}
          />
          <Button
            color='white'
            borderRadius='1px'
            _hover={{
              bg: "teal.400",
              border: "1px solid white",
            }}
            colorScheme='teal'
            cursor={"pointer"}
            ml={"0.2rem"}
            onClick={(e) => {
              handleSend();
              setValue("");
            }}
          >
            Send
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Footer;
