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

  const handleSend = () => {};

  return (
    <Flex paddingTop={'10px'} mt={"10"} alignItems='center'>
      <Box
        overflow={"inherit"}
        position={"relative"}
        width={"100vw"}
        bg={"lightgreen"}
        mb={"3"}
        w={"100%"}
      >
        <Flex
          justifyContent='space-between' // Align the items in the center and push the button to the right
          alignItems='center' // Vertically center the items
          position={"absolute"}
          bottom={"0"}
          width={"100%"}
        >
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            bg='#01212E'
            placeholder='Type Something...'
            _placeholder={{ color: "white" }}
            color={"white"}
            minHeight={10}
            maxHeight={200}
            resize='none'
            border='none'
            borderRadius='none'
            _focus={{
              border: "1px solid #01212E",
            }}
            width='calc(100% - 60px)' // Adjust the width so the button stays on the right
          />
          <Button
            color='white'
            borderRadius='none'
            _hover={{
              bg: "pink.400",
              color: "black",
              border: "1px solid white",
            }}
            bg={"pink.400"}
            cursor={"pointer"}
            onClick={handleSend}
          >
            Send
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Footer;
