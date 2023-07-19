import React from 'react'
import {HStack, Image} from "@chakra-ui/react"

const Logo = () => {
  return (
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