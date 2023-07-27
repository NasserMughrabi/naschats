'use client'

import React, { ReactNode } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'


const LinkItems = [
  { name: 'Youtuber', icon: FiHome },
  { name: 'Tutor', icon: FiCompass },
  { name: 'Lawyer', icon: FiStar },
  { name: 'Trader', icon: FiTrendingUp },
  { name: 'Doctor', icon: FiSettings },
]

const Sidebar = ({ openSide }) => {
  let baseDisplay = "none";
  let mdDisplay = "block";
  if (openSide) {
    baseDisplay = "block";
    mdDisplay = "none";
  }
  return (
    <Box
      bg={useColorModeValue("#01212E", "gray.900")}
      borderRight='1px'
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      minW={{ base: "15rem", md: "16.5rem" }}
      pos={{ base: "fixed", md: "relative" }}
      zIndex={2}
      h='full'
      // {...rest}
      display={{ base: `${baseDisplay}`, md: `${mdDisplay}` }}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Image
          src='/logo8.svg'
          alt='logo 2'
          w={{ base: "100px", md: "150px", lg: "145px" }}
          cursor={"pointer"}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as='a'
      href='#'
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        color={"white"}
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

export default Sidebar;