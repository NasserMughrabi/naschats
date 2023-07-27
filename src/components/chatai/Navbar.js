import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
  Center,
  Avatar,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import Logo from "../main/Logo";
import { router } from "next/router";

const Navbar = ({ openSide, setOpenSide }) => {
  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    router.push("/login");
  };

  return (
    <Flex
      bg={useColorModeValue("#01212E", "#01212E")}
      color={useColorModeValue("white", "white")}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
      align={"center"}
      h='100%'
      gridRow='span 1'
    >
      <Flex
        flex={{ base: 1, md: "auto" }}
        ml={{ base: -2 }}
        display={{ base: "flex", md: "none" }}
      >
        <IconButton
          onClick={() => setOpenSide(!openSide)}
          icon={
            openSide ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
          }
          _hover={{ bg: "pink.300" }}
          bg={"pink.400"}
          variant={"ghost"}
          aria-label={"Toggle Navigation"}
          color={"white"}
        />
      </Flex>
      <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
        <Flex cursor={"pointer"}>Youtuber AI</Flex>
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
          _hover={{
            bg: "pink.300",
          }}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </Stack>
    </Flex>
  );
};

export default Navbar;