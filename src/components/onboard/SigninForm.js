import React from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { PasswordField } from "./PasswordField";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import router from "next/router";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const isValidEmail = (email) => {
    // should be a valid email with @ and .
    const regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email.toLowerCase());
  };

  const isValidPassword = (password) => {
    // should be at least 6 characters long
    return password.length >= 6;
  };

  const handleSignin = () => {
    if (email === "" || password === "") {
      toast({
        title: "Attention",
        description: "Email and password cannot be empty!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (!isValidEmail(email)) {
      toast({
        title: "Attention",
        description: "Your email is not valid!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (!isValidPassword(password)) {
      toast({
        title: "Attention",
        description: "Your password should be at least 6 characters long!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          router.push("/chat");
          return response.json();
        }
        toast({
          title: "Attention",
          description: "Incorrect email or password!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        throw new Error(message);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleGoogleSignin = () => {};

  return (
    <Flex justifyContent='center' alignItems='center' height='100%'>
      <Container
        justifyContent='center'
        alignItems='center'
        fontFamily={"Spline Sans Variable,-apple-system,system-ui,sans-serif"}
        maxW='lg'
        py={{ base: "12", md: "2" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing='8'>
          <Stack spacing='6'>
            <Stack spacing={{ base: "2", md: "3" }} textAlign='center'>
              <Heading fontSize={{ base: "2xl", md: "3xl" }}>
                Log in to your account
              </Heading>
              <Text color='grey'>
                Dont have an account?{" "}
                <Link color='teal' href='/signup'>
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "12" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing='6'>
              <Stack spacing='5'>
                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                    id='email'
                    type='email'
                    _focus={{
                      border: "1px solid #319795",
                      zIndex: "1",
                      boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <PasswordField
                  name='Password'
                  isSignup={false}
                  setPassword={setPassword}
                />
              </Stack>
              <HStack justify='space-between'>
                <Checkbox defaultChecked colorScheme='teal'>
                  Remember me
                </Checkbox>
                <Button color='teal' variant='text' size='sm'>
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing='6'>
                <Button colorScheme='teal' onClick={handleSignin}>
                  Sign in
                </Button>
                <HStack>
                  <Divider />
                  <Text textStyle='sm' whiteSpace='nowrap' color='fg.muted'>
                    OR
                  </Text>
                  <Divider />
                </HStack>
                <Button
                  bg='white'
                  w={"full"}
                  maxW={"md"}
                  variant={"outline"}
                  leftIcon={<FcGoogle />}
                  onClick={handleGoogleSignin}
                >
                  <Center>
                    <Text>Continue with Google</Text>
                  </Center>
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Signin;
