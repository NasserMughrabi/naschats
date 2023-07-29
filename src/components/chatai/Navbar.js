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
  Spinner
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import Logo from "../main/Logo";
import { router } from "next/router";
import { useState } from "react";

const Navbar = ({ openSide, setOpenSide, useCase }) => {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/auth/logout");
    setLoading(true);
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
        <Flex cursor={"pointer"} fontSize={"1.6rem"}>
          {useCase} AI
        </Flex>
      </Flex>
      <Stack
        flex={{ base: 1, md: 0 }}
        justify={"flex-end"}
        direction={"row"}
        spacing={6}
      >
        {loading ? (
          <Flex justifyContent='center' alignItems='center' height='100%'>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='lg'
            />
          </Flex>
        ) : (
          <Button
            as={"a"}
            display={{ base: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            colorScheme='teal'
            cursor={"pointer"}
            _hover={{
              bg: "pink.300",
            }}
            onClick={handleLogout}
          >
            Log out
          </Button>
        )}
      </Stack>
    </Flex>
  );
};

export default Navbar;
