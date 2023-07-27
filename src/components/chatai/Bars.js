import React from "react";
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
  Button,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { useState } from "react";
import Sidebar from "./Sidebar";

const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

const Bars = () => {
  const [openSide, setOpenSide] = useState(false);
  return (
    <Box>
      <Navbar openSide={openSide} setOpenSide={setOpenSide} />
      <Sidebar openSide={openSide} />
    </Box>
  );
};

const FullSidebar = ({ openSide }) => {
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
      w={{ base: "40%", md: "18rem" }}
      pos='fixed'
      h='full'
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

const Navbar = ({ openSide, setOpenSide }) => {
  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    router.push("/login");
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("#01212E", "#01212E")}
        color={useColorModeValue("white", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={() => setOpenSide(!openSide)}
            icon={
              openSide ? (
                <CloseIcon w={3} h={3} />
              ) : (
                <HamburgerIcon w={5} h={5} />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
            color={"white"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Flex cursor={"pointer"}>Chat Name</Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            display={{ base: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            cursor={"pointer"}
            onClick={handleLogout}
            _hover={{
              bg: "pink.300",
            }}
          >
            Log out
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Bars;
