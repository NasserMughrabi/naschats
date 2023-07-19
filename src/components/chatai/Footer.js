import React from "react";
import { Box, Flex, Input, Button, Textarea } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
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

  const handleSend = (e) => {
    

  }

  return (
    <Flex w='100%' mt='5' overflow={"inherit"} >
      <Box
        overflow={"inherit"}
        position={"relative"}
        width={"100vw"}
        bg={"lightgreen"}
      >
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          bg='white'
          placeholder='Type Something...'
          _placeholder={{ color: "black" }}
          minHeight={10}
          maxHeight={200}
          resize='none'
          border='none'
          borderRadius='none'
          _focus={{
            border: "1px solid black",
          }}
          position={"absolute"}
          bottom={"0"}
          transition='height 0.3s ease-in-out'
        />
      </Box>

      <Button
        bg='black'
        color='white'
        borderRadius='none'
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        onClick={handleSend}
      >
        Send
      </Button>
    </Flex>
  );
};

export default Footer;
