import React from 'react'
import {HStack, Image} from "@chakra-ui/react"

const Logo = () => {
  return (
    // <Image
    //   src='/logo8.svg'
    //   alt='logo 2'
    //   w={{ base: "100px", md: "150px", lg: "160px" }}
    //   h={{ md: "85%", lg: "5%" }}

    //   // ml={{ base: "0.2rem", md: "0.5rem", lg: "1rem" }}
    //   cursor={"pointer"}
    // />
    <Image
      src='/logo8.svg'
      alt='logo 2'
      w={{ md: "50%", lg: "40%" }}
      h={{ md: "85%", lg: "85%" }}
      cursor={'pointer'}
    />
  );
}

export default Logo