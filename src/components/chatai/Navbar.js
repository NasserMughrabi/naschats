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
  Spinner,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
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
import { UserAuth } from "@/context/AuthContext";

const Navbar = ({ openSide, setOpenSide, useCase }) => {
  const [loading, setLoading] = useState(false);
  const { user } = UserAuth();
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
      h="100%"
      gridRow="span 1"
    >
      <Flex
        flex={{ base: 1, md: "auto" }}
        ml={{ base: -2 }}
        display={{ base: "flex", md: "none" }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <IconButton
          onClick={() => setOpenSide(!openSide)}
          icon={
            openSide ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
          }
          _hover={{ bg: "teal.400" }}
          bg="teal"
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
          <Flex justifyContent="center" alignItems="center" height="100%">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            />
          </Flex>
        ) : (
          <Flex alignItems={"center"} bg={"black"}>
            <Menu bg={"black"}>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={user && `${user.photoURL}`} />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Text color={"black"}>{user?.displayName}</Text>
                </MenuItem>
                <MenuItem>
                  {/* <Link
                    color={"black"}
                    variant='access'
                    onClick={handleLogout}
                  >
                    Log Out
                  </Link> */}
                  <Button
                    as={"a"}
                    display={{ base: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    colorScheme="teal"
                    cursor={"pointer"}
                    onClick={handleLogout}
                    w={"100%"}
                  >
                    Log out
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Stack>
    </Flex>
  );
};

export default Navbar;
